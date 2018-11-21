import styled, { keyframes } from 'styled-components';
import Link from '../../../Common/Link';
import ListingCard from '../../../../theme/BoxShadow';

const styles = {};
const bgchange = keyframes`
  0% {
    background: #e5f9fc;
  }
  100% {
    background: #fff;
  }
`;

styles.MatchItemWrap = styled.div`
  background: #fff;
  border: solid 1px ${props => (props.membershipTags === 'vip' ? '#aa1e3c' : 'transparent')};
  border-radius: 3px;
  display: flex;
  ${props => props.isHorizontal && `flex-wrap:wrap;`};
  flex-wrap: wrap;
  margin: 10px 10px 10px 0;
  position: relative;
  width: 734px;
  min-height: 215px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  ${props => props.isNew && `animation: ${bgchange} 10s ease`};
  box-shadow: ${ListingCard['box-shadow']};
  &:hover {
    box-shadow: ${ListingCard.hover_shadow};
  }
`;

styles.PremiumBadgeWrap = styled.span`
  display: inline-block;
  position: relative;
  min-width: 30px;
  height: 10px;
  vertical-align: middle;
`;
styles.profileActionInfo = styled.div`
  background: ${props => (props.isWarning ? '#fcebec' : '#dbf7fb')};
  border-radius: 3px;
  font: 300 14px/20px 'Roboto', sans-serif;
  color: #51505d;
  padding: 10px 17px;
  margin: 14px 0 10px;
  text-align: center;
`;

styles.PostTime = styled.div`
  flex: 1;
  font: 300 12px 'Roboto', sans-serif;
  color: #95959d;
  text-align: right;
  padding: 22px 0 0;
`;

styles.ProfileDetailsWrap = styled.div.attrs({
  'data-test-selector': 'both_party_ab',
})`
  flex: 1 0 356px;
  padding: 0 20px 13px 30px;
`;

styles.ProfileTopWrap = styled.div`
  border-bottom: 1px solid #dfe0e3;
`;

styles.ProNameWrap = styled.div`
  display: flex;
`;

styles.ProNameInnerWrap = styled.div`
  display: flex;
  padding: 18px 0 0;
  height: 30px;
  width: 288px;
`;

styles.ProNameLink = styled(Link)`
  font: 400 18px/22px 'Roboto', sans-serif;
  color: #51505d;
  text-decoration: none;
  vertical-align: middle;
  max-width: 216px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin: 0 10px 0 0;
  &:hover {
    text-decoration: underline;
  }
`;

styles.ProfileTopInnerWrap = styled.div`
  display: flex;
  font: 300 14px 'Roboto', sans-serif;
  color: #95959d;
  padding: 0 0 10px;
`;
styles.LastOnlineAt = styled.span`
  margin: 0 0 0 6px;
  display: inline-block;
  cursor: ${props => (props.isLinkActive ? 'pointer' : 'auto')};
`;
styles.ChatLink = styled.button`
  display: inline-block;
  color: #818181;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: ${props => (props.isLinkActive ? 'pointer' : 'default')};
`;
styles.ChatIcon = styled.span`
  background: ${props => (props.isVisible ? 'url(/assets/chat-v1.gif)' : 'url(/assets/offline-chat.png)')} no-repeat left top;
  width: 19px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
`;

styles.ProfileTopInnerWrap = styled.div`
  display: flex;
  font: 300 14px 'Roboto', sans-serif;
  color: #95959d;
  padding: 0 0 10px;
`;

styles.AvailabilityText = styled.p`
  font-size: 11px;
  color: #95959d;
  display: block;
  margin: 5px 0 0;
`;

styles.BoldText = styled.span`
  font-weight: 500;
`;

styles.BoldTextLink = styled.button`
  color: #00bcd5;
  border: 0;
  outline: 0;
  background: transparent;
`;

styles.ProfileDetails = styled.div`
  margin: 8px 0 0;
  > span:nth-child(1) {
    margin: 0 10px 0 0;
  }
  > span:nth-child(3) {
    margin: 0 10px 0 0;
  }
  > span:nth-child(5) {
    margin: 0 10px 0 0;
  }
`;

