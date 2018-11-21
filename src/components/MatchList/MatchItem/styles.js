import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.MatchItem = styled.div`
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  border-top: solid
    ${props =>
      props.isSpotLight
        ? '0 #fff'
        : props.membershipTags === 'vip'
          ? '0 #fff'
          : props.plan === 'PremiumPlus'
            ? '5px #ff5a60'
            : props.plan === 'Select' ? '5px #e49dff' : props.isBoldListing ? '5px #ff5a60' : '0 #fff'};
  border-bottom: solid
    ${props =>
      props.isSpotLight
        ? '0px transparent'
        : props.membershipTags === 'vip' ? '0px transparent' : props.plan === 'PremiumPlus' ? '2px #fff' : '2px transparent'};
  transition: 0.2s all;
  border-radius: 3px;
  margin-bottom: 20px;
  width: 100%;

  &:hover {
    box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29), 0 0 13px rgba(43, 59, 93, 0.29);
  }
`;

styles.spotlightOverlayGrid = styled.div`
  height: 27px;
  width: 220px;
  background: #e7fbff;
  opacity: 0.63;
  filter: alpha(opacity=63);
  z-index: 2;
  overflow: hidden;
  position: absolute;
`;
styles.spotLightSpanGrid = styled.span`
  margin: 0 25px 0 0;
  float: right;
  margin: 0 10px 0 0;
  background: url(/assets/spotlight-grid-v1.png) no-repeat left top !important;
  padding: 0 0 0 18px;
  color: #2b9cc6;
  font: bold 14px arial;
  position: absolute;
  right: 0;
  top: 4px;
  z-index: 2;
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
  ${props => (props.isSimilar ? '' : 'margin: 0 0 12px')};
  ${props =>
    props.isSimilar &&
    'position: absolute;background: url(/assets/name-bg.png) no-repeat;height: 49px;width: 100%;line-height: 30px;top: 119px;text-align: center;letter-spacing: 0.38px;'};
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
  ${props => props.isSimilar && 'font-family: Roboto, sans-serif;width: 140px;display: inline-block;margin: 0 auto;'};
  color: ${props => (props.isSimilar ? '#fff' : '#00bcd5')};
  font-weight: ${props => (props.isSimilar ? 500 : 'bold')};
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${props => (props.isGridPage ? '14px' : props.isSimilar ? '16px' : 'normal')};
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

styles.spotlightHeader = styled.div`
  background: #dbf7fb;
  border-bottom: solid 1px #b2e6e9;
  border-top: solid 1px #a6e7fd;
  padding: 9px 0 6px 40px;
`;

styles.fl = styled.div`
  float: left;
`;

styles.HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`;

styles.ChatIcon = styled.span`
  background: url(/assets/chat.gif) no-repeat left top;
  width: 19px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 5px;
`;

styles.ChatGridIcon = styled.span`
  background: url(/assets/grid-chat.png) no-repeat left top;
  width: 19px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 5px;
`;

styles.AvailabilityText = styled.p`
  font-size: 11px;
  color: #95959d;
  display: block;
  margin: 5px 0 0;
`;

styles.ChatLink = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: #818181;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
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

styles.DetailDesc = styled.span``;

styles.Bio = styled.p`
  margin: 0 20px 0 0;
  padding: 10px 0;
  border-top: 1px solid #f1f1f2;
`;

styles.ReadMoreLink = styled(Link)`
  margin-left: 3px;
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: none;
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
  &:hover {
    text-decoration: underline;
  }
`;

