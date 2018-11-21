import styled from 'styled-components';
import Link from '../../Link';
import { premiumBoldCtaHover, premiumCtaHover, vipCtaHover, vipBoldCtaHover } from '../../Eoi/utils';

const styles = {};

styles.LoadingWrapper = styled.div`
  position: relative;
  ${props => props.customStyle && props.customStyle.map(s => `${s.key}:${s.value};`)};
`;

styles.GridStyle = styled.div`
  position: relative;
  background: #f1f1f2;
  cursor: pointer;
  border-top: 1px solid #f1f1f2;
  text-align: center;
  height: ${props => (props.isSendPasswordVisible ? '68px' : '57px')};
  padding: 13px 10px 14px;
`;

styles.InvitationBtnContainer = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  ${props => props.customStyle && props.customStyle.map(s => `${s.key}:${s.value};`)};
`;

styles.InvitationHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: ${props => (props.isGridItem ? 'normal 16px arial' : 'italic 300 12px "Roboto", sans-serif')};
  color: #72727d;
  margin: ${props =>
    props.membershipTags !== 'vip'
      ? '61px auto 10px'
      : props.isGridItem ? '0 0 7px 0' : props.membershipTags === 'vip' ? '18px auto 10px' : '15px auto 18px'};
  white-space: ${props => (props.isGridItem ? 'nowrap' : 'normal')};
  width: ${props => (props.isGridItem ? 'auto' : '90px')};
`;

styles.RoundIconBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 24px;
  height: 24px;
  margin: 6px 5px 0 0;
  vertical-align: top;
  transition: all 0.5s ease;
  background: url(/assets/grid-delete-v2.png) no-repeat left top;
  border: 0;
  outline: 0;
  padding: 0;

  &:hover {
    background: url(/assets/grid-delete-hover-v2.png) no-repeat left top;
  }
`;

styles.NoIcon = styled.span``;

styles.InvitationBtnWrapper = styled.div`
  display: flex;
  position: relative;
  min-height: 30px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  margin-top: 2px;

  > button {
    flex: 0 0 66px;
    margin: 0;
  }
`;

styles.InvitationProfileBtnWrapper = styled.div`
  > button {
    margin-right: 9px;
  }
`;

styles.InvitationGridBtnWrapper = styled.div`
  display: inline-block;
  width: 63px;
  vertical-align: top;

  > button {
    flex: 1 1 0.48;
  }
`;

styles.InvitationBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  margin-bottom: 14px;

  > button {
    flex: 0 1 0.48 !important;
  }
`;

styles.InvitationGridBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  margin-bottom: 14px;
  margin-left: auto;
  margin-right: auto;

  > button {
    flex: 1 1 0.48;
  }
`;

/* eslint no-nested-ternary: 0 */
styles.InvitationBtn = styled.button`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  overflow: hidden;
  text-align: center;
  width: ${props =>
    props.type && props.type === 'profile' && props.isCancelBtn ? '62px' : props.isLargeBtn ? 'auto' : props.isConnect ? '46px' : '44px'};
  height: ${props =>
    props.type && props.type === 'profile' && props.isCancelBtn ? '' : props.isLargeBtn ? '' : props.isConnect ? '46px' : '44px'};
  margin: ${props => (props.isCallConsultant ? '10px auto 3px' : props.isConnect && props.isPaidUser ? '-1px auto 0' : '3px auto')};
  padding: ${props => (props.type && props.type === 'profile' && props.isCancelBtn ? '7px 5px' : props.isLargeBtn ? '7px 30px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? 'normal' : 'bold')};
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props =>
    props.isCancelBtn
      ? '#f1f1f2'
      : props.isMayBeBtn
        ? '#83e1ed'
        : props.membershipTags === 'vip'
          ? props.isCallConsultant
            ? props.isHovered
              ? 'url(/assets/prem/vipcall-hover.svg) left top no-repeat'
              : 'url(/assets/prem/vipcall.svg) left top no-repeat'
            : props.isHovered
              ? 'url(/assets/prem/connect-vip-hover.svg) left top no-repeat'
              : 'url(/assets/prem/connect-vip.svg) left top no-repeat'
          : props.isHovered
            ? 'url(/assets/prem/connect-hover.svg) left top no-repeat'
            : 'url(/assets/prem/connect.svg) left top no-repeat'};
  border: 0;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: ${props =>
      props.membershipTags === 'vip'
        ? props.isCallConsultant
          ? 'url(/assets/prem/vipcall-hover-hover.svg) left top no-repeat'
          : 'url(/assets/prem/connect-vip-hover-hover.svg) left top no-repeat'
        : 'url(/assets/prem/connect-hover-hover.svg) left top no-repeat'};
    ${props => props.customStyleHover && props.customStyleHover.map(s => `${s.key}:${s.value};`)};
  }
  ${props => props.customStyle && props.customStyle.map(s => `${s.key}:${s.value};`)};
