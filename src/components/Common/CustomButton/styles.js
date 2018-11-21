import styled from 'styled-components';

const styles = {};

const CustomRoundButton = styled.button`
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;
`;

// Connect Button
const ConnectButton = CustomRoundButton.extend`
  width: 46px;
  height: 46px;
`;

styles.ConnectButtonFreePremium = ConnectButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/connect-hover.svg) left top no-repeat' : 'url(/assets/prem/connect.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/connect-hover-hover.svg) left top no-repeat;
  }
`;

styles.ConnectButtonVip = ConnectButton.extend`
  background: ${props =>
    props.isHovered
      ? 'url(/assets/prem/connect-vip-hover.svg) left top no-repeat'
      : 'url(/assets/prem/connect-vip.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/connect-vip-hover-hover.svg) left top no-repeat;
  }
`;

styles.ConnectDisabledButtonFreePremium = ConnectButton.extend`
  background: url(/assets/free/same-gender.svg) left top no-repeat;
`;

styles.ConnectDisabledButtonVip = ConnectButton.extend`
  background: ${props =>
    props.isHovered
      ? 'url(/assets/prem/connect-vip-hover.svg) left top no-repeat'
      : 'url(/assets/prem/connect-vip.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/connect-vip-hover-hover.svg) left top no-repeat;
  }
`;

// Write Message Button
styles.WriteMessageButtonFree = CustomRoundButton.extend`
  background: url(/assets/free/message.svg) left top no-repeat;
  &:hover {
    background: url(/assets/free/message-hover.svg) left top no-repeat;
  }
`;

styles.WriteMessageButtonPremium = CustomRoundButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/message-hover.svg) left top no-repeat' : 'url(/assets/prem/message.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/message-hover-hover.svg) left top no-repeat;
  }
`;

styles.WriteMessageButtonVip = CustomRoundButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/vipmessage-hover.svg) left top no-repeat' : 'url(/assets/prem/vipmessage.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/vipmessage-hover-hover.svg) left top no-repeat;
  }
`;

// View Contact Button
styles.ViewContactButtonFree = CustomRoundButton.extend`
  background: url(/assets/free/contact.svg) left top no-repeat;
  &:hover {
    background: url(/assets/free/contact-hover.svg) left top no-repeat;
  }
`;

styles.ViewContactButtonPremium = CustomRoundButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/contact-hover.svg) left top no-repeat' : 'url(/assets/prem/contact.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/contact-hover-hover.svg) left top no-repeat;
  }
`;

styles.ViewContactButtonVip = CustomRoundButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/vipcall-hover.svg) left top no-repeat' : 'url(/assets/prem/vipcall.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/vipcall-hover-hover.svg) left top no-repeat;
  }
`;

// Call Consultant Button
styles.CallConsultantButton = CustomRoundButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/vipcall-hover.svg) left top no-repeat' : 'url(/assets/prem/vipcall.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/vipcall-hover-hover.svg) left top no-repeat;
  }
`;

// Cancel/Decline Button
styles.CancelDeclineButton = CustomRoundButton.extend`
  background: url(/assets/free/skip.svg) left top no-repeat;
  &:hover {
    background: url(/assets/free/skip-hover.svg) left top no-repeat;
  }
`;
styles.CancelDeclineDarkVariantButton = CustomRoundButton.extend`
  background: url(/assets/free/skip-dark.svg) left top no-repeat;
  &:hover {
    background: url(/assets/free/skip-dark-hover.svg) left top no-repeat;
  }
`;
styles.CancelDeclineDisabledButton = CustomRoundButton.extend`
  background: url(/assets/free/skip-disabled.svg) left top no-repeat;
`;

// Reminder Button
styles.ReminderButtonFreePremium = ConnectButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/remind-hover.svg) left top no-repeat' : 'url(/assets/prem/remind.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/remind-hover-hover.svg) left top no-repeat;
  }
`;

styles.ReminderButtonVip = ConnectButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/remind-vip-hover.svg) left top no-repeat' : 'url(/assets/prem/remind-vip.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/remind-vip-hover-hover.svg) left top no-repeat;
  }
`;

styles.ReminderDisabledButtonFreePremium = ConnectButton.extend`
  background: url(/assets/prem/remind-disabled.svg) left top no-repeat;
`;

styles.ReminderDisabledButtonVip = ConnectButton.extend`
  background: url(/assets/prem/remind-vip-disabled.svg) left top no-repeat;
`;

// Report Misuse Button
styles.ReportMisuseButtonFree = CustomRoundButton.extend`
  background: url(/assets/free/report-profile.svg) left top no-repeat;
  &:hover {
    background: url(/assets/free/report-profile-hover.svg) left top no-repeat;
  }
`;

// Block/Unblock Button
styles.BlockUnblockButtonFreePremium = ConnectButton.extend`
  background: ${props =>
    props.isHovered ? 'url(/assets/prem/unblock-hover.svg) left top no-repeat' : 'url(/assets/prem/unblock.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/unblock-hover-hover.svg) left top no-repeat;
  }
`;

styles.BlockUnblockButtonVip = ConnectButton.extend`
  background: ${props =>
    props.isHovered
      ? 'url(/assets/prem/unblock-vip-hover.svg) left top no-repeat'
      : 'url(/assets/prem/unblock-vip.svg) left top no-repeat'};
  &:hover {
    background: url(/assets/prem/unblock-vip-hover-hover.svg) left top no-repeat;
  }
`;

styles.BlockUnblockDisabledButtonFreePremium = ConnectButton.extend`
  background: url(/assets/prem/unblock-disabled.svg) left top no-repeat;
`;

styles.BlockUnblockDisabledButtonVip = ConnectButton.extend`
  background: url(/assets/prem/unblock-vip-disabled.svg) left top no-repeat;
`;

export default styles;
