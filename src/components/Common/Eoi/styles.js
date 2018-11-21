import styled from 'styled-components';
import Link from '../Link';
import { premiumCtaHover, vipCtaHover } from './../Eoi/utils';

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

styles.InvitationHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: ${props => (props.isGridItem ? '16px' : '20px')} arial;
  color: #72727d;
  margin: 0;
  margin-bottom: 5px;
  white-space: nowrap;
`;

styles.InvitationGridStatus = styled.div`
  display: inline-block;
  font: normal 16px/40px arial;
  color: #72727d;
  padding: 0 0 0 33px;
  background: ${(props) => (props.status === "contacted" ? "url(/assets/grid-yes.png) no-repeat left 8px" : props.status === "ignored" || props.status === "ignoredJustNow" || props.status === "declined" || props.status === "theyDeclined" || props.status === "blocked" ? "url(/assets/grid-delete-hover.png) no-repeat left 8px" : props.status === "shortlisted" ? "url(/assets/grid-maybe-hover.png) no-repeat left 8px" : "url(/assets/grid-yes.png) no-repeat left 8px") //eslint-disable-line
};
  max-width: 151px;
  margin: 11px auto 0;
  white-space: nowrap;
`;

styles.StatusSuccess = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  margin-bottom: 14px;
`;

const horveredIconFor = status => {
  switch (status) {
    case 'ignored':
    case 'ignoredJustNow':
      return 'url(/assets/sr-ignored.png) no-repeat left -16px';
    case 'accepted':
    case 'theyAccepted':
      return 'url(/assets/search-result-icons.png) no-repeat left top';
    case 'declined':
    case 'theyDeclined':
    case 'theyCancelled':
      return 'url(/assets/search-result-icons.png) no-repeat right top';
    case 'contacted':
      return 'url(/assets/express-icons.gif) no-repeat -61px top';
    default:
      return 'url(/assets/express-icons-gray.gif) no-repeat -61px top';
  }
};

const iconFor = status => {
  switch (status) {
    case 'ignored':
    case 'ignoredJustNow':
      return 'url(/assets/sr-ignored.png) no-repeat left top';
    case 'accepted':
    case 'theyAccepted':
      return 'url(/assets/search-result-icons.png) no-repeat left -17px';
    case 'declined':
    case 'theyDeclined':
    case 'theyCancelled':
      return 'url(/assets/search-result-icons.png) no-repeat right -16px';
    case 'contacted':
      return 'url(/assets/express-icons-gray.gif) no-repeat -61px top';
    default:
      return 'url(/assets/express-icons-gray.gif) no-repeat -61px top';
  }
};

styles.StatusIcon = styled.i`
  display: inline-block;
  vertical-align: middle;
  margin: 0 6px 0 0;
  width: ${props => (props.status === 'ignoredJustNow' || props.status === 'ignored' ? '14px' : '19px')};
  height: ${props => (props.status === 'ignoredJustNow' || props.status === 'ignored' ? '14px' : '17px')};
  overflow: hidden;
  background: ${props => (props.isMatchItemHovered ? horveredIconFor(props.status) : iconFor(props.status))};
`;

styles.StatusText = styled.span`
  display: inline-block;
  font: ${props => (props.isDeclinedMsg ? '300 12px' : props.isSingleLine && props.isItalicText ? 'italic 300 13px' : '400 14px')} 'Roboto',
    sans-serif;
  color: ${props => (props.isDeclinedMsg ? '#e53a41' : '#72727d')};
  width: ${props => (props.isSingleLine ? (props.isItalicText ? '110px' : '86px') : '96px')};
  margin: ${props => (props.isSingleLine ? (props.isItalicText ? '15px auto 4px' : '21px auto 10px') : '0 auto 5px')};
  padding: ${props => (props.isDeclinedMsg && props.isSingleLineMsg ? '90px 0 0 0' : props.isDeclinedMsg ? '58px 0 0 0' : '0')};
`;

