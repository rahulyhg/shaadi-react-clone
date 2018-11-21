import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

class CustomContactMessage extends React.PureComponent {
  renderHighlightMessage = () => {
    const { message, title, onClick, isHovered, isVip, mode = 'enabled' } = this.props;
    const RenderConnectMessage =
      isVip && mode === 'enabled'
        ? s.CustomContactMessageVip
        : mode === 'enabled' ? s.CustomContactMessagePremium : s.CustomContactMessageDefault;

    return (
      <RenderConnectMessage title={title} onClick={onClick} isHovered={isHovered}>
        {message}
      </RenderConnectMessage>
    );
  };

  renderFreePremiumMessage = () => {
    const { message, title, onClick, isHovered, isVip, isPaidUser } = this.props;
    const RenderConnectMessage = isVip
      ? s.CustomContactMessageVip
      : isPaidUser ? s.CustomContactMessagePremium : s.CustomContactMessageDefault;

    return (
      <RenderConnectMessage title={title} onClick={onClick} isHovered={isHovered}>
        {message}
      </RenderConnectMessage>
    );
  };

  renderDeclineMessage = () => {
    const { message, title, onClick, isHovered, isVip, isPaidUser } = this.props;
    return (
      <s.CustomContactMessageDefault title={title} onClick={onClick} isHovered={isHovered} isVip={isVip} isPaidUser={isPaidUser}>
        {message}
      </s.CustomContactMessageDefault>
    );
  };

  render() {
    const { type } = this.props;
    switch (type) {
      case 'Connect':
      case 'Accept':
      case 'CallConsultant':
      case 'Remind':
      case 'Unblock':
        return this.renderHighlightMessage();
      case 'WriteMessage':
      case 'ViewContact':
        return this.renderFreePremiumMessage();
      case 'Cancel':
      case 'Decline':
      case 'ReportMisuse':
        return this.renderDeclineMessage();
      default:
        return '';
    }
  }
}

CustomContactMessage.defaultProps = {
  mode: 'enabled',
  message: '',
  title: '',
  isPaidUser: false,
  isHovered: false,
  isVip: false,
  onClick: null,
};

CustomContactMessage.propTypes = {
  mode: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isPaidUser: PropTypes.bool,
  isHovered: PropTypes.bool,
  isVip: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomContactMessage;
