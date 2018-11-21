import styled from 'styled-components';
import Link from '../../Link';
import { premiumBoldCtaHover, vipBoldCtaHover } from '../../Eoi/utils';

const styles = {};

styles.IgnoredGridText = styled.p`
  font: normal 11px arial;
  color: #72727d;
  width: 183px;
  text-align: center;
  overflow: hidden;
  margin: 16px auto;
`;

styles.HiddenGridText = styled.p`
  font: normal 11px arial;
  width: 183px;
  text-align: center;
  overflow: hidden;
  margin: 16px auto;
`;

styles.IgnoredGridHeading = styled.p`
  font: normal 16px arial;
  color: #72727d;
  padding: 0 6;
  text-align: center;
  margin: 0;
`;

styles.LoadingWrapper = styled.div`
  position: relative;
  min-height: 30px;
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
`;

styles.InvitationHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: normal ${props => (props.isGridItem ? '16px' : props.membershipTags === 'vip' ? '18px' : '20px')}/22px arial;
  color: #72727d;
  margin: ${props => (props.isDr ? '0 0 0 0' : '0 0 7px 0')};
  white-space: nowrap;
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
  width: 136px;
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
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: ${props =>
    props.type && props.type === 'profile' && props.isCancelBtn ? '62px' : props.isLargeBtn ? 'auto' : props.isCarousel ? '100%' : '136px'};
  margin: ${props => (props.hasMore ? '33px 3px 3px 0' : props.membershipTags === 'vip' ? '3px 3px 3px 3px' : '3px 3px 3px 0')};
  padding: ${props => (props.type && props.type === 'profile' && props.isCancelBtn ? '7px 5px' : props.isLargeBtn ? '7px 30px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? 'normal' : 'bold')};
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props =>
    props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : props.membershipTags === 'vip' ? '#ad2241' : '#00bcd5'};
  border: 1px solid
    ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : props.membershipTags === 'vip' ? '#ad2241' : '#00bcd5')};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: ${props => (props.membershipTags === 'vip' ? '#88152f' : props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
    border: 1px solid ${props => (props.membershipTags === 'vip' ? '#88152f' : props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
  }
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
  display: inline-block;
  margin: 0 3px 0 0;
  font: normal 12px/26px arial;
  vertical-align: middle;
  color: #00bcd5;
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

styles.premiumCarouselStyle = styled.div`
  position: relative;
  background: #f1f1f2;
  cursor: pointer;
  border-top: 1px solid #f1f1f2;
  text-align: center;
`;

styles.ConnectBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: 100%;
  margin: 3px 0px 3px;
  padding: ${props => (props.type && props.type === 'profile' && props.isCancelBtn ? '7px 5px' : props.isLargeBtn ? '7px 30px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? 'normal' : 'bold')};
  color: #00bcd5;
  background: #ffffff;
  border: 1px solid
    ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : props.membershipTags === 'vip' ? '#ad2241' : '#00bcd5')};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;
  &:hover {
    background: #ffffff;
    border: 1px solid ${props => (props.membershipTags === 'vip' ? '#88152f' : props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
  }
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
  background: #fff url(/assets/carousel-tick.png) no-repeat 52px 11px;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;
  transition: all 300ms ease;
  &:hover {
    background: #00bcd5 url(/assets/carousel-blue-tick.png) no-repeat 52px 11px;
    border: 1px solid #00bcd5;
    color: #fff;
  }
`;
styles.ConnectTick = styled.span`
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(/assets/carousel-tick.png) no-repeat left top;
  margin: 0 5px 0 0;
`;

styles.SubHeading = styled.p`
  display: inline-block;
  font: italic 11px/22px arial;
  color: #72727d !important;
  padding: 1px 0 0;
  margin: 0;
`;

styles.ClickToChat = styled.button`
  padding: 0;
  outline: 0;
  background: transparent;
  border: 0;
  line-height: initial;
  display: inline-block;
  vertical-align: middle;

  &::after {
    content: '';
    background: url(/assets/chat.gif) no-repeat left top;
    width: 19px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 5px;
  }
`;

styles.MaybeBtn = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: relative;
  text-align: center;
  width: auto;
  padding: 0;
  font: normal 18px arial;
  color: #fff;
  border-radius: 3px;
  border: 0;
  background: transparent;
  outline: 0;
  text-decoration: none;
  margin-right: 9px;
  top: -1px;
`;

styles.MaybeBtnText = styled.span`
  display: inline-block;
  vertical-align: middle;
  background: #83e1ed;
  width: 79px;
  text-align: center;
  line-height: 35px;
  border: 1px solid #83e1ed;
  cursor: pointer;
  border-radius: 3px 0 0 3px;

  &:hover {
    background: #1ba3b6;
    border: 1px solid #1ba3b6;
  }
`;

styles.ActionMessageWrap = styled.div`
  height: 45px;
  padding: 0 0 0 25px;
  margin: 15px 0 0;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  font: normal 20px arial;
  color: #333;
  overflow: hidden;
  background-position: left -83px;
`;

styles.TextWrap = styled.p`
  line-height: 22px;
  color: #72727d;
  margin: 0;
  padding: 0;
`;

styles.MaybeLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.NextLinkWrap = styled.p`
  margin: 0px;
  padding: 0px;
`;

styles.NextLink = styled(Link)`
  padding: 0px 9px 0px 0px;
  background: url(/assets/right-gray-arrow.png) no-repeat right center;
`;

styles.MovingText = styled.p`
  margin: 0px;
  padding: 0px;
  line-height: 22px;
  color: #72727d;
`;

styles.MovingLoader = styled.span`
  width: 15px;
  height: 15px;
  background: url(/assets/loading.gif) no-repeat center;
  vertical-align: top;
  display: inline-block;
  margin: 3px 0 0 3px;
`;

styles.TheyContactedBar = styled.div`
  background-color: #fdfcd8;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  text-align: center;
  padding: 3px 0;
  font: normal 12px arial;
`;

styles.ArrowImage = styled.span`
  background: url(/assets/arrow-respond.png) no-repeat center top;
  display: inline-block;
  width: 28px;
  height: 26px;
  position: absolute;
  left: 345px;
  top: 10px;
  transform: rotate(-26deg);
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
`;

styles.ListHiddenText = styled.div`
  display: block;
  margin-top: ${props => (props.vALign ? `0` : '80px')};
  color: #e53a41;
  font: 300 12px/16px 'Roboto', sans-serif;
  padding: 0 10px;
`;

styles.FeaturedHiddenMsg = styled.div`
  display: block;
  margin-top: ${props => (props.vALign ? `0` : '80px')};
  color: #51505d;
  font: 400 14px/22px 'Roboto', sans-serif;
  padding: 0 10px;
`;
styles.UnhideLinkFeatured = styled(Link)`
  text-decoration: none;
  color: #00bcd5;
  font-weight: 300;
`;
styles.UnhideLink = styled(Link)`
  text-decoration: underline;
  color: #e53a41;
  font-weight: 500;
`;

styles.UnhideLinkGrid = styled(Link)`
  text-decoration: underline;
  color: #00bcd5;
  font-weight: 500;
`;

styles.InfoHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: italic 300 12px 'Roboto', sans-serif;
  color: #72727d;
  margin: 1px 0 6px;
  white-space: nowrap;
`;

styles.ConnectBtn = styled.button`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: relative;
  overflow: hidden;
  width: 46px;
  height: 46px;
  margin: 3px auto;
  background: ${props =>
    props.membershipTags === 'vip'
      ? props.isHovered
        ? 'url(/assets/prem/connect-vip-hover.svg) left top no-repeat'
        : 'url(/assets/prem/connect-vip.svg) left top no-repeat'
      : props.isHovered ? 'url(/assets/prem/connect-hover.svg) left top no-repeat' : 'url(/assets/prem/connect.svg) left top no-repeat'};
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
        ? 'url(/assets/prem/connect-vip-hover-hover.svg) left top no-repeat'
        : 'url(/assets/prem/connect-hover-hover.svg) left top no-repeat'};
  }
`;

styles.PaddingFreeAccess = styled.div`
  height: 10px;
`;

export default styles;