styles.MsgIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 13px;
  background: url(/assets/msg-icon.png) left top no-repeat;
  margin: 2px 6px 0 0;
`;

styles.Bios = styled.div`
  font: 300 14px/22px 'Roboto', sans-serif;
  color: #51505d;
  width: 367px;
  word-wrap: break-word;
  margin: 14px 0 0;
`;

styles.VipBios = styles.Bios.extend`
  font: 300 12px 'Roboto', sans-serif;
  color: #aa1e3c;
  text-align: right;
  background: #f6ecdd;
  padding: 8px 13px;
  border-radius: 3px;
  box-sizing: border-box;
`;

styles.BothPartyWrap = styled.div`
  font: 300 12px 'Roboto', sans-serif;
  color: #51505d;
  text-align: center;
  border: 1px dashed #94e6f1;
  border-radius: 3px;
  background: #fff;
  position: relative;
  padding: 14px 20px 12px;
  margin: 21px 0 10px;
`;

styles.BothPartyIcon = styled.span`
  display: inline-block;
  background: url(/assets/two-way-msg-icon.png) left top no-repeat;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  margin: -15px 0 0 -15px;
`;

styles.LockIcon = styled.span`
  display: inline-block;
  background: url(/assets/grey-lock-icon.png) left top no-repeat;
  width: 15px;
  height: 12px;
`;

styles.LockIconWrapper = styled.div`
  display: inline-block;
`;

styles.ProfileNameLink = styled(Link)`
  font-weight: bold;
  color: #51505d;
  text-decoration: none;
  font-style: bold;
  outline: 0;
  &:hover {
    text-decoration: underline;
  }
`;

styles.ParaDivider = styled.div`
  width: 48px;
  border-top: 1px solid #dfe0e3;
  margin: 10px auto;
`;

styles.BothPartyLinkWrap = styled.div`
  font: 300 14px 'Roboto', sans-serif;
`;

styles.BothPartyLink = styled(Link)`
  font-weight: 400;
  color: #00bcd5;
  text-decoration: none;
  outline: 0;
  &:hover {
    text-decoration: underline;
  }
`;

styles.LinkArrow = styled.span`
  display: inline-block;
  background: url(/assets/auto-pagnation-sprite.png) left -56px no-repeat;
  width: 9px;
  height: 12px;
  margin: 0 0 0 5px;
`;

styles.CtaWrap = styled.div.attrs({ 'data-test-selector': props => `${props.type}Item_CTA ${props.isSkuFeature}` })`
  ${props =>
    props.isHorizontal
      ? `

    margin: 0 20px 22px auto;
  border-radius: 3px;
  text-align: center;
  
  `
      : `border-left: 1px solid #dfe0e3;
  text-align: center;
  margin: 14px 0;
  display: flex;
  flex: 1 0 134px;
  justify-content: center;
  align-items: center;`};
`;
styles.emailPhoneHiddenMsg = styled.span`
  color: #c1690b;
  background: #ffffbe;
`;
styles.DetailDesc = styled.span`
  display: block;
  font: 300 14px/22px 'Roboto', sans-serif;
  overflow: hidden;
  white-space: nowrap;
  max-width: 367px;
  text-overflow: ellipsis;
  color: #51505d;
`;

styles.Bio = styled.p`
  margin: 0 20px 0 0;
  padding: 10px 0;
  border-top: 1px solid #f1f1f2;
`;
styles.RMSection = styled.div`
  display: inline-block;
`;
styles.ReadMoreLink = styled(Link)`
  margin-left: 3px;
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.FailureMessage = styled.span`
  font: 300 12px/16px 'Roboto', sans-serif;
  color: #e53a41;
  width: 96px;
  margin: 0 auto;
  display: inline-block;
  padding: ${props => (props.displayStatusMessageLength > 80 ? '44px 0 0 0' : '75px 0 0 0')};
`;
styles.ItemWrap = styled.div`
  overflow: ${props => (props.justNow ? 'hidden' : 'visible')};
  max-height: ${props => (props.justNow ? '0' : '780px')};
  transition: 3s linear all 8s;
  width: 100%;
`;
export default styles;