`;

styles.StatusText = styled.span`
  color: #00bcd5;
`;

styles.InvitationGridWrap = styled.div`
  display: flex;
`;

styles.InvitationGridStatus = styled.div`
  display: inline-block;
  font: normal 16px/40px arial;
  color: #72727d;
  padding: 0 0 0 33px;
  background: ${props =>
    props.status === 'contacted'
      ? 'url(/assets/grid-yes.png) no-repeat left 8px'
      : props.status === 'ignored' || props.status === 'ignoredJustNow'
        ? 'url(/assets/grid-delete-hover.png) no-repeat left 8px'
        : props.status === 'shortlisted'
          ? 'url(/assets/grid-maybe-hover.png) no-repeat left 8px'
          : 'url(/assets/grid-yes.png) no-repeat left 8px'};
  max-width: 151px;
  margin: 11px auto 0;
  white-space: nowrap;
`;

styles.Note = styled.span`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  height: 20px;
  margin-top: 10px;
  color: #b1b3b9;
`;

styles.SendPassword = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none !important')};
  background: url(/assets/photo-down-arrow.png) no-repeat left top;
  padding: 0 0 0 13px;
  margin: 0 0 8px 3px;
  color: #72727d;
  display: block;
  font: normal 11px arial;
  width: 146px;
  overflow: hidden;
`;

styles.SendPasswordCheck = styled.input`
  margin: 0 5px 0 0;
`;

styles.SendPasswordLabel = styled.label``;

styles.InvitationActions = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  justify-content: ${props => (props.chatMode === 'chatWindow' ? 'center' : 'flex-start')};
  margin: 10px 0;
`;

styles.ChatInvitationBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  font: bold 12px arial;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  border: ${props => (props.isDecline ? 0 : '1px')} solid #00bcd5;
  color: ${props => (props.isDecline ? 'gray' : '#fff')};
  margin-left: ${props => (props.isDecline ? '5px' : 0)};
  background: ${props => (props.isDecline ? 'transparent' : '#00bcd5')};
  outline: none;
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;

styles.ProfileStatusIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 2px 4px 0 0;
  background-image: url(/assets/profile-icon-sprite-v3.png);
  background-repeat: no-repeat;
  vertical-align: top;
  background-position: ${(props) => (props.status === "ignored" ? "left -60px" : props.status === "contacted" ? "left top" : props.status === "declined" ? "left -80px" : props.status === "report" ? "left -120px" : props.status === "shortlisted" ? "left -40px" : props.status === "accepted" ? "left -20px" : props.status === "declined_profile" ? "left -100px" : props.status === "user_unblock" ? "left -100px" : props.status === "misuseReported" ? "left -195px" : props.status === "respondLater" ? "" : "left top") //eslint-disable-line
};
`;
styles.ProfileStatusText = styled.span`
  display: inline-block;
  margin: 0 3px 0 0;
  font: normal 24px/26px arial;
  vertical-align: middle;
`;

styles.ProfileSearchLinkWrap = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  font: normal 12px arial;
  color: #b1b3b9;
  vertical-align: sub;
`;

styles.ProfileSearchLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.LimitExceedIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 5px 0 0;
  background: url(/assets/im-icon-sprite-ver4.png) no-repeat left ${props => (props.isHovered ? '-555px' : '-529px')};
  vertical-align: middle;
`;

styles.LimitExceedText = styled.span`
  font: 300 12px/16px 'Roboto', sans-serif;
  color: #e53a41;
  width: 96px;
  margin: 0 auto;
  display: inline-block;
  padding: 75px 0 0 0;
`;

styles.LimitExceed = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  margin-bottom: 14px;
`;

styles.MessageHeading = styled.div`
  font: 20px arial;
  color: #72727d;
  padding: 0 0 10px;
`;

styles.HiddenNote = styled.span`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  height: 20px;
  color: #b1b3b9;
`;

styles.NoteLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.ViewHistory = styled.a`
  margin: 0 4px 0 5px;
  padding: 0 12px 0 0;
  position: relative;
  color: #00bcd5;
  display: inline-block;
  cursor: pointer;
