import styled from 'styled-components';
import Link from '../../components/Common/Link';

const styles = {};

styles.ProfilePage = styled.div`
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '990px' : '960px')};
  border: 0;
  margin: ${props => (props.isChatOpen ? `0 auto 0 ${(props.windowWidth - 1207) / 2}px` : '0 auto')};
  padding-top: ${props => `${props.topSpace}px`};
  padding-bottom: 20px;
  font: 12px arial;
  color: #72727d;
  align-items: flex-start;
  min-height: 500px;
`;

styles.Flash = styled.div`
  font: normal 20px arial;
  color: #dc5858;
  text-align: center;
  padding: 68px 0 0;
  min-height: 150px;
`;

styles.FlashSmall = styled.div`
  color: #72727d;
  font-size: 12px;
  padding: 3px;
`;

styles.TermsLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.SearchLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.Content = styled.div`
  display: flex;
  align-items: flex-start;
`;

styles.LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '316px' : '267px')};
  padding: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '87px 20px 20px 0' : '195px 10px 20px 15px')};
`;

styles.RightSection = styled.div`
  flex: 1;
`;

styles.ProfileToast = styled.p`
  text-align: center;
  font-size: 14px;
  color: #72727d;
  line-height: 40px;
  a:first-child {
    background: url(/assets/back-arrow.png) no-repeat left center;
    padding: 0 0 0 20px;
  }
`;

styles.LoadingWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 10px;
  width: 100%;
  z-index: 9999;
  opacity: 0.9;
`;

styles.ColorBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 0.6;
`;

styles.LoadingIndicator = styled.div`
  position: relative;
  top: 250px;
  left: 50%;
  margin-left: -250px;
  width: 252px;
  z-index: 1;
  border: 2px solid #ccccce;
  font: bold 18px arial;
  color: #444;
  text-align: center;
  border-radius: 10px;
  min-width: 222px;
  padding: 0 15px;
  background: #f6f6f6;
`;

styles.LoadingIcon = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  margin: 12px 3px 12px 8px;
  vertical-align: middle;
  background-image: url(/assets/loader-big.gif);
`;

styles.LoadingText = styled.span`
  display: inline-block;
  vertical-align: middle;
  color: #72727d;
  font: normal 18px/52px arial;
`;

styles.ProfileQueueWrap = styled.div`
  text-align: right;
`;

styles.BackToTopLink = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  margin-bottom: 5px;
  color: #00bcd5;
  padding-right: 15px;
  text-align: right;

  &:after {
    content: '';
    display: inline-block;
    width: 7px;
    height: 10px;
    background: url(/assets/back-to-top-v2.gif) no-repeat left top;
    margin: 2px 0 0 5px;
  }
`;

styles.ProfileQueueContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

styles.DrHolder = styled.div`
  height: 60px;
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'border-bottom: 1px solid #dfe0e3'};
  position: relative;
  margin-top: 14px;
`;

styles.DrTextWrap = styled.div`
  height: 60px;
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'float: left'};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'width: 575px'};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'margin: 0px 0px 0px 10px'};
`;

styles.DrIcon = styled.div`
  background-position: left -600px;
  height: 57px;
  width: 87px;
  margin: 3px 20px 0 10px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  float: left;
`;

styles.DrText = styled.div`
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'float: left'};
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 20px 'Roboto', sans-serif" : 'normal 24px arial')};
  color: #72727d;
  padding: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '10px 0 9px 0' : '15px 0px 0px 0px')};
  margin: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '0' : '9px 0px 0px 0px')};
  position: relative;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'text-align: center'};
`;

styles.DrQuoteLeft = styled.span`
  background-position: -104px -3px;
  width: 16px;
  height: 15px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  float: left;
  margin: 15px 4px 0px 0px;
`;

styles.DrQuoteRight = styled.span`
  background-position: left -69px;
  width: 20px;
  height: 15px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  float: left;
  margin: -28px 0px 0px 0px;
  position: absolute;
  bottom: 18px;
  right: -22px;
`;

styles.ProfileNameTimeLeftWrapper = styled.div`
  margin: 0 0 0 316px;
  display: flex;
`;

styles.ProfileNameTimeLeftSection = styled.div`
  width: 385px;
  margin: 10px 0 0 20px;
`;

styles.LikedProfile = styled.div`
  text-align: center;
  padding: 20px;
