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

styles.OverlayDiv = styled.div`
  height: 50%;
  width: 100%;
  position: absolute;
  top: 50px;
  left: 0;
`;

styles.UpgradeBannerDiv = styled.div`
  border-radius: 0 3px 3px 0;
  width: 960px;;
  justify-content: center;
  margin: ${props => (props.isChatOpen ? `0 auto 0 ${(props.windowWidth - 1207) / 2}px` : '0 auto')};
  padding: 18% 0 0;
}
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
  padding: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '107px 20px 20px 0' : '160px 10px 20px 15px')};
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
  width: 674px;
`;

styles.BackToTopLink = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  margin-bottom: 5px;
  color: #00bcd5;
  padding-right: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '40px' : '15px')};
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
  width: ${props => (props.isHidden ? '990px' : '674px')};
  margin-top: -3px;
  display: flex;
  justify-content: flex-end;
`;

styles.DisplayRequestData = styled.div`
  color: #72727d;
  padding: 18px 0;
  margin: 28px 0 30px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  background: #e3f8fb;
  font: 300 16px 'Roboto', sans-serif;
  text-align: center;
  border-radius: 3px;
`;

styles.DisplayRequesLink = styled.span`
  display: inline-block;
  color: #00bcd5;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;
styles.MyPremiumMatches = styled.div`
  font: 400 16px 'Roboto', sans-serif;
  color: #51505d;
  padding: 70px 0 0 15px;
`;
export default styles;
