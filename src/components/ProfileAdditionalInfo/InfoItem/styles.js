/* eslint max-len: 0 */
import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.InfoItem = styled.div`
  position: relative;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  z-index: ${props => (props.isGamified ? 1 : 0)};

  &:first-child h4 {
    margin-top: 13px;
  }
`;

styles.Heading = styled.h4`
  display: flex;
  align-items: center;
  margin: 0;
`;

styles.ReadMoreBtn = styled.button`
  background: url(/assets/rgrey-arrow.png) no-repeat right 6px;
  cursor: pointer;
  padding: 0 8px 0 0;
  line-height: 22px;
  color: #00bcd5;
  border: 0;
  outline: 0;
  text-align: center;
  font-size: 13px;
`;

const spriteV6Icons = {
  edu_qualification: 'left -115px',
  profession: '3px -55px',
  income: 'left -142px',
  known_language: '3px -162px',
  profile_religion: '3px -34px',
  profile_living_in: '5px -97px',
  profile_gotra: '3px -818px',
  residence: '5px -97px',
  born_details: 'left -1002px',
  born_brought_up: '3px -77px',
  profile_community: '2px -849px',
  hindu_rel_details: '3px -818px',
  muslim_rel_details: '3px -724px',
  sikh_rel_details: '3px -787px',
  profile_rashi: '2px -880px',
  profile_nakshatra: '2px -914px',
  profile_manglik: '2px -951px',
  profile_info: '2px -1002px',
  compatibility: 'left -1032px',
  horos_compatibility: '1px -1066px',
  default: 'left -155px',

  about: 'left -255px',
  lifestyle: 'left -353px',
  background: 'left -451px',
  astro: 'left -598px',
  family: 'left -549px',
  education: 'left -402px',
  interests: 'left -304px',
  what: 'left -500px',
  defaultHeading: 'left -255px',
  namaz_zhakat: 'left -724px',
  dastar_keshdhari: '3px -787px',
  contact_details: 'left -1137px',
};

styles.Icon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  background: url(https://img2.shaadi.com/assests/2018/profile/pp-icon-sprite-v7.png) no-repeat
    ${props => spriteV6Icons[props.icon] || spriteV6Icons.default};
`;

styles.HeadingIcon = styled.span`
  display: block;
  flex: 0 0 58px;
  height: 47px;
  background: url(https://img2.shaadi.com/assests/2018/profile/pp-icon-sprite-v7.png) no-repeat
    ${props => spriteV6Icons[props.icon] || spriteV6Icons.defaultHeading};
`;

styles.Title = styled.span`
  text-transform: ${props => (['B', 'C'].includes(props.profilePageBucket) ? 'capitalize' : 'uppercase')};
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 18px/49px 'Roboto', sans-serif" : 'bold 16px/47px arial')};
  margin: 0;
  color: #e54955;
`;

styles.Content = styled.div`
  border-left: 2px solid #e1e1e1;
  padding: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '8px 0 16px 34px' : '0 0 16px 34px')};
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 14px/24px 'Roboto', sans-serif" : '14px/20px arial')};
  color: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#51505d' : '#72727d')};
  word-wrap: break-word;
  margin: 5px 0 5px 23px;
  padding-bottom: ${props => (props.isGamified ? '0' : '16px')};
  height: ${props => (props.isGamified ? (props.id === 'family' && props.isFormDisplayed ? '400px' : '200px') : 'auto')};
`;

styles.InfoList = styled.ul`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
`;

styles.IconList = styled.ul`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
`;

styles.InterestIconList = styled.ul`
  position: relative;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  padding: 0;
  margin: 0;
  list-style: none;
  transition: 0.3s ease;
  left: ${props => (props.slideIndex ? '-100%' : 0)};
`;

styles.IconListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  flex-basis: 132px;
`;

styles.InfoListItem = styled.li`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  margin-bottom: 11px;
`;

const spriteV3Icons = {
  drinks: '55px -877px',
  no_drink: '45px -786px',
  smoke: '45px -955px',
  dont_smoke: '45px -1034px',
  body_type: '45px -1135px',
  veg: '45px -509px',
  non_veg: '45px -699px',
  eggetarian: '50px -607px',
  defaultIconList: '55px -877px',

  hobbies: '63px -447px',
  sports: '56px -88px',
  cuisines: '63px -360px',
  music: '66px top',
  movies: '60px -271px',
  books: '56px -179px',
  defaultInterestList: '63px -447px',
};

