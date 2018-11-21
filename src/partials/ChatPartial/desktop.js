/* eslint no-alert: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ChatWidget from '../../components/ChatWidget';
import onChatInit from '../../actions/onChatInit';
import doProfileAction from '../../actions/doProfileAction';
import doChatAction from '../../actions/doChatAction';

class ChatPartial extends React.PureComponent {
  constructor(props) {
    super(props);
    this.doChatWindowAction = this.doChatWindowAction.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.onProfileAction = this.onProfileAction.bind(this);
    this.onStartTyping = this.onStartTyping.bind(this);
    this.onStopTyping = this.onStopTyping.bind(this);
    this.fetchChatHistory = this.fetchChatHistory.bind(this);
    this.doSendMessage = this.doSendMessage.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
    this.hideAllPopups = this.hideAllPopups.bind(this);
    this.showHideProfileCard = this.showHideProfileCard.bind(this);
    this.onHideNotificationToast = id => this.props.doChatAction('chat', null, 'hideAlertsToast', id);
    this.onClickNotificationToast = id => {
      this.props.doChatAction('chat', null, 'hideAlertsToast', id);
      this.props.doChatAction('chat', null, 'set', 'isOpen', true);
      this.props.doChatAction('chat', null, 'set', 'activeTab', 'alerts');
    };
  }

  componentDidMount = () => this.props.onChatInit();

  onProfileAction(...args) {
    this.props.doProfileAction('chat', ...args);
  }

  onStartTyping(uid) {
    this.props.doChatAction('chat', uid, 'chatActivity', 'startTyping');
  }

  onStopTyping(uid) {
    this.props.doChatAction('chat', uid, 'chatActivity', 'stopTyping');
  }

  markAsRead(uid, unreadIds) {
    this.props.doChatAction('chat', uid, 'chatActivity', 'markAsRead', unreadIds);
  }

  changeSettings(key, value) {
    this.props.doChatAction('chat', null, 'set', key, value);
  }

  showHideProfileCard(key, value) {
    this.props.doChatAction('chat', null, 'profileCardDisplay', key, value);
  }

  doSendMessage(uid, msg) {
    this.props.doChatAction('chat', uid, 'chatActivity', 'sendMessage', msg);
  }

  doChatWindowAction(uid, action) {
    this.props.doChatAction('chat', uid, 'chatWindowAction', action);
  }

  fetchChatHistory(uid) {
    this.props.doChatAction('chat', uid, 'fetchChatHistory');
  }

  hideAllPopups(uid) {
    this.props.doChatAction('chat', uid, 'hideAllPopups');
  }

  render() {
    if (this.props.isLoggedOut || !this.props.settings.canAccessChat) {
      return null;
    }
    return (
      <ChatWidget
        flash={this.props.flash}
        skew={this.props.skew}
        settings={this.props.settings}
        hoverCard={this.props.hoverCard}
        topSpace={this.props.topSpace}
        isHeaderBarVisible={this.props.isHeaderBarVisible}
        canInitiateChat={this.props.canInitiateChat}
        chatSettings={this.props.chatSettings}
        chatCounts={this.props.chatCounts}
        normalWindows={this.props.normalWindows}
        chatScrollHeight={this.props.chatScrollHeight}
        stackedWindows={this.props.stackedWindows}
        sidebarItems={this.props.sidebarItems}
        wwwBaseUrl={this.props.wwwBaseUrl}
        profiles={this.props.profiles}
        messages={this.props.messages}
        doChatWindowAction={this.doChatWindowAction}
        changeSettings={this.changeSettings}
        showHideProfileCard={this.showHideProfileCard}
        onProfileAction={this.onProfileAction}
        onStartTyping={this.onStartTyping}
        onStopTyping={this.onStopTyping}
        markAsRead={this.markAsRead}
        doSendMessage={this.doSendMessage}
        fetchChatHistory={this.fetchChatHistory}
        notifications={this.props.notifications}
        onHideToast={this.onHideNotificationToast}
        onClickNotificationToast={this.onClickNotificationToast}
        hideAllPopups={this.hideAllPopups}
      />
    );
  }
}

/* eslint react/require-default-props: 0 */
ChatPartial.propTypes = {
  flash: PropTypes.shape({
    sidebar: PropTypes.string,
    window: PropTypes.string,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  canInitiateChat: ChatWidget.propTypes.canInitiateChat,
  skew: PropTypes.shape(PropTypes.skew).isRequired,
  hoverCard: PropTypes.shape(PropTypes.hoverCard).isRequired,
  topSpace: PropTypes.number.isRequired,
  isHeaderBarVisible: PropTypes.bool.isRequired,
  chatSettings: ChatWidget.propTypes.chatSettings,
  chatCounts: ChatWidget.propTypes.chatCounts,
  chatScrollHeight: ChatWidget.propTypes.chatScrollHeight,
  normalWindows: ChatWidget.propTypes.normalWindows,
  stackedWindows: ChatWidget.propTypes.stackedWindows,
  notifications: ChatWidget.propTypes.notifications,
  sidebarItems: ChatWidget.propTypes.sidebarItems,
  profiles: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  messages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  settings: PropTypes.shape({
    ...PropTypes.settings,
    canAccessChat: PropTypes.bool.isRequired,
  }).isRequired,

  onChatInit: PropTypes.func.isRequired,
  doChatAction: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
};

const selector = state => {
  const { chat, profiles, session, view, hoverCard } = state;
  const { wwwBaseUrl } = state.config.app;
  return {
    isLoggedOut: session.isLoggedOut,
    topSpace: view.topSpace,
    isHeaderBarVisible: view.isHeaderBarVisible,
    chatScrollHeight: view.chatScrollHeight,
    flash: chat.flash,
    hoverCard,
    skew: chat.skew,
    notifications: chat.notifications,
    settings: session.settings,
    canInitiateChat: session.settings.canInitiateChat,
    chatCounts: chat.counts,
    chatSettings: chat.settings,
    normalWindows: chat.windows.normal,
    stackedWindows: chat.windows.stacked,
    sidebarItems: chat.sidebar,
    profiles,
    wwwBaseUrl,
    messages: chat.messages,
  };
};

export default connect(selector, {
  onChatInit,
  doProfileAction,
  doChatAction,
})(ChatPartial);
