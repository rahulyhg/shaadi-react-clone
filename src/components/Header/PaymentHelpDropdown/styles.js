import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.HelpLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
`;

styles.ArrowLink = styled(Link)`
  display: inline-block;
  font-size: 0;
  width: 9px;
  height: 9px;
  background: ${props =>
    props.icon === 'down' ? 'url(/assets/cart-icon.png) no-repeat -9px top' : 'url(/assets/cart-icon.png) no-repeat 0 top'};
  margin: 3px 0 0 5px;
  cursor: pointer;
  vertical-align: middle;
`;

styles.HelpSection = styled.div`
  height: 18px;
  padding: 7px 10px 6px;
  position: relative;
  z-index: 999;
  font: 300 14px 'Roboto', sans-serif;
  transition: all 300ms ease;
  align-self: center;
  &:hover {
    background: #f1f1f2;
    border-radius: 3px;
  }
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
  display: ${props => props.show};
`;
styles.HelpDropList = styled(Link)`
  text-decoration: none;
  outline: none;
  padding: 5px;
  display: block;
  font: 300 12px 'Roboto', sans-serif;
  &:hover {
    background: #f1f1f2;
  }
`;

styles.HelpDeskLink = styled.div`
  margin: 3px 0;
  color: #00bcd5;
`;

export default styles;
