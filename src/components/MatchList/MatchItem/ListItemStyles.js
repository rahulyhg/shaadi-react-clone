import styled from 'styled-components';
import Link from '../../Common/Link';
import ListingCard from '../../../theme/BoxShadow';

const styles = {};

styles.MatchItem = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
  margin: 10px;
`;

styles.MatchItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  -ms-flex-align: start;
  background: #fff;
  padding: 18px 6px 16px 16px;
  border: solid ${props => (props.membershipTags === 'vip' ? '1px #aa1e3c' : '0 transparent')};
`;

styles.CheckBoxWrap = styled.div`
  display: inline-block;
  margin: 2px 11px 0 0;
`;

styles.CheckBox = styled.input`
  display: inline-block;
  flex: 0 0 12px;
`;

styles.Profile = styled.div`
  flex: 1 1 auto;
  width: 100%;
  max-width: 680px;
`;

styles.InvitationBanner = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: ${props => (props.plan === 'Select' ? '#f0daf9' : '#dfe0e3')};
  padding: 3px 0 3px 74px;
  font: 11px arial;
  color: #75757d;
  position: relative;
`;

styles.ArrowIcon = styled.span`
  position: absolute;
  display: inline-block;
  top: 7px;
  left: 41px;
  background: url(/assets/arrow-respond.png) no-repeat left top;
  width: 28px;
  height: 26px;
`;

styles.Header = styled.div`
  margin: 0 0 12px;
`;

styles.Name = styled.span`
  display: flex;
  align-items: center;
  margin-top: -3px;
`;

styles.HoroscopeIcon = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 20px;
  height: 15px;
  background: ${props =>
    props.horoscopeStatus === 'locked'
      ? 'url(/assets/horoscope-lock-grey-v1.png) no-repeat left top'
      : props.horoscopeStatus === 'availableOnRequest'
        ? 'url(/assets/horoscope-lock-v2.gif) no-repeat left bottom'
        : 'url(/assets/icon-set-1-v5.png) no-repeat -229px -3px'};
  margin: 0 4px 0 8px;
  cursor: pointer;
`;

styles.ContactIcon = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 15px;
  height: 21px;
  margin: 0 0 0 10px;
  cursor: pointer;
  background: url(/assets/phone-v2.gif) no-repeat
    ${props => ({ available: '-41px', locked: 'left', availableOnRequest: '-20px', availableOnVerification: 'left' }[props.status])} top;
`;

styles.NameLink = styled.span`
  color: #00bcd5;
  font-weight: bold;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${props => (props.isGridPage ? '14px' : 'normal')};
`;

styles.ProfileNameLink = styled(Link)`
  color: ${props => (props.membershipTags === 'vip' ? '#aa1e3c' : '#00bcd5')};
  font-weight: bold;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${props => (props.isGridPage ? '14px' : 'normal')};

  &:hover {
    text-decoration: underline;
  }
`;

styles.HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`;

styles.ChatGridIcon = styled.span`
  background: url(/assets/grid-chat.png) no-repeat left top;
  width: 19px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 5px;
`;

styles.AvailabilityText = styled.div`
  font-size: 11px;
  color: #95959d;
  display: block;
  margin: 5px 0 0;
`;

styles.ChatGridLink = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: #fff;
  font-size: 11px;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  height: 11px;
`;

styles.Content = styled.div`
  display: flex;
  width: 100%;
`;

styles.Info = styled.div`
  flex: 1 1 auto;
  width: 100%;
`;

styles.TopSectionInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-right: 25px;
`;

styles.DetailList = styled.ul`
  margin-top: 0;
  margin-bottom: 10px;
  list-style: none;
  padding-left: 0;
  width: 343px;
`;

styles.DetailItem = styled.li`
  padding: 4px 0;
`;

styles.DetailTerm = styled.span`
  display: inline-block;
  width: 105px;
  font: 12px arial;
  color: #b1b3b9;
  background: url(/assets/colen.gif) no-repeat 95px 5px;
`;

styles.DetailDesc = styled.span`
  display: inline-block;
  font: 300 14px/22px 'Roboto', sans-serif;
  width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

styles.Bio = styled.div`
  margin: 0 20px 0 0;
  padding: 10px 0;
  border-top: 1px solid #f1f1f2;
`;

styles.ReadMoreLink = styled(Link)`
  margin-left: 3px;
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.TopRightSection = styled.div`
  width: 160px;
`;

styles.FullProfileLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.ReadMoreLinkText = styled.span`
  text-decoration: underline;
`;

styles.ReadMoreIcon = styled.img`
  display: inline-block;
  width: 7px;
  height: 9px;
  margin-left: 3px;
`;

styles.FullProlfileIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 0 6px 0 0;
  width: 16px;
  height: 17px;
  overflow: hidden;
  background: ${props => (props.isHovered ? 'url(/assets/viewprofile-icon.gif)' : 'url(/assets/viewprofile-icon-gray.gif)')} no-repeat;
`;

styles.TwoWayTag = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: relative;
  margin-left: 12px;
  background: #ffad46;
  padding: 0 5px 0 3px;
  color: #fff;
  font: 11px/16px arial;
  cursor: default;

  &:before {
    content: '';
    position: absolute;
    right: 100%;
    top: 0;
    display: inline-block;
    background: url(/assets/src-flag-notch-v2.png) no-repeat top left;
    width: 8px;
    height: 16px;
  }
`;

