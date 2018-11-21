/* eslint camelcase: 0, class-methods-use-this: ["error", { "exceptMethods": ["renderMessage", "renderFlash"] }] */
/* global window */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from '../../../PropTypes';
import s from './styles';
import Eoi from '../../Common/Eoi';
import { encode64, htmlDecode } from '../../../helpers/common';

// const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const evt_ref = encode64('chat');
const misues_ref = encode64('misuse');

// This handles flash messages that require special ui
const flashToState = f => {
  const flash = (f || '').toLowerCase();
  const newState = {};
  if (flash.includes('free member') || flash.includes('free_member') || flash.includes('can only be initiated by premium')) {
    newState.showCannotStartChat = true;
  }
  return newState;
};
const overrides = {
  Male: {
    requestPassword: 'https://img.shaadi.com/imgs/profiles/60-password-protected-m.gif',
    passwordRequested: 'https://img.shaadi.com/imgs/profiles/60-password-request-sent-m.gif',
    noPhoto: 'https://img.shaadi.com/imgs/profiles/60-request-photo-m.gif',
  },
  Female: {
    requestPassword: 'https://img.shaadi.com/imgs/profiles/60-password-protected-f.gif',
    passwordRequested: 'https://img.shaadi.com/imgs/profiles/60-password-request-sent-f.gif',
    noPhoto: 'https://img.shaadi.com/imgs/profiles/60-request-photo-f.gif',
  },
};
const asTime = t => {
  const dt = new Date(t);
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes}${hours >= 12 ? 'PM' : 'AM'}`;
};

const groups = (items, skew) => {
  const out = [];
  const filterItems = [];
  items
    .filter(k => {
      const messageId = k.messageId || '';
      const isPresent = filterItems.includes(messageId);
      if (messageId !== '') filterItems.push(messageId);
      return !isPresent;
    })
    .map(i => ({ ...i, t: i.t + skew[i.source] }))
    .sort((a, b) => a.t - b.t)
    .forEach(m => {
      const last = out[out.length - 1];
      const toBeMerged = last && last.from === m.from && m.t >= last.t && m.t - last.t < 600 * 1000;
      if (toBeMerged) {
        last.lines = [...last.lines, { key: m.messageId, body: m.body }];
        last.status = m.status;
        last.t = m.t;
        last.time = asTime(m.t);
      } else {
        out.push({
          key: `group-${m.messageId}`,
          status: m.status,
          time: asTime(m.t),
          from: m.from,
          t: m.t,
          isSelf: m.isSelf,
          lines: [{ key: m.messageId, body: m.body }],
        });
      }
    });
  return out;
};

class ChatWindow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: '',
      typedAt: 0,
      isTyping: false,
      showCannotStartChat: false,
      ...flashToState(props.history.loading),
      ...flashToState(props.history.flash),
      ...flashToState(props.history.typing),
      ...flashToState(props.flash),
      minScrollItems: props.history.items.filter(m => m.isSelf || m.status === 'read').length,
    };
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onTyping = this.onTyping.bind(this);
    this.checkTypiing = this.checkTypiing.bind(this);
    this.renderFlash = this.renderFlash.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.markRead = this.markRead.bind(this);
    this.renderGamification = this.renderGamification.bind(this);
  }

  componentDidMount() {
    if (this.props.item.status === 'opened') {
      this.props.fetchChatHistory(this.props.item.uid);
    }
    this.scrollToBottom();
  }

  componentWillReceiveProps(props) {
    if (props.item.status === 'opened' && this.props.item.status !== 'opened') {
      this.props.fetchChatHistory(props.item.uid);
    }
    if (!this.props.history || this.props.history.mark !== props.history.mark) {
      this.scrollToBottom();
    }
    if (this.props.flash !== props.flash) {
      this.scrollToBottom();
    }
    // if (props.history.items.length && this.state.showCannotStartChat) {
    //   this.setState({ showCannotStartChat: false });
    // }
    if (props.history.items.length && this.state.minScrollItems === 0) {
      this.setState({ minScrollItems: props.history.items.filter(m => m.isSelf || m.status === 'read').length });
    }

    const newState = {
      ...flashToState(props.history.loading),
      ...flashToState(props.history.flash),
      ...flashToState(props.history.typing),
      ...flashToState(props.flash),
    };

    if (Object.keys(newState).length > 0) {
      this.setState(newState);
      this.setState({ minScrollItems: -1 });
    }
  }

  componentDidUpdate() {
    if (!this.props.canInitiateChat && this.props.history.items.length > this.state.minScrollItems && !this.state.isTyping) {
      setTimeout(() => this.node && this.node.scrollToTop(), 99);
    } else {
      this.scrollToBottom();
    }
  }

  onMessageSubmit(e) {
    e.preventDefault();
    if (String(this.state.chatInput).trim() === '') {
      this.setState({ chatInput: '', typedAt: 0, isTyping: true });
      return false;
    }
    this.props.doSendMessage(this.props.item.uid, this.state.chatInput);
    this.setState({
      chatInput: '',
      typedAt: 0,
      isTyping: false,
      minScrollItems: -1,
    });
    return null;
  }

  onTyping(e) {
    if (!this.state.isTyping) {
      this.props.onStartTyping(this.props.item.uid);
    }
    this.setState({ chatInput: e.target.value, typedAt: new Date() / 1, isTyping: true });
    if (this.checkTimer) {
      clearTimeout(this.checkTimer);
    }
    this.checkTimer = setTimeout(this.checkTypiing, 5000);
  }

  checkTypiing() {
    const t = (new Date() / 1) - this.state.typedAt; // eslint-disable-line prettier/prettier
    if (t >= 4800) {
      this.setState({ isTyping: false });
      this.props.onStopTyping(this.props.item.uid);
    }
  }

  markRead() {
    if (this.props.item.status !== 'opened') {
      return;
    }
    const unread = [];
    this.props.history.items.forEach(item => (item.status !== 'read' && !item.isSelf ? unread.push(item.messageId) : null));
    if (unread.length === 0) {
      return;
    }
    this.props.markAsRead(this.props.item.uid, unread);
  }

  scrollToBottom() {
    if (this.props.canInitiateChat && this.props.history.items.length > this.state.minScrollItems) {
      this.markRead();
      setTimeout(() => this.node && this.node.scrollToBottom(), 99);
    }
  }

  // howUpgradeLink = ({ canCommunicate }) => this.state.showCannotStartChat && !canCommunicate;

  renderFlash(key, flash, flashType) {
    if (!flash || Object.keys(flashToState(flash)).length > 0) {
      return null;
    }
    const msg = flash
      .replace(/%name%/g, this.props.profile.name)
      .replace(/%heShe%/g, this.props.profile.heShe.toLowerCase())
      .replace(/%HeShe%/g, this.props.profile.heShe)
      .replace(/%hisHer%/g, this.props.profile.hisHer.toLowerCase());
    if (flashType === 'error') {
      return (
        <s.Flash key={key} style={{ padding: '20px 10px', color: '#d51b23', fontStyle: 'normal' }}>
          {msg}
        </s.Flash>
      );
    } else if (flashType === 'success') {
      return (
        <s.Flash key={key} style={{ padding: '20px 10px', color: '#669b41', fontStyle: 'normal' }}>
          {msg}
        </s.Flash>
      );
    }
    return <s.Flash key={key}>{msg}</s.Flash>;
  }

  renderGamification() {
    return (
      <s.GamificationWrap>
        <s.GamifiedPeel />
        <s.GamifiedMessage>
          You have{' '}
          <span style={{ fontWeight: 'bold' }}>
            <text>{this.props.item.gamifiedCount}</text>
            <text id="msgText"> unread {this.props.item.gamifiedCount > 1 ? 'messages' : 'message'} </text>
          </span>from {this.props.profile.himHer.toLowerCase()}. To view and reply{' '}
          <s.GamificationUpgradeLink isExternal target="_blank" to={`/payment?source=message_view&amp;profileid=${this.props.profile.uid}`}>
            Upgrade Now!
          </s.GamificationUpgradeLink>
        </s.GamifiedMessage>
      </s.GamificationWrap>
    );
  }

  renderMessage(group, slug, thumbnail, gender, albumStatus) {
    return (
      <s.Message key={group.key}>
        <s.MessagePhotoLink to={`/profile?evt_ref=${evt_ref}&profileid=${slug}`} target={'_blank'}>
          <s.Photo src={group.isSelf ? thumbnail : (overrides[gender] || {})[albumStatus] || thumbnail} />
        </s.MessagePhotoLink>
        <s.MessageDetails>
          {group.lines.map(item => <s.MessageLine key={item.key}>{htmlDecode(item.body)}</s.MessageLine>)}
          <s.Time>
            {group.time}
            <s.ReadIcon status={group.status} isVisible={group.isSelf} />
          </s.Time>
        </s.MessageDetails>
      </s.Message>
    );
  }

  render() {
    const { canInitiateChat, profile, me, history, doChatWindowAction, settings } = this.props;
    const { uid, status } = this.props.item;
    return (
      <s.ChatWindow>
        <s.Dock
          isVisible={profile.name !== '...'}
          isActive={status === 'opened'}
          onClick={() => doChatWindowAction(uid, status === 'minimized' ? 'open' : 'minimize')}
          id="docDiv"
        >
          <s.Name>{profile.name || uid}</s.Name>
          <s.StatusIcon icon={this.props.item.hasUnread ? 'highlight' : 'online'} />
          <s.CloseBtn
            isVisible={status === 'opened'}
            onClick={event => {
              event.stopPropagation();
              doChatWindowAction(uid, 'close');
            }}
          >
            X
          </s.CloseBtn>
        </s.Dock>
        <s.Window isOpen={status === 'opened' && profile.name !== '...'}>
          <s.TitleBar>
            <strong>{profile.name}</strong>
            <s.TitleBarBtns>
              <s.TitleBtn onClick={() => doChatWindowAction(uid, 'minimize')}>−</s.TitleBtn>
              <s.TitleBtn onClick={() => doChatWindowAction(uid, 'close')} isCloseBtn>
                X
              </s.TitleBtn>
            </s.TitleBarBtns>
          </s.TitleBar>
          <s.ChatLinks>
            <s.Link target="_blank" to={`/profile?evt_ref=${evt_ref}&profileid=${profile.slug}`}>
              Full Profile
            </s.Link>|{!this.props.history.hide_message && (
              <s.Link to={`/my-shaadi/messages/chat-history/profile_id/${profile.slug}`} isExternal>
                Chat History
              </s.Link>
            )}
            {!this.props.history.hide_message && `|`}
            <s.Link to={`/profile?evt_ref=${evt_ref}&atact=${misues_ref}&profileid=${profile.slug}`} target="_blank">
              Report Misuse
            </s.Link>
          </s.ChatLinks>
          <Scrollbars
            autoHeight
            autoHeightMin={325}
            ref={node => {
              this.node = node;
            }}
          >
            <s.Content>
              <s.Details membershipLevel={profile.flags.membershipLevel}>
                <s.DetailsTopWrapper>
                  <s.PhotoLink to={`/profile?evt_ref=${evt_ref}&profileid=${profile.slug}`} target="_blank">
                    <s.Photo
                      src={(overrides[profile.gender] || {})[profile.flags.albumStatus] || profile.thumbnail}
                      alt={profile.name}
                      style={{ width: '60px', height: '60px' }}
                    />
                  </s.PhotoLink>
                  <s.DetailList>
                    {profile.base.detailList.map(
                      (item, i) =>
                        item.value && (
                          <s.Desc key={item.key}>
                            {item.value}
                            {i === profile.base.detailList.length - 1 ? '.' : ', '}
                          </s.Desc>
                        ),
                    )}
                  </s.DetailList>
                </s.DetailsTopWrapper>
                {profile.gender !== settings.gender &&
                  ((settings.isPaidUser && !['default', 'shortlisted'].includes(profile.flags.connectionStatus)) ||
                    (!settings.isPaidUser && profile.flags.connectionStatus !== 'hidden')) && (
                    <Eoi
                      type="chat"
                      chatMode="chatWindow"
                      profile={profile}
                      settings={this.props.settings}
                      loadingStyle={this.props.item.eoiLoadingStyle}
                      tooltip={this.props.item.tooltip}
                      onAction={this.props.onProfileAction}
                    />
                  )}

                <s.InviatationInfo
                  isVisible={
                    profile.gender !== settings.gender &&
                    (settings.isPaidUser || profile.flags.canCommunicate) &&
                    (profile.flags.connectionStatus === 'none' || ['default', 'shortlisted'].includes(profile.flags.connectionStatus))
                  }
                >
                  An Invitation will be sent along with your Chat.
                </s.InviatationInfo>
              </s.Details>

              {this.props.history.hide_message && this.renderGamification()}
              {!profile.flags.canCommunicate && (
                <s.ChatInvitationLinkWrapper
                  isVisible={
                    !canInitiateChat &&
                    !['cancelled', 'theyCancelled', 'declined', 'theyDeclined'].includes(profile.flags.connectionStatus) &&
                    !this.props.history.hide_message &&
                    !this.props.history.loading
                  }
                  showUpgardeText={this.state.showCannotStartChat || history.items.length === 0}
                >
                  {this.state.showCannotStartChat && (
                    <s.ChatInviteText>
                      You can only reply to a Premium User. <br />To continue chatting with your matches,{' '}
                    </s.ChatInviteText>
                  )}
                  <s.ChatInvitationLink
                    isExternal
                    target="_blank"
                    to={`/payment/index?loc=im-bar&profileid=${profile.slug}&source=chat_window`}
                    isVisible={this.state.showCannotStartChat || history.items.length === 0}
                    showUpgardeText={this.state.showCannotStartChat || history.items.length === 0}
                  >
                    {this.state.showCannotStartChat ? 'Upgrade Now!' : 'Upgrade Now to start Chatting'}
                  </s.ChatInvitationLink>
                </s.ChatInvitationLinkWrapper>
              )}
              <s.ChatInvitationTwoWayLinkWrapper
                isVisible={
                  !canInitiateChat &&
                  !['cancelled', 'theyCancelled', 'declined', 'theyDeclined'].includes(profile.flags.connectionStatus) &&
                  this.props.history.hide_message
                }
              >
                {this.state.showCannotStartChat && 'To start chatting with your matches,'}
                <br />
                <s.ChatInvitationLink
                  isExternal
                  target="_blank"
                  to={`/payment/index?loc=im-bar&profileid=${profile.slug}&source=chat_window`}
                  isVisible={this.state.showCannotStartChat}
                  showUpgardeText={this.state.showCannotStartChat}
                >
                  Upgrade Now!
                </s.ChatInvitationLink>
              </s.ChatInvitationTwoWayLinkWrapper>

              <s.Messages>
                {groups(history.items, this.props.skew).map(group =>
                  this.renderMessage(
                    group,
                    group.isSelf ? me.slug : profile.slug,
                    group.isSelf ? me.thumbnail : profile.thumbnail,
                    group.isSelf ? me.gender : profile.gender,
                    group.isSelf ? me.flags.albumStatus : profile.flags.albumStatus,
                  ),
                )}
                {this.renderFlash('loading-flash', this.props.history.loading, 'default')}
                {this.renderFlash('history-flash', this.props.history.flash, this.props.history.flashType)}
                {this.renderFlash('typing-flash', this.props.history.typing, 'default')}
                {this.renderFlash('window-flash', this.props.flash, 'default')}
              </s.Messages>
            </s.Content>
          </Scrollbars>

          <s.ChatForm onSubmit={this.onMessageSubmit}>
            <s.MessageIcon />
            <s.Input type="text" autoFocus onChange={this.onTyping} value={this.state.chatInput} />
          </s.ChatForm>
        </s.Window>
      </s.ChatWindow>
    );
  }
}

ChatWindow.defaultProps = {
  flash: null,
  settings: {
    isBothPartyPayUser: false,
  },
  history: {
    hide_message: false,
  },
};

ChatWindow.groupPropTypes = PropTypes.shape({
  key: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired,
  time: PropTypes.string.isRequired,
  t: PropTypes.number.isRequired,
  source: PropTypes.oneOf(['socket', 'api']).isRequired,
  isSelf: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(['none', 'read', 'sent', 'delivered']),
});
ChatWindow.itemPropTypes = PropTypes.shape({
  messageId: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['none', 'read', 'sent', 'delivered']),
});

ChatWindow.propTypes = {
  canInitiateChat: PropTypes.bool.isRequired,
  flash: PropTypes.string,
  skew: PropTypes.shape(PropTypes.skew).isRequired,
  item: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['opened', 'minimized', 'stacked', 'closed']).isRequired,
    hasUnread: PropTypes.bool.isRequired,
    flash: PropTypes.string,
    tooltip: PropTypes.shape(PropTypes.alert).isRequired,
    photoLoading: PropTypes.bool.isRequred,
    eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
    gamifiedCount: PropTypes.number,
  }).isRequired,
  settings: PropTypes.shape({
    ...PropTypes.settings,
    isBothPartyPayUser: PropTypes.bool,
  }).isRequired,
  me: PropTypes.shape({
    slug: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    heShe: PropTypes.string,
    himHer: PropTypes.string,
    hisHer: PropTypes.string,
    thumbnail: PropTypes.string,
    slug: PropTypes.string,
    base: PropTypes.shape({
      infoList: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      connectionStatus: PropTypes.connectionStatus.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    loading: PropTypes.string,
    typing: PropTypes.string,
    flash: PropTypes.string,
    flashType: PropTypes.oneOf(['default', 'fatal', 'success', 'error', 'loading']).isRequired,
    items: PropTypes.arrayOf(ChatWindow.itemPropTypes).isRequired,
    mark: PropTypes.number.isRequired,
    hide_message: PropTypes.bool,
  }).isRequired,

  doChatWindowAction: PropTypes.func.isRequired,
  onProfileAction: PropTypes.func.isRequired,
  onStartTyping: PropTypes.func.isRequired,
  onStopTyping: PropTypes.func.isRequired,
  doSendMessage: PropTypes.func.isRequired,
  fetchChatHistory: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
};

export default ChatWindow;
