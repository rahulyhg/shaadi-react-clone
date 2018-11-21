import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.PremiumMessageWrapper = styled.div.attrs({
  'data-test-selector': 'both_party_ab',
})`
  background: #fff;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  ${props => props.isBorderDotted && 'border: 1px dashed #00bcd5;'};
  border-radius: 3px;
  margin: 20px 0;
  padding: 16px 22px 13px;
  width: 608px;
  display: flex;
  font: 300 14px 'Roboto', sans-serif;
`;

styles.DisplayInboxIcon = styled.div`
  background: url(/assets/inbox-icon.svg) no-repeat right top;
  width: 30px;
  height: 30px;
  margin: 2px 23px 0 0;
`;
styles.DisplayPremiumMessage = styled.div`
  color: #51505d;
  line-height: 22px;
  width: 550px;
  word-wrap: break-word;
`;

styles.ReadMoreLink = styled.div`
  display: inline-block;
  color: #00bcd5;
  font-weight: 400;
  text-decoration: none;
  background: url(/assets/profile-name-arrow.png) no-repeat right top 10px;
  background-size: 10px 5px;
  width: 77px;
  cursor: pointer;
  padding: 0 4px;
  outline: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.DisplayPremiumMessageWrapper = styled.div`
  color: #51505d;
  line-height: 18px;
  font-weight: 400;
  width: 550px;
  padding: 0;
  word-wrap: break-word;
`;

styles.DisplayProfileName = styled.span`
  color: #51505d;
  line-height: 18px;
  font-weight: 700;
  width: 550px;
  padding: 0 2px 0 0;
  word-wrap: break-word;
`;

styles.DisplayUpgradeLinkWrapper = styled.div`
  padding: 10px 0 0;
`;

styles.GamificationUpgradeLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.GamificationFacebookLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  font-weight: 500;
  text-decoration: none;
  background: url(/assets/aadhaar-verified-view-icon.png) no-repeat right top 3px;
  cursor: pointer;
  width: 150px;
  outline: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.MaskedMessageText = styled.span`
  color: #e53a41;
`;

export default styles;
