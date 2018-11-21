import styled from 'styled-components';
import Link from '../../Link';
import { premiumBoldCtaHover, vipBoldCtaHover } from '../../Eoi/utils';

const styles = {};

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
`;

styles.InvitationHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: ${props => (props.isGridItem ? 'normal 16px arial' : 'italic 300 12px "Roboto", sans-serif')};
  color: #72727d;
  margin: ${props => (props.isGridItem ? '0 0 7px 0' : '18px auto 10px')};
  white-space: ${props => (props.isGridItem ? 'nowrap' : 'normal')};
  width: ${props => (props.isGridItem ? 'auto' : '96px')};
`;

styles.InvitationBtnWrap = styled.div`
  margin-bottom: 14px;

  > button {
    flex: 0 1 0.48 !important;
    margin-right: 5px;
  }
`;

styles.InvitationGridWrap = styled.div`
  display: flex;
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
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: ${props => (props.isLargeBtn ? 'auto' : props.isCarousel ? '100%' : '136px')};
  margin: ${props => (props.hasMore ? '33px 3px 3px 0' : '3px 3px 3px 0')};
  padding: ${props => (props.isLargeBtn ? '7px 14px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn ? 'normal' : 'bold')};
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border: 1px solid ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
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

styles.ListRequestBtnsWrap = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: relative;
  justify-content: space-between;
  width: 40px;
  margin: 0 auto 14px;
  min-height: 30px;
  flex-flow: ${props => (props.membershipTags === 'vip' ? 'row wrap' : '')};

  > button {
    flex: ${props => (props.membershipTags === 'vip' ? '0 0 157px !important ' : '')};
  }
`;

styles.ListAcceptBtn = styled.button`
  display: block;
  position: relative;
  overflow: hidden;
  width: 46px;
  height: 46px;
  margin: 3px auto;
  background: ${props =>
    props.isHovered
      ? props.membershipTags === 'vip'
        ? 'url(/assets/prem/connect-vip-hover.svg) left top no-repeat'
        : 'url(/assets/prem/connect-hover.svg) left top no-repeat'
      : props.membershipTags === 'vip'
        ? 'url(/assets/prem/connect-vip.svg) left top no-repeat'
        : 'url(/assets/prem/connect.svg) left top no-repeat'};
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  border: 0;
  outline: 0;
  box-sizing: border-box;

  &:hover {
    background: ${props =>
      props.membershipTags === 'vip'
        ? 'url(/assets/prem/connect-vip-hover-hover.svg) left top no-repeat'
        : 'url(/assets/prem/connect-hover-hover.svg) left top no-repeat'};
  }
`;

styles.ListAcceptBtnText = styled.button`
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
`;

styles.ListDeclineBtn = styled.button`
  display: block;
  position: relative;
  overflow: hidden;
  width: 44px;
  height: 44px;
  margin: 10px auto 3px;
  background: url(/assets/free/skip.svg) left top no-repeat;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  outline: 0;
  border: 0;

  &:hover {
    background: url(/assets/free/skip-hover.svg) left top no-repeat;
  }
`;

styles.ListDeclineBtnText = styled.span`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  display: inline-block;
  background: transparent;
  padding: 0;
  border: 0;
  cursor: pointer;
  outline: 0;
`;

styles.GridInvitationBtn = styled.button`
  display: inline-block;
  position: relative;
  text-align: center;
  width: 71px;
  margin: 3px 3px;
  padding: 7px 0;
  font-size: 13px;
  font-weight: normal;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;

  &:hover {
    background: #1ba3b6;
    border: 1px solid #1ba3b6;
  }
`;

styles.GridDeclineBtn = styled.button`
  display: inline-block;
  position: relative;
  text-align: center;
  width: 71px;
  margin: 3px 3px;
  padding: 7px 0;
  font-size: 13px;
  font-weight: normal;
  color: #bdbdbd;
  background: #eaeaea;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;

  &:hover {
    background: #e2e1e1;
    border: 1px solid #e2e1e1;
  }
`;

styles.DeclineBtn = styled.span`
  position: relative;
  display: inline-block;
  font-size: ${props => (props.isLargeBtn ? '18px' : '14px')};
  font-weight: ${props => (props.isLargeBtn ? 'normal' : 'bold')};
  padding: 0;
  text-align: center;
  width: ${props => (props.isLargeBtn ? 'auto' : '130px')};
  margin: 3px 3px 3px 4px;
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border: 1px solid ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  vertical-align: top;
  height: 35px;
`;

styles.DeclineBtnText = styled.span`
  padding: 8px 12px;
  vertical-align: middle;
  display: inline-block;
  margin: -1px 0 0;
  &:hover {
    margin: -1px 0 0 -1px;
    border: 1px solid #dfe0e3;
    border-right: 0;
    border-radius: 3px 0 0 3px;
    background: #dfe0e3;
    padding: 7px 12px;
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

styles.ViewHistory = styled.a`
  margin: 0 4px 0 5px;
  padding: 0 12px 0 0;
  position: relative;
  color: #00bcd5;
  display: inline-block;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

styles.DropdownIcon = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  background: url(/assets/down-gray.png) no-repeat 5px 12px;
  width: 18px;
  height: ${props => (props.isSmallBtn ? '28px' : '34px')};
  vertical-align: middle;
  &:hover {
    background-color: #dfe0e3;
    border-radius: 0 3px 3px 0;
    border: ${props => (props.type && props.type === 'profile' ? '1px solid #dfe0e3' : '0')};
    border-left: 0;
    border-right: 0;
  }