styles.StatusTextGrid = styles.StatusText.extend`
  width: auto;
  font: normal 16px/40px arial;
`;

styles.ContactNowText = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  color: #72727d;
  text-align: center;
  margin: 0 0 18px;
`;

styles.InvitationStatus = styled.label`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 100%;
  margin: 6px 0;
  text-align: center;
  height: 25px;
`;

styles.InviteStatusIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  background-image: url(/assets/im-icon-sprite-ver2.png);
  background-repeat: no-repeat;
  background-position: left
    ${props =>
      ({
        accepted: '-34px',
        theyAccepted: '-34px',
        declined: '-10px',
        theyDeclined: '-10px',
        cancelled: '-10px',
        theyCancelled: '-10px',
        contacted: '-58px',
        misuseReported: '-58px',
      }[props.status])};
`;

styles.InviteStatusText = styled.span`
  vertical-align: middle;
  font: 14px/27px arial;
  color: #72727d;
`;

styles.InvitationGridWrap = styled.div`
  display: flex;
`;

styles.InvitationBtnContainer = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  ${props => props.customStyle && props.customStyle.map(s => `${s.key}:${s.value};`)};
`;

styles.InvitationBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: ${props => (props.isLargeBtn ? 'auto' : '136px')};
  margin: 3px 9px 3px 0;
  padding: ${props => (props.isLargeBtn && props.isCancelBtn ? '7px 10px' : props.isLargeBtn ? '7px 14px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn ? 'normal' : 'bold')};
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border: 1px solid
    ${props =>
      props.isCancelBtn && props.isUnblock ? '#dfe0e3' : props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5'};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
    border: 1px solid ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
    ${props => props.customStyleHover && props.customStyleHover.map(s => `${s.key}:${s.value};`)};
  }
  ${props => props.customStyle && props.customStyle.map(s => `${s.key}:${s.value};`)};
`;