styles.spotlightImg = styled.img`
  width: 95px;
  height: 21px;
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
styles.featureHereGrid = styled.p``;
styles.GridItem = styled.div`
  width: ${props => (props.isSimilar ? '150px' : '220px')};
  margin: ${props => (props.isSimilar ? '0px' : '10px')};
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition-duration: 0.2s;
  box-shadow: ${props => (props.isSimilar ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)')};
  background: ${props => (props.isSimilar ? '#fff' : '#f1f1f2')};
  border-radius: 3px;
  &:hover {
    ${props => (props.isSimilar ? '' : 'box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)')};
  }
`;

styles.PlanBorder = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  top: 0;
  border-radius: 3px;
  border-top: ${props => (props.isSpotLight || props.plan === 'PremiumPlus' || props.isBoldListing || props.plan === 'Select' ? '2px' : 0)}
    solid ${props => (props.isSpotLight ? '#47bbe6' : props.plan === 'Select' ? '#d3bcff' : '#ff5a60')};
  border-color: ${props =>
    props.isSpotLight
      ? '#47bbe6'
      : (props.plan === 'PremiumPlus' || props.isBoldListing) && props.plan !== 'Select'
        ? '#ff5a60'
        : props.plan === 'Select' ? '#e49dff' : 'transparent'};
`;

styles.PlanBtmBorder = styles.PlanBorder.extend`
  top: auto;
  bottom: 0;
`;

styles.Body = styled.div`
  padding: ${props => (props.isSimilar ? '8px 10px 17px 10px' : '8px 10px 13px 10px')};
  background: #fff;
  margin-top: ${props => (props.isSimilar ? 0 : '-15px')};
  height: ${props => (props.hasMore ? '109px' : props.isCarousel ? 'auto' : '128px')};
  box-sizing: border-box;
  position: relative;
  ${props => props.isSimilar && 'text-align: center;font-family: Roboto, sans-serif;'};
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
  line-height: ${props => (props.isSimilar ? 17 : 16)}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: ${props => (props.isGridItem || props.isSimilar ? 0 : '8px')};
  color: #72727d;
  font-size: ${props => (props.isSimilar ? 13 : 12)}px;
  ${props => props.isSimilar && 'font-weight: 400'};
  &:last-child {
    padding-bottom: 0;
  }
`;

styles.LastOnlineAt = styled.span`
  border-left: 1px solid #b3b2ad;
  margin: 0 0 0 6px;
  padding: 0 0 0 6px;
  display: inline-block;
  line-height: 10px;
`;

styles.astroMatch = styled.div`
  color: #72727d;
  font-size: 11px;
`;

styles.astroScore = styled.span`
  color: #f8991c;
  display: inline-block;
`;
styles.VipBio = styled.p`
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

styles.spotlightGridPayLink = styled(Link)`
  text-align: right;
  font: normal 12px arial;
  color: #00bcd5 !important;
  width: 228px;
  display: inline-block;
  margin: -5px 0 -9px;
  text-decoration: none;
`;

styles.clear = styled.div`
  clear: both;
`;

styles.spotlightListPayLink = styled(Link)`
  font-size: 11px;
  color: #00bcd5 !important;
  padding: 2px 0 0 10px;

  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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

styles.FeatureYourProfile = styled(Link)`
  text-align: right;
  font: normal 12px arial;
  color: #00bcd5;
  width: 228px;
  display: inline-block;
  margin: -5px 0 -9px;
  text-decoration: none;
  position: absolute;
`;

styles.CarouselGridBox = styled.div`
  display: block;
  margin-top: -76px;
  background: rgba(0, 0, 0, 0.4);
  color: white !important;
  height: 76px;
  padding: 8px 10px 13px 6px;
  box-sizing: border-box;
  position: relative;
`;
styles.CarouselHeader = styled.div`
  margin: 2px 0 4px;
`;

styles.PremiumCarouselItem = styled.div`
  width: 200px;
  margin: 10px;
  cursor: pointer;
  position: relative;
  transition-duration: 0.2s;
`;
styles.CarouselNameLink = styled.span`
  color: #fff;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font: 400 18px 'Roboto', sans-serif;
  padding: 0 5px 0 0;
`;
styles.CarouselDetailItem = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: ${props => (props.isGridItem ? 0 : '8px')};
  &:last-child {
    padding-bottom: 0;
  }
`;
styles.CarouselChatGridLink = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: #fff;
  font: 300 13px 'Roboto', sans-serif;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  height: 11px;
`;

export default styles;
