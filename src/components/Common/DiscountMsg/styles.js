import styled from 'styled-components';

const styles = {};

styles.premiumGreen = styled.span`
  color: #89c965;
  font-weight: 400;
`;

styles.SavePremiumTxt = styled.div`
  font: 300 16px 'Roboto', sans-serif;
  > span {
    color: #89c965;
    font: normal 20px 'Roboto', sans-serif;
  }
`;

styles.premiumBannerSave = styled.div`
  ${props => props.showBorder && ` border-top: 1px solid #f1f1f2`};
  padding: 12px 0 0;
`;

export default styles;