styles.InvitationBtnWithTooltip = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: ${props => (props.isLargeBtn ? 'auto' : '136px')};
  margin: 3px 9px 3px 0;
  padding: ${props => (props.isLargeBtn && props.isCancelBtn ? '7px 10px' : props.isLargeBtn ? '7px 14px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn ? 'normal' : 'bold')};
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border: 1px solid
    ${props =>
      props.isCancelBtn && props.isUnblock ? '#dfe0e3' : props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5'};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
    border: 1px solid ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
  }
`;

styles.Note = styled.span`
  display: block;
  height: 20px;
  margin-top: 7px;
  color: #b1b3b9;
`;

const statusIconPositions = {
  ignored: 'left -60px',
  contacted: 'left top',
  declined: 'left -100px',
  report: 'left -120px',
  shortlisted: 'left -40px',
  accepted: 'left -20px',
  declined_profile: 'left -100px',
  user_unblock: 'left -100px',
  user_block: 'left -80px',
  misuseReported: 'left -195px',
  respondLater: '',
  reminder_sent: '-27px -44px',
  default: 'left top',
  invitation_cancelled: 'left -100px',
};

const statusIconSprite = {
  reminder_sent: 'url(/assets/profile-revamp-sprite-ver4.png)',
  default: 'url(/assets/profile-icon-sprite-v3.png)',
};

styles.ProfileStatusIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 2px 4px 0 0;
  background-image: ${props => statusIconSprite[props.status] || statusIconSprite.default};
  background-repeat: no-repeat;
  vertical-align: top;
  background-position: ${props => statusIconPositions[props.status] || statusIconPositions.default};
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

styles.ViewHistoryButton = styled.button`
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: #00bcd5;
  text-decoration: none;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
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

styles.separator = styled.span`
  color: #b1b3b9;
  text-align: left;
  display: inline-block;
  margin: 0 5px;
`;

styles.carouselConnectedBtn = styled.button`
  position: relative;
  font: 400 13px/17px 'Roboto', sans-serif;
  background: #fff;
  width: 120px;
  height: 30px;
  color: #b1b3b9;
  line-height: 26px;
  border-radius: 15px;
  transition: all 300ms ease;
  outline: 0;
  border: none;
  text-decoration: none;
  border: 1px solid #dfe0e3;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
  text-align: center;
  &:hover {
    background: #dfe0e3;
    color: #72727d;
  }
`;
styles.connectedTick = styled.div`
  display: inline-block;
  position: relative;
  width: 18px;
  vertical-align: top;
  margin: 3px 0 0;
`;
styles.connectedText = styled.div`
  display: inline-block;
`;

styles.WriteMessageBtn = styled.button`
  display: block;
  background: ${props =>
    props.isPaidUser
      ? props.isHovered ? 'url(/assets/prem/message-hover.svg) left top no-repeat' : 'url(/assets/prem/message.svg) left top no-repeat'
      : 'url(/assets/free/message.svg) left top no-repeat'};
  width: 44px;
  height: 44px;
  margin: ${props => (props.type === 'featured' ? '0 auto 3px' : ' 3px auto')};
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
      : 'url(/assets/free/message.png) left top no-repeat'};
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
  margin: ${props => (props.type === 'featured' ? '0 auto 3px' : '10px auto 3px')};
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

styles.ActiveBtnWrap = styled.div`
  ${props => ['inbox', 'featured'].includes(props.type) && `display: flex;`};
  flex-direction: ${props => ({ inbox: 'column', featured: 'row-reverse' }[props.type])};
  ${props => !['featured'].includes(props.type) && `padding: 6px 0 0;`};
`;

styles.ListBlockText = styled.div`
  display: block;
  margin-top: 80px;
  color: #e53a41;
  font: 300 12px/16px 'Roboto', sans-serif;
  padding: 0 10px;
`;

styles.UpgradeTextLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  outline: 0;
  &:hover {
    text-decoration: underline;
  }
`;

styles.PremSuccessMsg = styled.div``;

styles.SuccessTickImg = styled.div`
  background: url(/assets/green-tick.png) center top no-repeat;
  width: 100%;
  height: 12px;
  margin: -15px 0 3px;
`;

styles.AcceptedMsgWrap = styled.div``;

styles.ContactedWrap = styled.div`
  height: 45px;
  padding: 0 0 0 25px;
  margin: 15px 0 0;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  background-position: ${props => {
    switch (props.status) {
      case 'theyDeclined':
        return 'left -133px';
      case 'contacted':
        return 'left -83px';
      case 'ignored':
        return 'left -60px';
      default:
        return null;
    }
  }};
  font: normal 20px arial;
  color: #333;
  overflow: hidden;
`;

styles.ContactedMsg = styled.p`
  margin: 0px;
  padding: 0px;
  line-height: 22px;
  color: #72727d;
`;

styles.GotoLinkWrap = styled.span`
  font: normal 12px arial;
  font-style: italic;
  margin: 0 0 0 3px;
  display: inline-block;
  color: #72727d;
`;

styles.ProfileName = styled.span`
  color: #333;
  max-width: 250px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
`;

styles.ReVisitWrap = styled.p`
  margin: 0px;
  padding: 0px;
  line-height: 22px;
  color: #72727d;
  font: normal 12px arial;
`;

styles.ReVisitMsg = styled.span`
  line-height: 22px;
  color: #72727d;
  display: inline-block;
`;

styles.ContactLink = styled(Link)`
  padding: 0 3px;
  text-decoration: none;
  outline: 0;
  color: #00bcd5 !important;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

styles.ContactSpan = styled.span`
  padding: 0 3px;
  text-decoration: none;
  outline: 0;
  color: #00bcd5 !important;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

styles.ContactLinkBG = styled(Link)`
  padding: 0 9px 0 3px;
  text-decoration: none;
  outline: 0;
  color: #00bcd5 !important;
  cursor: pointer;
  background: url(/assets/right-gray-arrow.png) no-repeat right center;
  &:hover {
    text-decoration: underline;
  }
`;

styles.SubHeading = styled.span`
  line-height: 22px;
  color: #72727d;
  display: inline-block;
`;

styles.SubMsg = styled.p`
  font: italic 12px arial;
  color: #72727d;
  margin: 0;
  padding: 6px 0;
`;

styles.InboxStatusSuccess = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  ${props =>
    props.isHorizontal
      ? `
    width: 474px;
    padding: 0 20px;
    background: #fcebec;
    font: 300 14px/20px "Roboto", sans-serif;
    color: #51505d;
    border-radius: 3px;
  `
      : `margin-top: 2px;`};
`;

styles.InboxStatusText = styled.span`
  display: inline-block;
  font: ${props => (props.isBold ? '400' : '300')}
      ${props => (props.isHorizontal ? '14px/20px' : `italic ${props.type === 'featured' ? '14px' : '13px'}`)} 'Roboto',
    sans-serif;
  color: ${props => (props.isHorizontal ? '#51505d' : '#72727d')};
  width: ${props => (props.isItalicText ? '110px' : props.isHorizontal ? '100%' : '96px')};
  ${props => props.type === 'featured' && 'width:auto;'};
  margin: ${props => (props.isHorizontal ? '10px 0' : '0 auto')};
  padding: ${props => !props.isHorizontal && '0'};
  position: relative;
`;

styles.RemindBtn = styled.button`
  display: block;
  background: ${props =>
      !props.isDisabled && props.isHovered
        ? (props.membershipTags === 'vip' && 'url(/assets/prem/remind-vip-hover.svg)') || 'url(/assets/prem/remind-hover.svg)'
        : props.isDisabled
          ? (props.membershipTags === 'vip' && 'url(/assets/prem/remind-vip-disabled.svg)') || 'url(/assets/prem/remind-disabled.svg)'
          : (props.membershipTags === 'vip' && 'url(/assets/prem/remind-vip.svg)') || 'url(/assets/prem/remind.svg)'}
    left top no-repeat;
  ${props => props.isDisabled && 'cursor: default;'} width: 46px;
  height: 46px;
  margin: 10px auto 3px;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 0;
  outline: 0;
  ${props =>
    !props.isDisabled &&
    `&:hover {
    background: ${
      props.membershipTags === 'vip' ? 'url(/assets/prem/remind-vip-hover-hover.svg)' : 'url(/assets/prem/remind-hover-hover.svg)'
    }
    }  left top no-repeat;`};
`;

styles.RemindBtnBtnText = styled.button`
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

styles.EoiWrapper = styled.div`
  display: ${props => (['featured'].includes(props.source) ? 'flex' : 'block')};
`;

styles.MsgSpacer = styled.div`
  padding: 0 0 13px;
`;

const ProfileHeading = styled.h5`
  display: block;
  font: italic 300 12px 'Roboto', sans-serif;
  color: #72727d;
  margin: 0 auto 12px;
  white-space: normal;
  width: 125px;
  white-space: normal;
`;

styles.ProfileInvitationHeading = ProfileHeading.extend``;
styles.ProfileDeclineHeading = ProfileHeading.extend`
  color: #e53a41;
  margin: 0 auto;
`;

styles.ProfileInvitationButtonWrapper = styled.div`
  margin: 0 auto;
  display: block;
  width: 110px;
  > button:nth-child(2) {
    width: 100px;
    padding: 0;
  }
`;

styles.SvgCheckmarkWrapper = styled.div`
  position: relative;
  top: -15px;
`;

styles.ProfileInvitationButtonMarginWrapper = styled.div`
  padding: 0 0 7px;
`;

styles.TickContainer = styled.button`  
  background: #fff;
  width:30px;
  height:30px;
  border:2px solid #73c47c; 
  border-radius:15px;
  text-align: center; 
  position: relative; 
  
  }`;

export default styles;
