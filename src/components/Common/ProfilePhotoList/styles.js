import styled from 'styled-components';
import Link from '../Link';
import ListingCard from '../../../theme/BoxShadow';

const styles = {};

styles.ProfilePhoto = styled.div`
  flex: 0 0 ${props => ({ grid: '100%', profile: 'auto', list: '200px', inboxCard: '170px' }[props.type])};
  height: ${props => (props.type === 'grid' ? '220px' : 'auto')};
  ${props => (props.isOverlay ? 'z-index: 0' : '')};
  &:hover nav {
    display: ${props => (props.isNavVisible && props.type === 'grid' ? 'inline-block' : props.type !== 'grid' ? 'flex' : 'none')};
  }
`;

styles.ProfilePhotoContactSummary = styled.div`
  height: ${props => (props.type === 'grid' ? '220px' : 'auto')};

  &:hover nav {
    display: ${props => (props.isNavVisible && props.type === 'grid' ? 'inline-block' : props.type !== 'grid' ? 'flex' : 'none')};
  }
`;
styles.ImgInbox = styled.div`
  background: ${props => `url(${props.src})`} center top / cover no-repeat;
  width: ${props => (props.type === 'FeaturedCard' ? '100px' : '150px')};
  height: ${props => (props.type === 'FeaturedCard' ? '100px' : '150px')};
  border-radius: ${props => (props.type === 'similarCard' ? '3px 3px 0 0' : '50%')};
  ${props => !['similarCard', 'FeaturedCard'].includes(props.type) && 'margin:20px 0 0 20px'};
  border: ${props => (props.type === 'similarCard' ? 'none' : '1px solid #dfe0e3')};
  box-sizing: border-box;
  position: relative;
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
  overflow: hidden;
  text-align: center;
`;
styles.ImgContactSummary = styled.div`
  background: ${props => `url(${props.src})`} center top / cover no-repeat;
  width: 61px;
  height: 61px;
  border-radius: 50%;
  margin: 2px 0 0 10px;
  border: 1px solid #dfe0e3;
  box-sizing: border-box;
  position: absolute;
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
  overflow: hidden;
  text-align: center;
`;
styles.ContactSummaryWrapper = styled.div`
  width: 71px;
  height: 71px;
`;
styles.RequestInfo = styled.div`
  font: 300 12px 'Roboto', sans-serif;
  color: ${props => (props.isClickable ? '#00bcd5' : '#95959d')};
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
  text-align: center;
  cursor: pointer;
  position: absolute;
  bottom: -22px;
  left: 20px;
  width: 150px;
  text-align: center;
`;
styles.PhotoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
  top: 0;
  z-index: 1;
`;

styles.PhotoOverlayCopy = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  margin-top: -24px;
  font-size: 18px;
`;

styles.PhotoOverlayCount = styled.div`
  font-size: 30px;
  line-height: 1;
`;

styles.SlidesWrapper = styled.div`
  position: relative;

  &:hover > nav {
    display: flex;
  }
`;

styles.CaptionBg = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  left: 0;
  bottom: 0;
  background: url(/assets/pboto-bg.png) repeat-x left bottom;
  width: 220px;
  height: 39px;
`;

styles.Slides = styled.div`
  position: relative;
  height: ${props => ({ grid: '220px', profile: '400px', list: '248px' }[props.type])};
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  border-radius: ${props => (['profile'].includes(props.type) ? '3px' : props.showSpotLight ? '0 0 0 3px' : '3px 0 0 3px')};
  ${props =>
    ['profile'].includes(props.type) &&
    (props.isHovered ? `box-shadow:${ListingCard.hover_shadow}` : `box-shadow:${ListingCard['box-shadow']}`)};
`;

styles.VisibleOnAcceptWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

styles.VisibleOnAcceptWrapperProfile = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin-top: -15px;
`;

styles.RequestPhotoWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
  margin-top: ${props => (props.type === 'profile' ? '-15px' : '')};
`;

styles.LockIcon = styled.span`
  display: inline-block;
  background: url(/assets/icn-photo-protected-v2.png) no-repeat center center;
  width: 31px;
  height: 40px;