`;

styles.DefaultProfileImgLink = styled(Link)`
  padding: 2px;
  border: 1px solid #ddd;
  position: relative;
  cursor: pointer;
  display: inline-block;
  border-radius: 50%;
`;

styles.LikedText = styled.span`
  font-size: 26px;
  color: #72727d;
  display: inline-block;
  padding: 15px 10px;
  vertical-align: top;
`;

styles.DrAcceptedYes = styled.span`
  background-position: left -234px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  width: 14px;
  height: 14px;
  overflow: hidden;
  position: absolute;
  right: 1px;
  bottom: 1px;
`;

styles.DefaultProfileLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 203px;
  vertical-align: top;
  padding: 0 5px 0 0;
`;

styles.dayilyRecommendationWrapper = styled.div`
  margin: 27px 0 0;
  text-align: center;
`;

styles.thankyouwrapper = styled.div`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  padding: 0 0 20px;
  height: 230px;
`;

styles.thankyouleft = styled.div`
  margin: 38px 17px 0 120px;
  width: 145px;
  float: left;
  background: url(/assets/daily-rec-v4.png) no-repeat left -421px;
  height: 149px;
  display: inline-block;
`;

styles.thankyouright = styled.div`
  float: left;
  width: 567px;
  padding: 0 0 0 7px;
  height: 149px;
  display: inline-block;
`;
styles.thankyoutitle = styled.p`
  float: left;
  font: normal 28px arial;
  color: #72727d;
  padding: 5px 27px 0 0;
  position: relative;
  white-space: nowrap;
`;
styles.quoteleft = styled.span`
  position: absolute;
  left: -24px;
  top: 0;
  float: none;
  background-position: -104px -3px;
  width: 16px;
  height: 15px;
  margin: 10px 4px 0 0;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  color: #72727d;
`;
styles.quoteright = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  float: none;
  background-position: left -69px;
  width: 20px;
  height: 15px;
  margin: 10px 0 0 4px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
`;

styles.listingwrapper = styled.span`
  height: 66px;
  width: 419px;
  padding: 0 0 0 72px;
  overflow: hidden;
  display: block;
`;

styles.thumbwrapper = styled(Link)`
  margin: 0 12px 0 0;
  border: 1px solid #dfe0e3;
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  border-radius: 50%;
  box-shadow: none !important;
  background: #fff !important;
  outline: 0;
  vertical-align: middle;

  & > img {
    border-radius: 50%;
    display: block;
  }
`;

styles.actionwrapper = styled.span`
    background-image: url(/assets/daily-rec-v4.png);
    background-repeat: no-repeat;
    width: 14px;
    height: 14px;
    overflow: hidden;
    position: absolute;
    right: 1px;
    bottom: 1px;
    background-position: ${props =>
      props.action !== 'no' ? (props.action === 'maybe' ? '-28px -234px' : 'left -234px;') : '-14px -234px'};
}
`;

styles.plussign = styled.span`
  height: 46px;
  font-size: 28px;
  color: #72727d;
  display: inline-block;
  padding: 14px 12px 0 0;
`;

styles.nomoretextwrapper = styled.div`
  background: #fffbe6;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  padding: 5px;
  color: #72727d;
  font-size: 18px;
  line-height: 19px;
  & > span {
    font-size: 28px;
  }
`;

styles.backtolink = styled.p`
  font: normal 14px arial;
  text-align: center;
  margin: 23px 0 0;

  & > a {
    color: #00bcd5 !important;
  }
`;

styles.thankyouBotMsg = styled.div`
  text-align: center;
  padding: 0 !important;
  margin: 23px 0 0;
  font: normal 16px/24px arial;
  color: #72727d;

  & > p > a {
    color: #00bcd5 !important;
  }
`;

styles.movinginmsg = styled.span`
  font-style: italic;
  color: #b1b3b9;
`;

styles.likeprofilewrapper = styled.div`
  text-align: center;
  padding: 20px;
  margin: 0;
`;

styles.likeprofiletext = styled.span`
  font-size: 26px;
  color: #72727d;
  display: inline-block;
  padding: 15px 10px;
  vertical-align: top;
  & > a {
    display: inline-block;
    color: #00bcd5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 203px;
    vertical-align: top;
    padding: 0 5px 0 0;
    text-decoration: none;
  }
`;
export default styles;
