import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.footerMainWrap = styled.div`
  background: #fff;
  margin: 20px 0 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

styles.footerInnerWrap = styled.div`
  width: 909px;
  margin: 0 auto;
  text-align: center;
  padding: 57px 0 44px;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: 98%;
    padding: 57px 1% 44px;
  }
`;

styles.footerInnerHead = styled.div`
  text-align: center;
  font: 300 24px 'Roboto', sans-serif;
  &:after {
    content: '';
    background: #ff595f;
    width: 100px;
    height: 2px;
    display: block;
    margin: 26px auto 30px;
  }
`;

styles.ratedSiteMainWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
styles.ratedSiteIconWrap = styled.div`
  flex: 1;
  font: 500 14px/20px 'Roboto', sans-serif;
  color: #51505d;
  span {
    font: 300 14px/20px 'Roboto', sans-serif;
    color: #72727d;
    display: block;
  }
`;

styles.ratedSiteIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #cae59c;
  border-radius: 50%;
  margin: 0 auto 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    display: block;
    width: 29px;
    content: ' ';
    background: url(/assets/reg-rated-icon.svg) no-repeat top left;
    height: 34px;
    margin: 3px 0 0;
  }
`;

styles.successIcon = styles.ratedSiteIcon.extend`
  background:#89d7cf;
  &:after {
    display: block;
    width: 40px;
    height: 33px;    
    content: " ";
    background: url(/assets/reg-history-icon.svg) no-repeat top left;
    margin: 0 0 0 5px;
  }
`;

styles.privacyIcon = styles.ratedSiteIcon.extend`
  background:#f8a07c;
  &:after {
    display: block;
    width: 22px;
    height: 26px;    
    content: " ";
    background: url(/assets/reg-privacy-icon.svg) no-repeat top left;
    margin: -2px 0 0
  }
`;

styles.secureIcon = styles.ratedSiteIcon.extend`
  background:#f3bf55;
  &:after {
    display: block;
    width: 24px;
    height: 18px;    
    content: " ";
    background: url(/assets/reg-secure-icon.svg) no-repeat top left;
  }
`;

styles.IconLink = styled(Link)`
  display: inline-block;
  width: 18px;
  height: 19px;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 0;
  border-right: 0;
  background-image: url(/assets/shaadi-sprite-2-v10.png);
  background-repeat: no-repeat;
  background-position: left ${props => ({ android: '-904px', apple: '-884px' }[props.icon])};
`;

export default styles;