`;

styles.LockIconList = styled.span`
  display: inline-block;
  background: url(/assets/icn-photo-protected-v2.png) no-repeat center center;
  width: 31px;
  height: 40px;
  cursor: pointer;
`;

styles.LockIconProfile = styled.span`
  display: inline-block;
  background: url(/assets/icn-photo-protected-v2.png) no-repeat center center;
  width: 31px;
  height: 40px;
  cursor: ${props => (props.source === 'visibeonupgrade' ? 'pointer' : 'default')};
`;

styles.VisibeOnUpgradeText = styled.span`
  display: block;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  width: ${props => (props.type === 'grid' ? '220px' : '142px')};
  font: 400 ${props => (props.type === 'grid' ? '16px' : '12px')} 'Roboto', sans-serif;
  text-align: center;
  cursor: pointer;
  margin-bottom: ${props => (props.type === 'grid' ? '8px' : '5px')};
`;

styles.VisibeOnUpgradeTextProfile = styled.span`
  display: inline-block;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  width: 250px;
  font: 400 16px 'Roboto', sans-serif;
  text-align: center;
  cursor: ${props => (props.source === 'visibeonupgrade' ? 'pointer' : 'default')};
`;

styles.ViewPlan = styled.span`
  display: ${props => (props.premiumCarousel ? 'none' : 'inline-block')};
  color: #b1b3b9;
  text-shadow: 1px 1px 1px #000;
  background: url(/assets/view-plan-arrow-v2.png) no-repeat right center;
  font: 400 12px 'Roboto', sans-serif;
  text-align: center;
  padding: 0 11px 0 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

styles.ViewPlanProfile = styled.span`
  display: ${props => (props.premiumCarousel ? 'none' : 'inline-block')};
  color: #b1b3b9;
  text-shadow: 1px 1px 1px #000;
  background: url(/assets/view-plan-arrow-v2.png) no-repeat right center;
  font: 400 12px 'Roboto', sans-serif;
  text-align: center;
  padding: 0 11px 0 0;
  margin: 7px 0 0 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

styles.VisibleOnAcceptText = styled.span`
  display: block;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  width: ${props => (props.type === 'grid' ? '220px' : '142px')};
  font-size: ${props => (props.type === 'profile' ? '18px' : '14px')};
  text-align: center;
  margin-top: ${props => (props.type === 'profile' ? '15px' : '0')};
`;

styles.RequestPhotoText = styled.div`
  text-align: center;
  width: ${props => (props.type === 'grid' ? (props.isRequestSent ? '220px' : '131px') : props.type === 'profile' ? 'auto' : '99px')};
  padding: ${props => (props.type === 'profile' ? '7px 10px' : '5px')};
  background: ${props => (props.isRequestSent ? 'transparent' : '#F2623F')};
  text-shadow: ${props => (props.isRequestSent ? '1px 1px 1px #000' : 'none')};
  color: ${props => (props.isRequestSent ? '#fff' : '#FCDBD3')};
  font-size: ${props => (props.type === 'profile' ? '16px' : props.isRequestSent ? '14px' : '13px')};
  white-space: ${props => (props.type === 'profile' ? 'nowrap' : '')};
  margin-top: 5px;
  border-radius: 3px;
`;

styles.Empty = styled.div`
  display: 'block';
  position: absolute;
  top: 33%;
  left: 50%;
  width: 1px;
  height: 1px;
`;

styles.WatermarkIcon = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: ${props => (props.type === 'profile' ? '12px' : '6px')};
  right: ${props => (props.type === 'profile' ? '12px' : ' 6px')};
  width: ${props => (props.type === 'profile' ? '22px' : '16px')};
  height: ${props => (props.type === 'profile' ? '22px' : '16px')};
  background: url(/assets/tooltip-icn.png) no-repeat left ${props => (props.type === 'profile' ? '-16px' : 'top')};
  cursor: pointer;
`;

