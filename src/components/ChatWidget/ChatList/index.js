import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { htmlDecode } from '../../../helpers/common';
import s from './styles';

const applySkew = (ts, t, skew) => {
  if (ts.length > 7) {
    return ts;
  }
  const dt = new Date(t + skew);
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes}${hours >= 12 ? 'PM' : 'AM'}`;
};

const ChatList = props => {
  if (props.items.length === 0 || props.flash) {
    return (
      <s.ChatList>
        {props.flash &&
          props.flash !== '...' &&
          props.items.length === 0 && <s.ChatFlash title={props.flash}>Failed to connect. Please refresh and try again.</s.ChatFlash>}
        <s.NoChatItems isVisible={props.items.length === 0 && !props.flash}>
          <s.ChatIcon />
          <s.NoChatMessage>You have no new Recent Chats</s.NoChatMessage>
          <s.NoChatCta>
            Start a new conversation with<br />your &nbsp;
            <s.OnlineMembersLink onClick={props.onOnlineMembeShow}>Online Members</s.OnlineMembersLink>
          </s.NoChatCta>
        </s.NoChatItems>
      </s.ChatList>
    );
  }
  const { onItemBlur, onItemHover, doChatWindowAction } = props;
  return (
    <s.ChatList>
      <Scrollbars autoHeight autoHeightMin={props.chatScrollHeight}>
        {props.items.map(item => (
          <div key={item.uid} style={{ minHeight: 57 }}>
            <s.ChatItem
              onMouseEnter={e => onItemHover(e, item.uid, 'chats')}
              onMouseLeave={e => onItemBlur(e, item.uid, 'chats')}
              onClick={() => doChatWindowAction(item.uid, 'open')}
            >
              <s.Photo src={item.thumbnail} alt={item.name} />
              <s.Info>
                <s.TopInfo>
                  <s.Name>{item.name}</s.Name>
                  <s.Time>{applySkew(item.lastMessageDate, item.lastMessageT, props.skew[item.source])}</s.Time>
                </s.TopInfo>
                <s.Message>
                  {item.status && item.status !== 'none' && <s.StatusIcon status={item.status} />}
                  <s.MessageText>{htmlDecode(item.lastMessage)}</s.MessageText>
                  <s.unreadCount isVisible={item.unreadCount > 0}>{item.unreadCount}</s.unreadCount>
                </s.Message>
              </s.Info>
            </s.ChatItem>
          </div>
        ))}
      </Scrollbars>
    </s.ChatList>
  );
};

ChatList.defaultProps = {
  flash: null,
};

ChatList.itemPropTypes = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  lastMessageDate: PropTypes.string.isRequired,
  lastMessageT: PropTypes.number.isRequired,
  source: PropTypes.oneOf(['api', 'socket']),
  status: PropTypes.oneOf(['delivered', 'read', 'sent', 'none']),
  unreadCount: PropTypes.number,
});

ChatList.propTypes = {
  flash: PropTypes.string,
  skew: PropTypes.shape(PropTypes.skew).isRequired,
  items: PropTypes.arrayOf(ChatList.itemPropTypes).isRequired,
  onItemHover: PropTypes.func.isRequired,
  onItemBlur: PropTypes.func.isRequired,
  onOnlineMembeShow: PropTypes.func.isRequired,
  doChatWindowAction: PropTypes.func.isRequired,
  chatScrollHeight: PropTypes.number.isRequired,
};

export default ChatList;
