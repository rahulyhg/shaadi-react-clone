import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

class CustomButton extends React.PureComponent {
  renderConnectButton = () => {
    const { title, onClick, isHovered, isVip, mode = 'enabled' } = this.props;
    const EnabledConnectButton = isVip ? s.ConnectButtonVip : s.ConnectButtonFreePremium;
    const DisabledConnectButton = isVip ? s.ConnectDisabledButtonVip : s.ConnectDisabledButtonFreePremium;
    const RenderConnectButton = mode === 'enabled' ? EnabledConnectButton : DisabledConnectButton;
    return <RenderConnectButton title={title} onClick={onClick} isHovered={isHovered} />;
  };

  renderCancelDeclineButton = () => {
    const { title, onClick, mode = 'enabled', isDark = false } = this.props;
    const RenderCancelDeclineButton =
      mode === 'enabled' ? (isDark ? s.CancelDeclineDarkVariantButton : s.CancelDeclineButton) : s.CancelDeclineDisabledButton;
    return <RenderCancelDeclineButton title={title} onClick={onClick} />;
  };

  renderWriteMessageButton = () => {
    const { title, onClick, isHovered, isVip, isPaidUser } = this.props;
    const RenderWriteMessageButton = isVip ? s.WriteMessageButtonVip : isPaidUser ? s.WriteMessageButtonPremium : s.WriteMessageButtonFree;
    return <RenderWriteMessageButton data-writemessage={isPaidUser} title={title} onClick={onClick} isHovered={isHovered} />;
  };

  renderViewContactButton = () => {
    const { title, onClick, isHovered, isVip, isPaidUser } = this.props;
    const RenderViewContactButton = isVip ? s.ViewContactButtonVip : isPaidUser ? s.ViewContactButtonPremium : s.ViewContactButtonFree;
    return <RenderViewContactButton data-viewcontact={isPaidUser} title={title} onClick={onClick} isHovered={isHovered} />;
  };

  renderCallConsultantButton = () => {
    const { title, onClick, isHovered } = this.props;
    return <s.CallConsultantButton title={title} onClick={onClick} isHovered={isHovered} />;
  };

  renderConnectDisabledButton = () => {
    const { title, onClick, isHovered, isVip } = this.props;
    const RenderConnectDisabledButton = isVip ? s.ConnectDisabledButtonVip : s.ConnectDisabledButtonFreePremium;
    return <RenderConnectDisabledButton title={title} onClick={onClick} isHovered={isHovered} />;
  };

  renderReminderButton = () => {
    const { title, onClick, isHovered, isVip, mode = 'enabled' } = this.props;
    const EnabledReminderButton = isVip ? s.ReminderButtonVip : s.ReminderButtonFreePremium;
    const DisabledReminderButton = isVip ? s.ReminderDisabledButtonVip : s.ReminderDisabledButtonFreePremium;
    const RenderReminderButton = mode === 'enabled' ? EnabledReminderButton : DisabledReminderButton;
    return <RenderReminderButton title={title} onClick={onClick} isHovered={isHovered} />;
  };

  renderBlockUnblockButton = () => {
    const { title, onClick, isHovered, isVip, mode = 'enabled' } = this.props;
    const EnabledBlockUnblockButton = isVip ? s.BlockUnblockButtonVip : s.BlockUnblockButtonFreePremium;
    const DisabledBlockUnblockButton = isVip ? s.BlockUnblockDisabledButtonVip : s.BlockUnblockDisabledButtonFreePremium;
    const RenderBlockUnblockButton = mode === 'enabled' ? EnabledBlockUnblockButton : DisabledBlockUnblockButton;
    return <RenderBlockUnblockButton title={title} onClick={onClick} isHovered={isHovered} />;
  };

  renderReportMisuseButton = () => {
    const { title, onClick } = this.props;
    const RenderReportMisuseButton = s.ReportMisuseButtonFree;
    return <RenderReportMisuseButton title={title} onClick={onClick} />;
  };

  renderButton = type => {
    switch (type) {
      case 'Connect':
      case 'Accept':
        return this.renderConnectButton();
      case 'Cancel':
      case 'Decline':
        return this.renderCancelDeclineButton();
      case 'WriteMessage':
        return this.renderWriteMessageButton();
      case 'ViewContact':
        return this.renderViewContactButton();
      case 'CallConsultant':
        return this.renderCallConsultantButton();
      case 'ConnectDisabled':
        return this.renderConnectDisabledButton();
      case 'Remind':
        return this.renderReminderButton();
      case 'Blocked':
        return this.renderBlockUnblockButton();
      case 'ReportMisuse':
        return this.renderReportMisuseButton();
      default:
        return '';
    }
  };

  render() {
    const { type } = this.props;
    return this.renderButton(type);
  }
}

CustomButton.defaultProps = {
  title: '',
  mode: 'enabled',
  isPaidUser: false,
  isHovered: false,
  isVip: false,
  onClick: null,
  isDark: false,
};

CustomButton.propTypes = {
  type: PropTypes.string.isRequired,
  mode: PropTypes.string,
  isPaidUser: PropTypes.bool,
  isHovered: PropTypes.bool,
  isVip: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  isDark: PropTypes.bool,
};

export default CustomButton;
