import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from '../../PropTypes';
import { ChatToolbar, ChatButton, ChatIcon, ChatTitle } from './styles';

class EoiMobileChat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.actions = {
      default: [{ key: 'connect_mobile', icon: 'chat_acceptrequest', label: 'Connect Now' }],
      theyContacted: [
        { key: 'accept_mobile', icon: 'chat_acceptrequest', label: 'Accept' },
        { key: 'decline_mobile', icon: 'chat_declinerequest', label: 'Decline' },
      ],
    };
  }

  renderMessage = (connectionStatus, uid, onAction) => {
    this.messages = {
      theyDeclined: 'Cancelled Invitation.',
      declined: 'Declined Invitation!',
      accepted: 'Accepted Invitation.',
      theyAccepted: 'Accepted Invitation.',
      contacted: 'Invitation Sent!',
      filteredContacted: 'Invitation Sent!',
      cancelled: 'Cancelled Invitation!',
      blocked: 'Blocked Invitation!',
      ignored: 'Ignored Invitation!',
      misuseReported: 'Misuse Reported!',
    };
    const message = this.messages[connectionStatus];
    return (
      <div>
        <ChatTitle>{message}</ChatTitle>
      </div>
    );
  };

  renderButtons = (items, uid, onAction, buttonSuffix) => (
    <ChatToolbar>
      {items.map(item => (
        <ChatButton key={item.key} no-pan="true" onClick={() => onAction(item.key)}>
          <Typography variant="button">
            <ChatIcon no-pan="true" type={item.icon} buttonSuffix={buttonSuffix} />
            {item.label}
          </Typography>
        </ChatButton>
      ))}
    </ChatToolbar>
  );

  render() {
    const { connectionStatus, onAction, uid } = this.props;
    if (Object.keys(this.actions).includes(connectionStatus)) {
      return this.renderButtons(this.actions[connectionStatus], uid, onAction);
    }
    return this.renderMessage(connectionStatus, uid, onAction);
  }
}

EoiMobileChat.defaultProps = {
  membershipLevel: 'free',
  onAction: () => {},
  uid: null,
};

EoiMobileChat.propTypes = {
  uid: PropTypes.string,
  onAction: PropTypes.func,
  connectionStatus: PropTypes.oneOf([
    'accepted',
    'blocked',
    'cancelled',
    'contacted',
    'declined',
    'default',
    'ignored',
    'misuseReported',
    'filteredContacted',
    'shortlisted',
    'theyAccepted',
    'theyContacted',
    'theyDeclined',
  ]).isRequired,
};

export default EoiMobileChat;
