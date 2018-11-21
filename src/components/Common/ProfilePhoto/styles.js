import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.ProfilePhoto = styled.div`
  flex: 0 0 ${props => ({ grid: '100%', profile: 'auto', list: '150px' }[props.type])};
  height: ${props => (props.type === 'grid' ? (props.premiumCarousel === true ? '248px' : '220px') : 'auto')};
  margin-right: ${props => (props.type === 'grid' ? 0 : '11px')};
  position: relative;
  ${props => (props.isOverlay ? 'z-index: 0' : '')};
  &:hover nav {
    display: ${props => (props.isNavVisible && props.type === 'grid' ? 'inline-block' : props.type !== 'grid' ? 'flex' : 'none')};
  }
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
  padding: ${props => ({ grid: 0, profile: '7px 7px 7px 5px', list: '3px' }[props.type])};
  height: ${props => (props.premiumCarousel === true ? '248px' : { grid: '220px', profile: '340px', list: '190px' }[props.type])};
  background: #fff;
  border: solid ${props => (props.type === 'grid' ? '0' : '1px')}
    ${props =>
      (props.plan === 'PremiumPlus' && props.tag !== 'vip') ||
      (props.plan === 'Premium' && (props.experiment === 'A' || props.experiment === 'C'))
        ? '#ff5a60'
        : props.plan === 'Select' ? '#d3bcff' : props.tag === 'vip' ? '#ad2241' : '#dfe0e3'};

  box-shadow: 0 1px 1px 1px rgba(187, 187, 187, 0.5);
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
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

styles.Img = styled.img`
  width: ${props =>
    props.premiumCarousel === true ? '200px' : props.type === 'grid' ? (props.status === 'noPhoto' ? 'auto' : '220px') : '100%'};
  margin-right: ${props => (props.type === 'grid' ? 0 : '3px')};
  height: ${props =>
    props.premiumCarousel === true
      ? '248px'
      : props.type === 'grid' ? (props.status === 'noPhoto' ? '310px' : '273px') : props.type === 'profile' ? '310px' : 'inherit'};
  border: ${props => (props.type === 'profile' ? 'solid 1px #d9d9d9' : '')};
  cursor: ${props => (props.isClickable ? 'pointer' : '')};
`;

styles.CarouselImg = styled.div`
  background: ${props => `url(${props.src})`} center top / cover no-repeat;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-size: 100%;
  position: absolute;
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
  bottom: ${props => (props.type === 'profile' ? '45px' : '12px')};
  min-width: 82px;
  height: 20px;
  padding: 0 6px;
  color: #fff;
  font: 12px/20px arial;
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
  background: url(/assets/carousel-inner-arrow.png) no-repeat left top;
  cursor: pointer;
  transition: background-color 300ms ease-out 0s;
  position: absolute;
  ${props => (props.premiumCarousel ? 'top: 113px;' : 'top: 96px;')};
  left: ${props => (props.icon === 'prev' ? 0 : 'auto')};
  right: ${props => (props.icon === 'prev' ? 'auto' : 0)};
  ${props => (props.isOverlay ? 'z-index: -10' : 'z-index:10')};
  height: 22px;
  width: 22px;
  outline: 0;
  background-position: ${props => (props.icon === 'prev' ? 'left top' : 'left -44px')};
  transition: background-image 1s ease-in-out;
  &:hover {
    background: ${props =>
      props.icon === 'prev'
        ? 'url(/assets/carousel-inner-arrow.png) no-repeat left -22px;'
        : 'url(/assets/carousel-inner-arrow.png) no-repeat left -66px;'};
  }
`;

styles.SlideNavIcon = styled.button`
  display: inline-block;
  width: 9px;
  height: 14px;
  background: url(/assets/profile-revamp-sprite-ver4.png) no-repeat ${props => (props.icon === 'prev' ? '-25px' : '-35px')} -70px;
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
  margin: ${props => (props.type === 'list' ? '3px 3px' : props.type === 'grid' ? '0' : '8px 6px')};
  text-align: center;
  padding: ${props => (props.type === 'list' ? ' 55px 0 0' : ' 88px 0 0')};
  background: ${props =>
    props.type === 'list' ? 'url(/assets/peeling-large.png) no-repeat left top' : 'url(/assets/peeling_profile.png) no-repeat right top'};
  font: ${props => (props.type === 'list' ? 'normal 12px/16px arial' : 'normal 14px/18px arial')};
  color: #72727d;
`;

styles.UploadPrompt = styled.div`
  display: block;
  width: ${props => (props.type === 'grid' ? '116px' : props.type === 'profile' ? 'auto' : '100px')};
  margin: 0 auto;
  font: normal 12px/16px arial;
`;

styles.NoPhotoLink = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: ${props => (props.isOverlay ? '-10' : props.hasMore ? '0' : '4')};
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
