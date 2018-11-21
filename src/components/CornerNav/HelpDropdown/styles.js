import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.DropdownWrapper = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 28px;
    margin: 14px 0 14px -1px;
    border-right: ${props => (props.isPaymentPage ? 'none' : '1px solid #ff7b80')};
  }
`;

styles.HelpDropdown = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  background: #fff;
  color: #95959d;
  border-radius: 4px;
  box-shadow: ${props =>
    props.isPaymentPage ? 'rgba(0, 0, 0, 0.09) 0px 3px 15px, rgba(0, 0, 0, 0.12) 0px 3px 15px' : '0 8px 12px rgba(43, 59, 93, 0.35)'};
  font-size: 12px;
  position: absolute;
  right: 0;
  top: ${props => (props.isPaymentPage ? '40px' : '56px')};
  width: 374px;
  padding: 0 0 0 19px;
  margin: 0;
  cursor: default;
  line-height: normal;
`;

styles.DropdownLink = styled.div`
  height: ${props => (props.isPaymentPage ? '18px' : '')}
  position: relative;
  display: ${props => (props.isPaymentPage ? '' : 'block')};
  padding: ${props => (props.isPaymentPage ? '7px 10px 6px' : '14px 10px')};
  transition: ${props => (props.isPaymentPage ? '7px 10px 6px' : 'color 0.2s ease')};
  text-decoration: ${props => (props.isPaymentPage ? '' : 'none')};
  color: ${props => (props.isPaymentPage ? '#00bcd5' : '#fff')};
  cursor: ${props => (props.profile ? '' : 'pointer')};
  line-height: ${props => (props.profile ? '12px' : props.isPaymentPage ? '18px' : '28px')}; 
  height: ${props => (props.isPaymentPage ? '18px' : '')};    
  font-size: ${props => (props.isPaymentPage ? '14px' : '16px')};
  background-color: ${props => (!props.isPaymentPage && props.isActive ? '#f14d53' : 'transparent')};
  margin: ${props => (props.isPaymentPage ? '9px 0 0' : '')};
  ${props => (props.isPaymentPage ? 'font-family: Roboto' : '')};
  &:hover {
    background-color: ${props => (props.isPaymentPage ? '#f1f1f2' : '#f14d53')};
    border-bottom-color: ${props => (props.isPaymentPage ? 'none' : 'transparent')};
     border-radius: ${props => (props.isPaymentPage ? '3px' : '')};
`;

styles.DropdownArrowIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 6px;
  margin-left: 7px;
  background: ${props =>
    props.isPaymentPage
      ? 'url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) -9px -35px'
      : 'url(/assets/top-navabc-pro-help-icn.png) left top'};
`;

styles.Details = styled.div`
  flex-basis: 224px;
  padding: 16px 12px 16px 0;
  border-right: 1px solid #dfe0e3;
`;

styles.Nav = styled.nav`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  flex-basis: 121px;
  padding: 12px 8px 0;
`;

styles.Number = styled.div`
  font-size: 16px;
  padding: 0 0 6px;
  ${props => (props.isPaymentPage ? 'font-family: Roboto' : '')};
`;

styles.Timings = styled.div`
  line-height: 18px;
  font-weight: 300;
`;

styles.Help = styled.div`
  font-size: 14px;
  color: #72727d;
  padding: ${props => props.extraPadding || '18px 0 0'};
  font-weight: 300;
  ${props => (props.isPaymentPage ? 'font-family: Roboto' : '')};
`;

styles.HelpLink = styled(Link)`
  font-weight: 400;
  color: #00bcd5;
  text-decoration: none;
`;

styles.Link = styled(Link)`
  line-height: normal;
  color: #72727d;
  font-weight: 400;
  text-decoration: none;
  outline: 0;
  display: block;
  padding: 5px 5px 5px 19px;
  ${props => (props.isPaymentPage ? 'font-family: Roboto' : '')};
  margin: 0 0 4px;
  &:hover {
    background: #f1f1f2;
    text-decoration: none;
    padding: 5px 5px 5px 19px;
    margin: 0 0 4px;
  }
`;

styles.RegionalOfficeLabel = styled.div`
  font: 400 14px 'Roboto', sans-serif;
  color: #72727d;
  padding: 0 0 2px 0;
`;
styles.RegionalOfficeLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
`;
export default styles;