const spriteV3BorderColor = {
  hobbies: '#fc3',
  sports: '#78d5e3',
  cuisines: '#fdc2c2',
  music: '#b88fd6',
  movies: '#78a2e0',
  books: '#aacd73',
  defaultInterestList: '#fc3',
};

styles.IconListIcon = styled.span`
  display: block;
  width: 130px;
  height: 86px;
  border-radius: 3px;
  border: 1px solid #dfe0e3;
  background: url(/assets/nri-hobbies-sprite-v3.png) no-repeat ${props => spriteV3Icons[props.icon] || spriteV3Icons.defaultIconList};
`;

styles.InterestListIcon = styled.span`
  display: block;
  padding: 10px 0 0;
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '154px' : '164px')};
  height: 48px;
  background: url(/assets/nri-hobbies-sprite-v3.png) no-repeat ${props => spriteV3Icons[props.icon] || spriteV3Icons.defaultInterestList};
  border-bottom: 1px solid ${props => spriteV3BorderColor[props.icon] || spriteV3BorderColor.defaultInterestList};
`;

styles.Desc = styled.span`
  line-height: 20px;
  padding: 0 0 0 5px;
  word-wrap: break-word;
`;

styles.IconDesc = styled.span`
  display: inline-block;
  text-align: center;
  padding: 3px 0 0;
  width: 130px;
`;

styles.InterestListTitle = styled.span`
  display: block;
  color: #333;
  font-size: 14px;
  padding: 9px 0 7px;
  text-transform: uppercase;
`;

styles.InterestListDesc = styled.span`
  display: inline-block;
  width: 160px;
  max-height: 54px;
  overflow: hidden;
  padding: 0 4px;
  word-wrap: break-word;
  line-height: 18px;
  text-align: center;
  font-size: 13px;
`;

styles.PreferenceWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 600px;
`;

styles.PreferenceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

styles.PhotoWrapper = styled.div``;

styles.Photo = styled.span`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-position: center top;
  box-sizing: border-box;
  position: relative;
  border-radius: 80px;
  border: 4px solid #e1e1e1;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
`;

styles.PhotoCaption = styled.div`
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 14px/27px 'Roboto', sans-serif" : '14px arial')};
  color: #72727d;
  margin: 11px 0 0;
  text-align: center;
`;

styles.CountWrapper = styled.div`
  margin: -30px 25px 0 25px;
  width: 308px;
  text-align: center;
  background: url(/assets/matches-point.gif) repeat-x left 17px;

  span {
    display: inline-block;
    height: 34px;
    background: #e7e5e3;
    text-align: center;
    padding: 0 15px;
    border-radius: 25px;
    color: #72727d;
    font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 14px/34px 'Roboto', sans-serif" : '14px/34px arial')};
  }
`;

styles.PreferenceList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

styles.PreferenceListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 6px 0 5px;
  border-bottom: 1px solid #f3f2f1;

  > div {
    flex: 1;
  }
`;

styles.PreferenceListItemInfo = styled.div`
  width: 478px;
  flex: none !important;
`;

styles.Term = styled.div`
  color: #f2a4aa;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 14px/22px 'Roboto', sans-serif" : '14px/20px arial')};
`;

styles.RemarkBox = styled.div`
  display: inline-block;
  text-align: center;
  width: 120px;
  height: 40px;
`;

styles.RemarkIcon = styled.span`
  display: inline-block;
  width: 22px;
  height: 22px;
  background: ${props =>
    props.isMatch
      ? 'url(https://img2.shaadi.com/community/profile/yes-remark.png) no-repeat left top'
      : 'url(https://img2.shaadi.com/community/profile/no-remark.png) no-repeat 5px top'};
  margin-top: ${props => (props.isMatch ? '9px' : '20px')};
`;

styles.PrefDesc = styled.span`
  display: flex;
`;

styles.MoreBtn = styled.button`
  background-color: transparent;
  border: 0;
  background-repeat: no-repeat;
  background-position: right;
  padding: 0;
  padding-right: 10px;
  color: #00bcd5;
  background-image: url('/assets/more.gif');
  outline: 0;
`;

styles.PrefDescText = styled.span`
  flex: 1;
  overflow: hidden;
`;

styles.InterestWrapper = styled.div`
  display: flex;
`;

styles.InterestSlideWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

