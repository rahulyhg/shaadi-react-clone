import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.UpgradeBanner = styled.div`
  position: relative;
  border: solid 2px #dfe0e3;
  padding-top: 16px;
  text-align: center;
  background: #fff;
  width: ${props => (props.type === 'list' ? 730 : 700)}px;
  margin: ${props => (props.type === 'list' ? '8px 0 8px 8px' : '10px 0 10px 8px')};
`;

styles.Header = styled.div``;

styles.Title = styled.h4`
  font-size: 20px;
  margin: 0;
  color: #72727d;
  font-weight: normal;
`;

styles.CloseBtn = styled.button`
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: 20px;
  height: 15px;
  width: 15px;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent url(/assets/big-close-v2.png) no-repeat left -207px;

  &:hover {
    background-position: left -231px;
  }
`;

styles.Benefits = styled.div`
  margin: 28px 0 19px;
`;

styles.Benfit = styled.div`
  display: inline-block;
  padding: ${props =>
    props.name === 'email'
      ? '0 34px 0 60px'
      : props.name === 'chat' ? '0 40px 0 41px' : props.name === 'mobile' ? '0 36px 0 37px' : '80px'};
  background: ${props =>
    props.name === 'email'
      ? ''
      : props.name === 'chat'
        ? 'url(/assets/search-bann-border.gif) no-repeat left center'
        : props.name === 'mobile' ? 'url(/assets/search-bann-border.gif) no-repeat left center' : ''};
`;

styles.Icon = styled.div`
  height: ${props => (props.name === 'email' ? '32px' : props.name === 'chat' ? '42px' : props.name === 'mobile' ? '39px' : '32px')};
  width: ${props => (props.name === 'email' ? '80px' : props.name === 'chat' ? '42px' : props.name === 'mobile' ? '80px' : '80px')};
  margin-bottom: 17px;
  background-image: url(/assets/search-bann-sprite.png);
  background-repeat: no-repeat;
  background-position: ${props =>
    props.name === 'email' ? '20px top' : props.name === 'chat' ? 'left -38px' : props.name === 'mobile' ? '40px -87px' : '20px top'};
`;

styles.Desc = styled.div`
  font-size: 16px;
  color: #72727d;
`;

styles.UpgradeLink = styled(Link)`
  display: block;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 18px auto 0;
  width: 140px;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;

styles.OtherBenefitsTitle = styled.div`
  font-size: 16px;
  color: #72727d;
  line-height: 24px;
  margin: 12px 0 0;
`;

styles.OtherBenefit = styled.div`
  font-size: 14px;
  color: #72727d;
  line-height: 18px;
  padding: 0 0 12px;
`;

export default styles;
