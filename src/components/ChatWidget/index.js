import PropTypes from 'prop-types';
import React from 'react';
import ChatTabs from './ChatTabs';
import ChatStack from './ChatStack';
import Notifications from './Notifications';
import Beep from './Beep';
import s from './styles';

const ChatWidget = props => (
  <s.ChatWidget
    style={{
      top: !props.chatSettings.isOpen ? 'auto' : `${props.topSpace + (props.isHeaderBarVisible ? 97 : 55)}px`,
    }}
    isOpen={props.chatSettings.isOpen}
  >
    <ChatTabs
      flash={props.flash.sidebar}
      skew={props.skew}
      settings={props.settings}
      wwwBaseUrl={props.wwwBaseUrl}
      canInitiateChat={props.canInitiateChat}
      hoverCard={props.hoverCard}
      chatSettings={props.chatSettings}
      chatCounts={props.chatCounts}
      sidebarItems={props.sidebarItems}
      profiles={props.profiles}
      doChatWindowAction={props.doChatWindowAction}
      changeSettings={props.changeSettings}
      showHideProfileCard={props.showHideProfileCard}
      hideAllPopups={props.hideAllPopups}
      onProfileAction={props.onProfileAction}
      chatScrollHeight={props.chatScrollHeight}
      isHeaderBarVisible={props.isHeaderBarVisible}
    />
    {props.chatSettings.status !== 'offline' && (
      <ChatStack
        wwwBaseUrl={props.wwwBaseUrl}
        flash={props.flash.window}
        skew={props.skew}
        settings={props.settings}
        canInitiateChat={props.canInitiateChat}
        chatSettings={props.chatSettings}
        normalWindows={props.normalWindows}
        stackedWindows={props.stackedWindows}
        profiles={props.profiles}
        messages={props.messages}
        doChatWindowAction={props.doChatWindowAction}
        onProfileAction={props.onProfileAction}
        onStartTyping={props.onStartTyping}
        onStopTyping={props.onStopTyping}
        doSendMessage={props.doSendMessage}
        markAsRead={props.markAsRead}
        fetchChatHistory={props.fetchChatHistory}
      />
    )}
    <Notifications
      wwwBaseUrl={props.wwwBaseUrl}
      items={props.notifications}
      onClickNotificationToast={props.onClickNotificationToast}
      onHideToast={props.onHideToast}
    />
    {props.chatSettings.beepSoundPlay && <Beep />}
  </s.ChatWidget>
);

ChatWidget.propTypes = {
  isHeaderBarVisible: PropTypes.bool.isRequired,
  topSpace: PropTypes.number.isRequired,
  canInitiateChat: PropTypes.bool.isRequired,
  flash: PropTypes.shape({
    sidebar: PropTypes.string,
    window: PropTypes.string,
  }).isRequired,
  hoverCard: PropTypes.shape(PropTypes.hoverCard).isRequired,

  chatSettings: ChatTabs.propTypes.chatSettings, // eslint-disable-line react/require-default-props,
  chatCounts: ChatTabs.propTypes.chatCounts, // eslint-disable-line react/require-default-props
  sidebarItems: ChatTabs.propTypes.sidebarItems, // eslint-disable-line react/require-default-props
  notifications: Notifications.propTypes.items, // eslint-disable-line react/require-default-props
  chatScrollHeight: PropTypes.number.isRequired,

  normalWindows: ChatStack.propTypes.normalWindows, // eslint-disable-line react/require-default-props
  stackedWindows: ChatStack.propTypes.stackedWindows, // eslint-disable-line react/require-default-props

  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  messages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  skew: PropTypes.shape(PropTypes.skew).isRequired,

  doChatWindowAction: PropTypes.func.isRequired,
  changeSettings: PropTypes.func.isRequired,
  showHideProfileCard: PropTypes.func.isRequired,
  onProfileAction: PropTypes.func.isRequired,
  onStartTyping: PropTypes.func.isRequired,
  onStopTyping: PropTypes.func.isRequired,
  doSendMessage: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  fetchChatHistory: PropTypes.func.isRequired,
  onHideToast: PropTypes.func.isRequired,
  onClickNotificationToast: PropTypes.func.isRequired,
  hideAllPopups: PropTypes.func.isRequired,
};

export default ChatWidget;