styles.InterestNavIcon = styled.button`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  width: 10px;
  height: 150px;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  background-repeat: no-repeat;
  outline: 0;
  margin: ${props => (props.direction === 'left' ? !['B', 'C'].includes(props.profilePageBucket) && '0 10px 0 0' : '0 0 0 10px')};
  background-image: ${props =>
    props.direction === 'left' ? 'url(/assets/interest-scroll-larrow.png)' : 'url(/assets/interest-scroll-rarrow.png)'};
  background-position: ${props => (props.direction === 'left' ? 'left 41px' : 'right 41px')};

  &:disabled {
    cursor: default;
    background-image: ${props =>
      props.direction === 'left' ? 'url(/assets/interest-scroll-fade-larrow.png)' : 'url(/assets/interest-scroll-fade-rarrow.png)'};
  }
`;

styles.HorosTextLink = styled.span`
  color: #00bcd5;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  cursor: pointer;
  text-decoration: none;
  outline: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.AstroLoaderWrap = styled.div`
  border: 1px solid #f6f5e6;
  background: #fdfdf4;
  padding: 9px 26px;
  width: 525px;
  display: flex;
`;
styles.FirstCircleWrap = styled.span`
  width: 55px;
  height: 55px;
  margin: 0 17px 0 0;
`;
styles.FirstCircle = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
`;
styles.FirstCircleCounter = styled.div`
  position: absolute;
  top: 20px;
  width: 55px;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 14px 'Roboto', sans-serif" : 'bold 14px arial')};
  text-align: center;
  z-index: 2;
  color: #666;
`;
styles.FirstCircleBg = styled.div`
  background: #dbf7fb;
  width: 55px;
  height: 55px;
  position: absolute;
  border-radius: 50%;
`;
styles.FirstCircleClipWrap = styled.div`
  clip: rect${props => (props.astroLoaderClip === 'auto' ? '(auto,auto,auto,auto)' : '(0,55px,55px,28px)')};
  position: absolute;
  width: 55px;
  height: 55px;
`;
styles.FirstCircleAnimation = styled.div`
  transform: ${props => (props.astroLoaderDegree ? `rotate(${props.astroLoaderDegree}deg)` : 'none')};
  border: 4px solid #00bcd5;
  position: absolute;
  width: 47px;
  height: 47px;
  clip: rect(0, 28px, 55px, 0);
  border-radius: 50%;
`;
styles.FirstCircleAnimation2 = styled.div`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  transform: rotate(180deg);
  border: 4px solid #00bcd5;
  position: absolute;
  width: 47px;
  height: 47px;
  clip: rect(0, 28px, 55px, 0);
  border-radius: 50%;
`;
styles.FirstCircleBg2 = styled.div`
  background: #fff;
  width: 47px;
  height: 47px;
  position: absolute;
  border-radius: 50%;
  left: 4px;
  top: 4px;
  z-index: 1;
`;
styles.HorosLoader = styled.span`
  width: 55px;
  height: 55px;
  margin: 0 17px 0 0;
  display: inline-block;
  vertical-align: middle;
`;
styles.CircularLoader = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
`;
styles.CircularPercent = styled.div`
  position: absolute;
  top: 20px;
  width: 55px;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "700 14px/17px 'Roboto', sans-serif" : 'bold 14px arial')};
  text-align: center;
  z-index: 2;
  color: #666;
`;
styles.CircularLoaderTrack = styled.div`
  background: #dbf7fb;
  width: 55px;
  height: 55px;
  position: absolute;
  border-radius: 50%;
`;
styles.CircularLoaderTrack = styled.div`
  background: #dbf7fb;
  width: 55px;
  height: 55px;
  position: absolute;
  border-radius: 50%;
`;
styles.CircularLoaderTrackFill = styled.div`
  background: #fff;
  width: 47px;
  height: 47px;
  position: absolute;
  border-radius: 50%;
  left: 4px;
  top: 4px;
  z-index: 1;
`;
styles.HorosCopyWrap = styled.div`
  color: #333;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 14px/18px 'Roboto', sans-serif" : '14px/18px arial')};
  width: 440px;
`;
styles.HorosTitle = styled.span`
  font-weight: bold;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && "font: 700 'Roboto', sans-serif"};
`;
styles.HorosText = styled.div`
  color: #72727d;
`;

styles.ProfileCreatedWapper = styled.div`
  top: 48px;
  left: 57px;
  position: absolute;
  font: 300 11px/22px 'Roboto', sans-serif;
  color: #95959d;
`;

styles.LockSmall = styled.span`
  display: inline-block;
  width: 11px;
  height: 13px;
  background: url(https://img2.shaadi.com/assests/2018/profile/pp-icon-sprite-v7.png) no-repeat left -1304px;
  margin: 0 0 0 3px;
`;
styles.UpgradeLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