`;

styles.RequestCountLink = styled.a`
margin: 0 4px 0 5px;
padding: 0 12px 0 0;
position: relative;
color: #00bcd5;
align-items: center;
display: inline-block;
cursor: pointer;
&:hover {
  text-decoration: underline;
}
}
`;

styles.RequestCount = styled.span`
  padding: 1px 2px;
  min-width: 10px;
  min-height: 12px;
  font: normal 10px/13px arial;
  color: #fff;
  text-align: center;
  background: #dc5858;
  border-radius: 13px;
  position: absolute;
  right: 0;
  top: -8px;
`;

styles.InvitationBtnText = styled.button`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  ${props =>
    props.isHovered
      ? props.membershipTags === 'vip' ? vipBoldCtaHover : premiumBoldCtaHover // eslint-disable-line max-len
      : ''};
  ${props => props.customStyle && props.customStyle.map(s => `${s.key}:${s.value};`)};
`;

styles.ListHiddenText = styled.div`
  display: block;
  margin-top: 80px;
  color: #e53a41;
  font: 300 12px/16px 'Roboto', sans-serif;
  padding: 0 10px;
  ${props => props.customStyle && props.customStyle.map(s => `${s.key}:${s.value};`)};
`;

styles.UnhideLink = styled(Link)`
  text-decoration: underline;
  color: #e53a41;
  font-weight: 500;
`;

styles.ActiveBtnWrap = styled.div`
  padding: 6px 0 0;
`;

styles.WriteMessageBtn = styled.button`
  display: block;
  background: ${props =>
    props.isPaidUser
      ? props.isHovered ? 'url(/assets/prem/message-hover.svg) left top no-repeat' : 'url(/assets/prem/message.svg) left top no-repeat'
      : 'url(/assets/free/message.svg) left top no-repeat'};
  width: 44px;
  height: 44px;
  margin: 3px auto;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 0;
  outline: 0;
  &:hover {
    background: ${props =>
      props.isPaidUser
        ? 'url(/assets/prem/message-hover-hover.svg) left top no-repeat'
        : 'url(/assets/free/message-hover.svg) left top no-repeat'};
  }
`;

styles.WriteMessageBtnVip = styles.WriteMessageBtn.extend`
  background: ${props =>
    props.isPaidUser
      ? props.isHovered
        ? 'url(/assets/prem/vipmessage-hover.svg) left top no-repeat'
        : 'url(/assets/prem/vipmessage.svg) left top no-repeat'
      : 'url(/assets/free/message.svg) left top no-repeat'};
  &:hover{
    background: ${props =>
      props.isPaidUser
        ? 'url(/assets/prem/vipmessage-hover-hover.svg) left top no-repeat'
        : 'url(/assets/free/message-hover.svg) left top no-repeat'};
  }
`;

styles.WriteMessageBtnText = styled.button`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  ${props =>
    props.isPaidUser
      ? props.isHovered
        ? props.membershipTags === 'vip' ? vipCtaHover : premiumCtaHover // eslint-disable-line max-len
        : ''
      : ''};
`;

styles.VewContactBtn = styled.button`
  display: block;
  background: ${props =>
    props.isPaidUser
      ? props.isHovered ? 'url(/assets/prem/contact-hover.svg) left top no-repeat' : 'url(/assets/prem/contact.svg) left top no-repeat'
      : 'url(/assets/free/contact.svg) left top no-repeat'};
  width: 44px;
  height: 44px;
  margin: 10px auto 3px;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 0;
  outline: 0;
  &:hover {
    background: ${props =>
      props.isPaidUser
        ? 'url(/assets/prem/contact-hover-hover.svg) left top no-repeat'
        : 'url(/assets/free/contact-hover.svg) left top no-repeat'};
  }
`;

styles.VewContactBtnVip = styles.VewContactBtn.extend`
  background: ${props =>
    props.isPaidUser
      ? props.isHovered ? 'url(/assets/prem/vipcall-hover.svg) left top no-repeat' : 'url(/assets/prem/vipcall.svg) left top no-repeat'
      : 'url(/assets/free/contact.svg) left top no-repeat'};
  &:hover {
    background: ${props =>
      props.isPaidUser
        ? 'url(/assets/prem/vipcall-hover-hover.svg) left top no-repeat'
        : 'url(/assets/free/contact-hover.svg) left top no-repeat'};
  }
`;

styles.VewContactBtnText = styled.button`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  ${props =>
    props.isPaidUser
      ? props.isHovered
        ? props.membershipTags === 'vip' ? vipCtaHover : premiumCtaHover // eslint-disable-line max-len
        : ''
      : ''};
`;

export default styles;
