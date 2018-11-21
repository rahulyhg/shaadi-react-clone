import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.Footer = styled.div`
  margin: 0;
  padding: 0 0 0 295px !important;
  height: 38px;
  background: ${props => (props.membershipLevel === 'Select' ? '#f4eeff' : '#f1f1f2')};
  border: 1px solid #dfe0e3;
  clear: both;
  border-top: 0;
`;

styles.FooterBtn = styled.button`
  display: inline-block;
  vertical-align: middle;
  outline: none;
  background: transparent;
  padding: 0 10px;
  margin: 5px 5px 5px 0;
  line-height: 26px;
  color: #72727d;
  border: 1px solid #dfe0e3;
  border-radius: 3px;

  &:hover {
    border: 1px solid #d1d1d1;
    box-shadow: 0 0 2px #bdbdbd;
    text-decoration: none;
  }
`;

styles.FooterLink = styled(Link)`
  display: ${props => (props.isHidden ? 'none' : 'inline-block')};
  vertical-align: middle;
  outline: none;
  background: transparent;
  padding: 0 12px;
  margin: 5px 8px 5px 0;
  line-height: 26px;
  color: #72727d;
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  text-decoration: none;

  &:hover {
    border: 1px solid #d1d1d1;
    box-shadow: 0 0 2px #bdbdbd;
    text-decoration: none;
  }
`;

styles.PlanIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 26px;
  height: 26px;
  margin-right: 5px;
  background: url(/assets/profile-revamp-sprite-ver5.png) no-repeat ${props => (props.hasPremiumFeatures ? '-26px -18px' : '-1px -119px')};

  &:hover {
    background-position: ${props => (props.hasPremiumFeatures ? '-26px -18px' : '-1px -184px')};
  }
`;

styles.ContactBalanceIcon = styled.div``;
styles.ConnectInstantly = styled.div`
  width: 151px;
  height: 19px;
  margin: 11px 0 0 4px;
  background: url(/assets/connect-instantly.png) no-repeat 0 0;
  display: inline-block;
  vertical-align: top;
`;

styles.SendEmailIcon = styled.span`
  background: url(/assets/profile-revamp-sprite-ver4.png) no-repeat 0 0;
  width: 59px;
  height: 18px;
  display: inline-block;
  margin: 4px -5px 0 4px;
  vertical-align: top;
  position: relative;
`;

export default styles;