styles.GridItem = styled.div`
  width: 220px;
  margin: 10px;
  cursor: pointer;
  position: relative;
  transition-duration: 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-top: ${props => (props.plan === 'PremiumPlus' || props.isBoldListing || props.plan === 'Select' ? '2px' : 0)} solid
    ${props => (props.plan === 'Select' ? '#d3bcff' : '#ff5a60')};
  border-bottom: ${props => (props.plan === 'PremiumPlus' || props.isBoldListing || props.plan === 'Select' ? '2px' : 0)} solid
    ${props => (props.plan === 'Select' ? '#d3bcff' : '#ff5a60')};
  border-color: ${props =>
    (props.plan === 'PremiumPlus' || props.isBoldListing) && props.plan !== 'Select'
      ? '#ff5a60'
      : props.plan === 'Select' ? '#e49dff' : 'transparent'};

  &:hover {
    box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29), 0 0 10px rgba(43, 59, 93, 0.29);
  }
`;

styles.Body = styled.div`
  padding: 8px 10px 13px 10px;
  background: #fff;
  margin-top: -15px;
  height: 128px;
  box-sizing: border-box;
`;

styles.Availability = styled.span`
  display: block;
  color: #fff;
  top: -20px;
  position: relative;
  left: 10px;
  font-size: 11px;
`;

styles.DetailItems = styled.span``;
styles.DetailItem = styled.div`
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: ${props => (props.isGridItem ? 0 : '8px')};

  &:last-child {
    padding-bottom: 0;
  }
`;

styles.astroMatch = styled.div`
  color: #72727d;
  font-size: 11px;
`;

styles.astroScore = styled.span`
  color: #f8991c;
  display: inline-block;
`;
styles.VipBio = styled.div`
  margin: 0 20px 0 0;
  padding: 26px 0 10px;
  border-top: 1px solid #e7cea5;
  color: #aa1e3c;
  text-align: right;
`;
styles.VipBioDetails = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  text-align: right;
`;

styles.VipReadMoreLink = styled(Link)`
  margin-left: 3px;
  color: #aa1e3c;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

styles.MatchItemWrap = styled.div`
  border: solid ${props => (props.membershipTags === 'vip' ? '1px #aa1e3c' : '0 transparent')};
  background: #fff;
  display: flex;
  height: 248px;
  position: relative;
  width: 734px;
  border-radius: 3px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
  box-shadow: ${ListingCard['box-shadow']};
  &:hover {
    box-shadow: ${ListingCard.hover_shadow};
  }
`;

styles.ProfileDetailsWrap = styled.div`
  flex: 1 0 370px;
  padding: 0 20px 0 20px;
`;
styles.ProfileTopWrap = styled.div`
  border-bottom: 1px solid #dfe0e3;
`;
styles.ProNameWrap = styled.div`
  display: flex;
`;
styles.ProNameInnerWrap = styled.div`
  flex: 1 0 339px;
  padding: 14px 0 0;
  height: 30px;
  width: 339px;
`;
styles.ProNameLink = styled(Link)`
  font: 400 18px/22px 'Roboto', sans-serif;
  color: #51505d;
  text-decoration: none;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  flex: 1;
  color: #818181;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  text-align: left;
  cursor: ${props => (props.isLinkActive ? 'pointer' : 'default')};
`;
styles.ChatIcon = styled.span`
  background: ${props => (props.isVisible ? 'url(/assets/chat-v1.gif)' : 'url(/assets/offline-chat.png)')} no-repeat left top;
  width: 19px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
`;
styles.ProfileDetails = styled.div`
  margin: 10px 0 0;
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
styles.Bios = styled.div`
  font: 300 14px/22px 'Roboto', sans-serif;
  color: #72727d;
  width: 370px;
  word-wrap: break-word;
  margin: 10px 0 0;
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
styles.CtaWrap = styled.div.attrs({ 'data-test-selector': props => `${props.type}Item_CTA ${props.isSkuFeature}` })`
  border-left: 1px solid #dfe0e3;
  text-align: center;
  margin: 20px 0;
  position: relative;
  flex: 1 0 123px;
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

styles.FailureMessage = styled.span`
  font: 300 12px/16px 'Roboto', sans-serif;
  color: #e53a41;
  width: 96px;
  margin: 0 auto;
  display: inline-block;
  padding: ${props => (props.displayStatusMessageLength > 80 ? '44px 0 0 0' : '75px 0 0 0')};
`;
styles.spotlightHeader = styled.div`
  width: 734px;
  display: flex;
  background: #dbf7fb;
  border-bottom: solid 1px #b2e6e9;
  border-top: solid 1px #a6e7fd;
  padding: 9px 0 6px 15px;
  font: 500 20px/16px 'Roboto', sans-serif;
  color: #3094a2;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  box-sizing: border-box;
`;
styles.SpotLightDesc = styled.div`
  font: 400 13px/16px 'Roboto', sans-serif;
  margin-left: 9px;
`;
styles.SpotLightIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(/assets/spotlight-grid-v1.png) no-repeat left top !important;
  color: #2b9cc6;
  margin-left: 3px;
`;
styles.Score = styled.div`
  display: flex;
  justify-content: center;
  font: 400 14px 'Roboto', sans-serif;
  color: #72727d;
`;

styles.HoroscopeLink = styled.div`
  color: #00bcd5;
  font: 700 13px 'Roboto', sans-serif;
  text-decoration: underline;
  cursor: pointer;
`;

styles.ScoreText = styled.div`
  margin: 0 5px 0 6px;
`;

export default styles;