`;

styles.Dropdown = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  top: 37px;
  width: 147px;
  right: 0;
  background: #fff;
  border: solid 1px #bebebe;
`;

styles.DropdownBtn = styled.button`
  line-height: 28px;
  display: block;
  width: 100%;
  color: #00bcd5;
  padding: 0;
  outline: none;
  background: #fff;
  font-weight: normal;
  text-align: left;
  padding: 0 12px;
  border: 0;
  font-size: 13px;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

styles.InvitationReceivedNotice = styled.p`
  font: 20px/22px arial;
  color: #72727d;
  padding: 0 0 10px;
  margin: 0;
  text-align: left;
`;

styles.Note = styled.span`
  display: block;
  height: 20px;
  margin-top: -8px;
  color: #b1b3b9;
`;

styles.historyMessage = styled.p`
  margin: -5px 0 5px;
  font-style: italic;
  line-height: 15px;
  color: #b1b3b9;
`;

styles.RcMsgMoreLink = styled.a`
  color: #00bcd5;
  padding: 0 0 0 5px;
  text-decoration: none;
  font-style: normal;
  &:hover {
    text-decoration: underline;
  }
`;

styles.RcMsgMoreLinkArrow = styled.span`
  background: url(/assets/shaadi-sprite-2-v5.gif) no-repeat left -83px;
  width: 7px;
  height: 5px;
  display: inline-block;
  margin: 0 0 0 6px;
`;

styles.InvitationStatus = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 100%;
  margin: 6px 0;
  text-align: center;
  height: 35px;
`;

styles.InviteStatusIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  display: ${props => props.status};
  background-image: url(/assets/im-icon-sprite-ver2.png);
  background-repeat: no-repeat;
  background-position: left
    ${props => ({ accepted: '-34px', declined: '-10px', cancelled: '-10px', contacted: '-58px', misuseReported: '-58px' }[props.status])};
`;

styles.InviteStatusText = styled.span`
  vertical-align: middle;
  font: 12px/27px arial;
  color: #00bcd5;
`;

styles.InvitationActions = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  justify-content: ${props => (props.chatMode === 'chatWindow' ? 'center' : 'flex-start')};
  margin: 10px 0;
`;

styles.ChatInvitationBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  font: bold 12px arial;
  padding: 4px 10px;
  border-radius: 3px;
  cursor: pointer;
  border: ${props => (props.isDecline ? 0 : '1px')} solid #00bcd5;
  color: ${props => (props.isDecline ? '#95959d' : '#fff')};
  margin-left: ${props => (props.isDecline ? '5px' : 0)};
  background: ${props => (props.isDecline ? '#f1f1f2' : '#00bcd5')};
  &:hover {
    text-decoration: none;
    background: ${props => (props.isDecline ? '#dfe0e3' : '#0194a8')};
    border: solid ${props => (props.isDecline ? '0 #dfe0e3' : '1 #0194a8')};
  }
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

styles.GamifiedWrapper = styled.div`
  margin: 0 0 5px;
  border-top: 1px solid #ebede4;
  border-left: 1px solid #eaf0db;
  border-right: 1px solid #eaf0db;
  width: 600px;
  color: #b1b3b9;
`;

styles.GamifiedWrapTop = styled.div`
  background: #fff;
  padding: 7px 3px 17px;
  margin: 0;
`;

styles.GamifiedUpgradeIcon = styled.span`
  background: url(https://img2.shaadi.com/community/images/upgrade-now-v2.png) no-repeat left top;
  width: 49px;
  height: 40px;
  display: inline-block;
  vertical-align: top;
`;

styles.GamifiedText = styled.span`
  width: 530px;
  display: inline-block;
  padding: 10px 0 0 3px;
  line-height: 16px;
`;

styles.GamifiedUserName = styled.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  float: left;
  margin: 0 3px 0 0;
`;

styles.GamificationUpgradeLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.GamificationFacebookLink = styled(Link)`
  background: url(https://img2.shaadi.com/imgs/unified/light-grey-arrow.gif) no-repeat right center;
  margin: 5px 0 0;
  padding: 0 10px 0 0;
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.GamifiedWrapBottom = styled.div`
  background: url(https://img2.shaadi.com/community/images/upgradebox-wrap-bottom-white.png) repeat-x left top;
  height: 7px;
`;

const statusIconPositions = {
  contacted: 'left top',
  declined: 'left -100px',
  report: 'left -120px',
  accepted: 'left -20px',
  declined_profile: 'left -100px',
  user_unblock: 'left -100px',
  user_block: 'left -80px',
  misuseReported: 'left -195px',
  respondLater: '',
  default: 'left top',
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

styles.premiumCarouselStyle = styled.div`
  position: relative;
  background: #f1f1f2;
  cursor: pointer;
  border-top: 1px solid #f1f1f2;
  text-align: center;
  height: ${props => (props.isSendPasswordVisible ? '68px' : '57px')};
  padding: 13px 10px 14px;
`;

styles.CarouselConnectBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: relative;
  text-align: center;
  width: 100%;
  margin: 3px 0px 3px;
  padding: 7px 0;
  font: 500 16px 'Roboto', sans-serif;
  color: #00bcd5;
  background: #fff url(/assets/carousel-tick.png) no-repeat 57px 11px;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;
  transition: all 300ms ease;
  &:hover {
    background: #00bcd5 url(/assets/carousel-blue-tick.png) no-repeat 57px 11px;
    border: 1px solid #00bcd5;
    color: #fff;
  }
`;

export default styles;
