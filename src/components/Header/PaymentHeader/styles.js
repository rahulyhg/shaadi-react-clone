import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.PaymentHeader = styled.div`
  background: #fff;
  width: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
  border-bottom: 1px solid #dfe0e3;
  transition: all 300ms ease;
  will-change: ${props => (props.scrollVal ? 'top' : '')};
  box-shadow: ${props => (props.scrollVal ? '0 1px 6px rgba(0, 0, 0, 0.3)' : '')};
  display: ${props => (props.paymentPageAB === '' && props.isPaymentPage ? 'none' : 'block')};
`;

styles.MainHeader = styled.div`
  background: #fff;
  margin: 0 auto;
  width: ${props => (props.isRevampPage ? '1200px' : props.isProfilePage ? '990px' : '940px')};
  display: flex;
  height: ${props => (props.isRevampPage ? '55px' : '50px')};
`;

styles.LogoWrapper = styled.div`
  ${props => (!props.isProfilePage ? 'flex: 1;' : '')}
  ${props => (!props.isProfilePage ? 'align-self: center;' : '')}
  width: ${props => (!props.isProfilePage ? '500px' : '990px')};
  ${props => (!props.isProfilePage ? 'align-self: center;' : '')}
  ${props => (props.isProfilePage ? 'display: flex;' : '')}
  ${props => (props.isProfilePage ? 'padding: 10px 0;' : '')}
`;

styles.HelpDropdown = styled.div`
  background: #fbfbfb;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(43, 59, 93, 0.35);
  font: 400 14px 'Roboto', sans-serif;
  position: absolute;
  right: 0;
  top: 33px;
  width: 118px;
  z-index: 998;
  padding: 8px;
  margin: 0;
`;
styles.HelpDropLists = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
styles.HelpDropList = styled(Link)`
  text-decoration: none;
  outline: none;
  padding: 5px;
  font: 300 12px 'Roboto', sans-serif;
  &:hover {
    background: #f1f1f2;
  }
`;
styles.HelpDeskLink = styled.div`
  margin: 3px 0;
  color: #00bcd5;
`;
styles.LogoLink = styled(Link)``;

styles.PersonalisedButton = styled.div`
  background: url(https://img2.shaadi.com/assests/2018/payment/personalised-normal.png) no-repeat left top;
  width: 180px;
  height: 44px;
  margin: 7px 0px 0 0;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background: url(https://img2.shaadi.com/assests/2018/payment/personalised-hover.png) no-repeat left top;
  }
`;
styles.PremiumText = styled.div`
  color: #72727d;
  font-size: 13px;
  font-weight: 300;
  line-height: 17px;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-block;
  margin: 0 0 0 5px;
`;
styles.SpacerTen = styled.div`
  padding: 10px;
`;

styles.BackToMatches = styled.div`
  text-decoration: none;
  outline: none;
  padding: 6px 0 0;
  font: 400 16px/20px 'Roboto', sans-serif;
  color: #00bcd5;
  flex: 1;
`;
styles.MatchesLink = styled(Link)`
  text-decoration: none;
  outline: none;
  color: #00bcd5;
  cursor: pointer;
`;

styles.BackArrow = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 1px 4px 0 0;
  background: url(https://img2.shaadi.com/assests/2018/payment/back-arrow.png) no-repeat left top;
  vertical-align: top;
`;

export default styles;