styles.Img = styled.div`
  background: ${props => `url(${props.src})`} center top / cover no-repeat;
  width: ${props =>
    props.type === 'grid' ? (props.status === 'noPhoto' ? 'auto' : '220px') : props.type === 'profile' ? '300px' : '200px'};
  height: ${props =>
    props.type === 'grid' ? (props.status === 'noPhoto' ? '310px' : '273px') : props.type === 'profile' ? '400px' : 'auto'};
  cursor: ${props => (props.isClickable ? 'pointer' : '')};
  border-radius: ${props => (['profile'].includes(props.type) ? '3px' : props.showSpotLight ? '0 0 0 3px' : '3px 0 0 3px')};
`;

styles.FullPhotoLink = styled.button`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  text-align: center;
  background: transparent;
  margin: 8px auto 0;
  font: 12px arial;
  color: #00bcd5;
  cursor: pointer;
  outline: 0;
  border: 0;
  padding: 0;
  text-decoration: none;
  z-index: 5;
  &:hover {
    text-decoration: underline;
  }
`;

styles.SlideNav = styled.nav`
  display: ${props => (props.isVisible ? 'flex' : 'none !important')};
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  bottom: ${props => (props.type === 'profile' ? '10px' : '12px')};
  min-width: 82px;
  height: 20px;
  padding: 0 6px;
  color: #fff;
  font: 300 14px/20px 'Roboto', sans-serif;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  transform: translateX(-50%);
  z-index: 1;
`;

styles.SlideGridNav = styled.nav`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

styles.SlideCount = styled.div`
  display: 'inline-block';
  flex: 1 1 auto;
`;

styles.SlideGridNavIcon = styled.button`
  background: url(/assets/photo-wiget.png) no-repeat left top;
  cursor: pointer;
  transition: background-color 300ms ease-out 0s;
  position: absolute;
  top: 96px;
  left: ${props => (props.icon === 'prev' ? 0 : 'auto')};
  right: ${props => (props.icon === 'prev' ? 'auto' : 0)};
  z-index: 10;
  height: 28px;
  width: 28px;
  border: 0;
  outline: 0;
  background-position: ${props => (props.icon === 'prev' ? 'left top' : 'left -56px')};
  transition: background-image 1s ease-in-out;
`;

styles.SlideNavIcon = styled.button`
  display: inline-block;
  width: 8px;
  height: 12px;
  background: ${props => (props.icon === 'prev' ? 'url(/assets/pro-prev-icon.png)' : 'url(/assets/pro-next-icon.png)')} left top no-repeat;
  cursor: pointer;
  outline: 0;
  padding: 0;
  border: 0;
`;

styles.UploadPhoto = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: ${props => (props.type === 'list' ? '200px' : 'auto')};
  text-align: center;
  padding: ${props => (props.type === 'list' ? ' 90px 0 0' : ' 88px 0 0')};
  background: ${props =>
    props.type === 'list'
      ? 'url(/assets/peeling_profile.png) left top/200px auto no-repeat'
      : 'url(/assets/peeling-profile-page.png) no-repeat right top'};
  font: ${props => (props.type === 'list' ? 'normal 12px/16px arial' : 'normal 14px/18px arial')};
  color: #72727d;
`;
styles.UnhideText = styled.div`
  color: #72727d;
  font: 700 14px 'Roboto', sans-serif;
  padding: 10px 0;
`;

styles.UploadPrompt = styled.div`
  display: block;
  width: ${props => (props.type === 'grid' ? '116px' : props.type === 'profile' ? 'auto' : '100px')};
  margin: 0 auto;
  font: 400 12px/16px 'Roboto', sans-serif;
`;

styles.NoPhotoLink = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: ${props => (props.isOverlay ? '0' : props.hasMore ? '0' : '4')};
  outline: 0;
  border: 0;
  padding: 0;
`;

styles.UploadBtn = styled(Link)`
  display: inline-block;
  background: #73acd1;
  border: 1px solid #618da9;
  border-radius: 3px;
  cursor: pointer;
  font: bold 12px/19px arial;
  margin: 0;
  text-align: center;
  padding: 2px 10px;
  color: #fff;
  text-decoration: none;
  outline: 0;
  margin-top: ${props => (props.type === 'profile' ? '23px' : '7px')};

  &:hover {
    background: #4986af;
    text-decoration: none;
  }
`;
export default styles;
