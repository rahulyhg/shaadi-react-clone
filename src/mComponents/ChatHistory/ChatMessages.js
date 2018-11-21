import React from 'react';
import PropTypes from 'prop-types';
import {
  LastMsgDay,
  UserChatStatus,
  ChatStatus,
  Clearfix,
  UserContinueChat,
  SelfContinueChat,
  MobileGamifiWrap,
  MobileGamifiImg,
  MobileGamifiText,
  UpgradeNow,
  Flash,
} from './styles';
import applySkewAndGroup from '../../chat/applySkewAndGroup';

const flashToState = f => {
  const flash = (f || '').toLowerCase();
  const newState = {};
  if (flash.includes('free member') || flash.includes('free_member') || flash.includes('can only be initiated by premium')) {
    newState.showCannotStartChat = true;
  }
  return newState;
};

class ChatMessages extends React.Component {
  renderMessage = (item, group) => {
    if (!group.isSelf) {
      return (
        <div key={item.key}>
          {item.index === 0 && <LastMsgDay>{group.date}</LastMsgDay>}
          <UserContinueChat isInitiatedMessage={item.index === 0 && group.userChanged} isGenderMale={this.props.settings.gender === 'Male'}>
            {item.body}
            <UserChatStatus>
              {item.time}
              <Clearfix />
            </UserChatStatus>
          </UserContinueChat>
          <Clearfix />
        </div>
      );
    }
    return (
      <div key={item.key}>
        {item.index === 0 && <LastMsgDay>{group.date}</LastMsgDay>}
        <SelfContinueChat isInitiatedMessage={item.index === 0 && group.userChanged} isGenderMale={this.props.settings.gender === 'Male'}>
          {item.body}
          <UserChatStatus>
            {item.time}
            <ChatStatus status={item.status} />
            <Clearfix />
          </UserChatStatus>
        </SelfContinueChat>
        <Clearfix />
      </div>
    );
  };

  renderGamification = count => (
    <MobileGamifiWrap>
      <MobileGamifiImg />
      <MobileGamifiText>
        You have{' '}
        <span style={{ fontWeight: 'bold' }}>
          <text>{count}</text>
          <text id="msgText">&nbsp;unread {count > 1 ? 'messages' : 'message'}&nbsp;</text>
        </span>from {this.props.profile.himHer.toLowerCase()}. To view and reply&nbsp;{' '}
        <UpgradeNow to={`/payment/index?pg=pym&profileid=${this.props.profile.uid}`} isExternal>
          Upgrade Now!
        </UpgradeNow>
      </MobileGamifiText>
      <Clearfix />
    </MobileGamifiWrap>
  );

  renderFlash(key, flash, flashType) {
    if (!flash || Object.keys(flashToState(flash)).length > 0) {
      return null;
    }
    const msg = flash
      .replace(/%name%/g, this.props.profile.name)
      .replace(/%heShe%/g, this.props.profile.heShe.toLowerCase())
      .replace(/%HeShe%/g, this.props.profile.heShe);
    if (flashType === 'error') {
      return (
        <Flash key={key} style={{ padding: '20px 10px', color: '#d51b23', fontStyle: 'normal' }}>
          {msg}
        </Flash>
      );
    } else if (flashType === 'success') {
      return (
        <Flash key={key} style={{ padding: '20px 10px', color: '#669b41', fontStyle: 'normal' }}>
          {msg}
        </Flash>
      );
    }
    return <Flash key={key}>{msg}</Flash>;
  }

  render() {
    const { settings: { isBothPartyPayUser }, chatWindow: { gamifiedCount } } = this.props;
    return (
      <div>
        {isBothPartyPayUser && gamifiedCount > 0 && this.renderGamification(gamifiedCount)}
        {applySkewAndGroup(this.props.items, this.props.skew).map(group => group.lines.map(item => this.renderMessage(item, group)))}
        {this.renderFlash('loading-flash', this.props.history.loading, 'default')}
        {this.renderFlash('history-flash', this.props.history.flash, this.props.history.flashType)}
        {this.renderFlash('typing-flash', this.props.history.typing, 'default')}
      </div>
    );
  }
}

ChatMessages.defaultProps = {
  chatWindow: {
    gamifiedCount: null,
  },
};

ChatMessages.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['none', 'read', 'sent', 'delivered', 'wait']).isRequired,
    }),
  ).isRequired,
  skew: PropTypes.shape(PropTypes.skew).isRequired,
  chatWindow: PropTypes.shape({
    gamifiedCount: PropTypes.number.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    himHer: PropTypes.string.isRequired,
    heShe: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    flash: PropTypes.string,
    flashType: PropTypes.string.isRequired,
    typing: PropTypes.string,
    loading: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    gender: PropTypes.string.isRequired,
    isBothPartyPayUser: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ChatMessages;
