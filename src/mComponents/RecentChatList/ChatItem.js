/* eslint camelcase: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  PageContent,
  FriendListContainer,
  ChatBarContainer,
  FriendListWrap,
  ProfileInfo,
  ImageContainer,
  ChatProDetailWrap,
  ChatListSep,
  ChatTimeStamp,
  UnreadCount,
  RcMsg1,
  ChatProid,
  Clearfix,
} from './styles';
import Link from '../Common/Link';

const ChatItem = ({ uid, thumbnail, name, lastMessageDate, ageHeight, location, lastMessage, unreadCount }) => (
  <PageContent>
    <FriendListContainer>
      <ChatBarContainer>
        <FriendListWrap>
          <Link to={`/inbox/chats/history/pid/${uid}`}>
            <ProfileInfo>
              <ImageContainer src={thumbnail} passThrough={['src']} />
              <ChatProDetailWrap>
                <ChatProid>{name}</ChatProid>
                <ChatTimeStamp>{lastMessageDate}</ChatTimeStamp>
                <Clearfix />
                <RcMsg1>{lastMessage}</RcMsg1>
                {!!unreadCount && <UnreadCount count={unreadCount}>{unreadCount}</UnreadCount>}
                <Clearfix />
              </ChatProDetailWrap>
              <Clearfix />
              <ChatListSep />
            </ProfileInfo>
          </Link>
        </FriendListWrap>
      </ChatBarContainer>
    </FriendListContainer>
  </PageContent>
);

ChatItem.defaultProps = {
  unreadCount: 0,
};

ChatItem.propTypes = {
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  lastMessageDate: PropTypes.string.isRequired,
  unreadCount: PropTypes.number,
  ageHeight: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default ChatItem;
