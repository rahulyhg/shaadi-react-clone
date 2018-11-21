import React from 'react';
import PropTypes from '../../../PropTypes';
import ChatWindow from '../ChatWindow';
import StackedChats from '../StackedChats';
import s from './styles';

const ChatStack = props => {
  const { canInitiateChat, normalWindows, stackedWindows, profiles, messages, doChatWindowAction, flash, settings, skew } = props;
  return (
    <s.ChatStack>
      {normalWindows.map(item => (
        <ChatWindow
          key={item.uid}
          item={item}
          wwwBaseUrl={props.wwwBaseUrl}
          canInitiateChat={canInitiateChat}
          settings={settings}
          flash={flash}
          skew={skew}
          profile={profiles[item.uid] || profiles.default}
          me={profiles.self}
          history={messages[item.uid] || messages.initial}
          doChatWindowAction={props.doChatWindowAction}
          onProfileAction={props.onProfileAction}
          onStartTyping={props.onStartTyping}
          onStopTyping={props.onStopTyping}
          markAsRead={props.markAsRead}
          doSendMessage={props.doSendMessage}
          fetchChatHistory={props.fetchChatHistory}
        />
      ))}
      <StackedChats items={stackedWindows} doChatWindowAction={doChatWindowAction} profiles={profiles} />
    </s.ChatStack>
  );
};

ChatStack.defaultProps = {
  flash: null,
};

ChatStack.windowPropTypes = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['opened', 'minimized', 'stacked', 'closed']).isRequired,
});

ChatStack.propTypes = {
  canInitiateChat: PropTypes.bool.isRequired,

  settings: PropTypes.shape(PropTypes.settings).isRequired,
  flash: PropTypes.string,
  skew: PropTypes.shape(PropTypes.skew).isRequired,

  normalWindows: PropTypes.arrayOf(ChatStack.windowPropTypes).isRequired,
  stackedWindows: PropTypes.arrayOf(ChatStack.windowPropTypes).isRequired,

  profiles: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  messages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

  wwwBaseUrl: PropTypes.string.isRequired,
  doChatWindowAction: PropTypes.func.isRequired,
  onProfileAction: PropTypes.func.isRequired,
  onStartTyping: PropTypes.func.isRequired,
  onStopTyping: PropTypes.func.isRequired,
  doSendMessage: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  fetchChatHistory: PropTypes.func.isRequired,
};

export default ChatStack;
