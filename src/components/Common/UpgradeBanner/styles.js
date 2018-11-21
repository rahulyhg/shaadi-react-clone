import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.bannerWrapper = styled.div`
  text-align: center;
  padding: 15px 0 10px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  margin: 0 0 15px;
`;

styles.bannerHead = styled.div`
  color: #b1b3b9;
  font-size: 20px;
  margin: 6px 0 0;
`;

styles.searchContact = styled.div`
  margin: 28px 0 19px;
`;

styles.searchmail = styled.div`
  font-size: 16px;
  padding: 10px 20px;
  margin: 18px 0 0;
  display: inline-block;
  text-decoration: none;
`;

styles.searchimage = styled.div`
  height: 49px;
`;
styles.srchmailicon = styled.div`
  background-position: 20px top;
  height: 32px;
  width: 80px;
  background-image: url(https://img2.shaadi.com/community/images/search-bann-sprite.png);
  background-repeat: no-repeat;
`;
styles.searchtxt = styled.p`
  font-size: 16px;
  color: #72727d;
`;
styles.searchmid = styled.div`
  display: inline-block;
  padding: 0 40px 0 41px;
  background: url(https://img2.shaadi.com/community/images/search-bann-border.gif) no-repeat left center;
`;
styles.srchchaticon = styled.div`
  background-position: left -38px;
  height: 42px;
  width: 42px;
  background-image: url(https://img2.shaadi.com/community/images/search-bann-sprite.png);
  background-repeat: no-repeat;
`;
styles.searchcal = styled.div`
  display: inline-block;
  padding: 0 36px 0 37px;
  background: url(https://img2.shaadi.com/community/images/search-bann-border.gif) no-repeat left center;
`;
styles.srchphnicon = styled.div`
  background-position: 40px -87px;
  height: 39px;
  width: 80px;
  background-image: url(https://img2.shaadi.com/community/images/search-bann-sprite.png);
  background-repeat: no-repeat;
`;

styles.srch_upgradebtn = styled(Link)`
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0;
  display: inline-block;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  text-decoration: none;

  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;
styles.srch_benefithead = styled.div`
  font-size: 16px;
  color: #72727d;
  line-height: 24px;
  margin: 12px 0 0;
`;
styles.srch_benefitlist = styled.div`
  font-size: 14px;
  color: #72727d;
  line-height: 18px;
  padding: 0 0 12px;
`;

styles.IconLockOnOverlay = styled.div`
  width: 44px;
  height: 44px;
  background: url(/assets/lock-icon-free-user-black.svg) no-repeat;
  background-size: 44px 44px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

styles.NewMatchesUpgradeText = styled.div`
  width: ${props => (props.type === 'grid' ? '200px' : 'auto')};
  color: #fff;
  padding: 10px 0 0;
  font: 400 ${props => (props.type === 'grid' ? '14px/17px' : props.type === 'profile' ? '20px' : '16px/40px')} 'Roboto', sans-serif;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  text-align: center;
`;

styles.ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

styles.UpgradeNowBtn = styled(Link)`
  padding: 9px 37px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  background: #00bcd5;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  font: 400 16px 'Roboto', sans-serif;
  margin: ${props => (props.type === 'grid' || props.type === 'profile' ? '16px' : '6px')} 0 0;
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  text-decoration: none;
  &:hover {
    background: #0194a8;
  }
`;

styles.UpgradeBannerWapper = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
`;

export default styles;
