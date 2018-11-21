import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';

const Chat = props => (
  <s.InvitationActions isVisible chatMode={props.chatMode}>
    <s.ChatInvitationBtn isVisible onClick={props.onAccept}>
      Accept
    </s.ChatInvitationBtn>
    <s.ChatInvitationBtn isDecline isVisible onClick={props.onDecline}>
      Decline
    </s.ChatInvitationBtn>
  </s.InvitationActions>
);

Chat.defaultProps = {
  chatMode: 'chatProfileCard',
};

Chat.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  chatMode: PropTypes.oneOf(['chatProfileCard', 'chatWindow']),
};

export default Chat;
