import styled from 'styled-components';
import Link from '../../Link';
import { premiumBoldCtaHover, vipBoldCtaHover } from '../../Eoi/utils';

const styles = {};

styles.InvitationHeading = styled.p`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: normal ${props => (props.isGridItem ? '16px' : '20px')} arial;
  color: #72727d;
  margin: 1px 0 6px;
  white-space: nowrap;
`;

styles.InvitationBtnWrap = styled.div`
  display: flex;
  align-items: center;
  height: 44px;

  > button {
    flex: 0 1 0.48 !important;
  }
`;

styles.historyMessage = styled.p`
  margin: -5px 0 0;
  font-style: italic;
  line-height: 15px;
  color: #b1b3b9;
`;

styles.RcMsgMoreLink = styled.a`
  color: #00bcd5;
  padding: 0 0 0 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.RcMsgMoreLinkArrow = styled.span`
  background: url(/assets/shaadi-sprite-2-v5.gif) no-repeat left -83px;
  width: 7px;
  height: 5px;
  display: inline-block;
`;

/* eslint no-nested-ternary: 0 */
styles.InvitationBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: ${props => (props.isLargeBtn ? 'auto' : '136px')};
  margin: 3px 9px 3px 0;
  padding: ${props => (props.isLargeBtn ? '7px 14px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn ? 'normal' : 'bold')};
  font-family: arial;
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border: 1px solid ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;
  white-space: nowrap;

  &:hover {
    background: ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
    border: 1px solid ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
  }
`;

styles.DeclineBtn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: ${props => (props.isLargeBtn ? '18px' : '14px')};
  font-weight: ${props => (props.isLargeBtn ? 'normal' : 'bold')};
  font-family: arial;
  padding: 0;
  text-align: center;
  width: ${props => (props.isLargeBtn ? 'auto' : '130px')};
  margin: 3px 0;
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border: 1px solid ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
`;

styles.DeclineBtnText = styled.span`
  flex: 1 0 auto;
  line-height: 24px;
  padding: 7px 14px;
  background: #f1f1f2;
  &:hover {
    background: #dfe0e3;
    border-radius: 3px 0 0 3px;
    padding: 8px 14px;
  }
`;

styles.DropdownIcon = styled.span`
  display: inline-block;
  background: url(/assets/down-gray.png) no-repeat 5px ${props => (props.isSmallBtn ? '12px' : '16px')};
  width: 18px;
  height: ${props => (props.isSmallBtn ? '28px' : '38px')};

  &:hover {
    background-color: #dfe0e3;
    border-radius: 0 3px 3px 0;
  }
`;

styles.Dropdown = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  top: 37px;
  min-width: 123px;
  right: 0;
  box-shadow: 0 6px 12px rgba(43, 59, 93, 0.35);
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

styles.ContactedTitle = styled.p`
  padding: 0 0 10px;
  margin: 0;
  text-align: left;
  font: 20px/22px arial;
  color: #72727d;
`;

styles.Note = styled.span`
  display: block;
  height: 20px;
  margin: 7px 0 0;
  color: #b1b3b9;
`;

styles.ViewHistoryLink = styled.button`
  background: transparent;
  white-space: nowrap;
  outline: 0;
  padding: 0;
  border: 0;
  color: #00bcd5;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

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

styles.TheyCancelledSection = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

styles.MessageHeading = styled.p`
  flex: 0 0 auto;
  padding: 0 0 10px;
  box-sizing: border-box;
  font: 20px/22px arial;
  color: #72727d;
  margin: 0;
`;

styles.MessageSubHeading = styled.p`
  flex: 0 0 auto;
  box-sizing: border-box;
  font: 12px arial;
  color: #b1b3b9;
  width: 425px;
  margin: 0;
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

styles.InvitationProfileBtnWrapper = styled.div`
  > button {
    margin-right: 9px;
  }
`;

styles.CtaHeading = styled.p`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: italic 300 12px 'Roboto', sans-serif;
  color: #72727d;
  margin: 0 0 6px;
  white-space: nowrap;
`;

styles.InfoHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  ${props =>
    props.isHorizontal
      ? `color: #51505d;font: 300 14px/20px "Roboto",sans-serif;width: 390px;padding: 10px 62px;background: #fcebec;border-radius: 3px;`
      : `color: #e53a41;font: 300 12px/16px 'Roboto', sans-serif;`} margin: ${props => (props.isHorizontal ? '10px 0' : '0 auto 18px')};
  ${props => !props.isHorizontal && 'width: 126px'};
`;

styles.InvitationBtnContainer = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.ListRequestBtnsWrap = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  opacity: ${props => (props.isDisabled ? '0.3' : 1)};
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
styles.ArchivedMsgWrap = styled.div``;
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
  outline: 0;
  border: 0;
  cursor: ${props => (props.isDisbled ? 'default' : 'pointer')};

  ${props =>
    !props.isDisbled &&
    `${`&:hover {
    background: url(/assets/free/skip-hover.svg) left top no-repeat;
  };
  `}}`};
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
styles.MsgBtnGrp = styled.div``;
styles.ContactBtnGrp = styled.div`
  ${props => props.type === 'featured' && 'margin:0 20px 0 0'};
`;
styles.justNowCase = styled.div`
  display: flex;
  flex-direction: ${props => ({ inbox: 'column', featured: 'row' }[props.type])};
  ${props => props.type === 'similarProfile' && 'padding: 15px 0 0 28px'};
`;
styles.SvgCheckmark = styled.div`
  position: relative;
  ${props => props.type && { featured: 'margin:2px 9px 0 0', similarProfile: 'margin:2px 9px 0 -4px' }[props.type]};
`;
styles.msgItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 17px 22px 0 0;
`;
styles.ActionMsg = styled.div`
  font: italic 300 12px/20px 'Roboto', sans-serif;
  color: #95959d;
  text-align: left;
`;
styles.ActHeading = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: 400 14px/20px 'Roboto', sans-serif;
  color: #51505d;
  margin: 0 0 6px;
  white-space: nowrap;
`;
styles.AcceptGrp = styled.div``;
export default styles;
