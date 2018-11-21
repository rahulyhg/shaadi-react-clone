import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.HiddenConnectLayer = styled.div`
  color: #72727d;
  font-size: 14px;
  position: relative;
  width: 559px;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  background: #fff;
`;
styles.HiddenLayerContent = styled.div`
  background-color: #fff;
  font: normal 14px arial;
  padding: 20px 15px 20px 16px !important;
`;
styles.ActiveHiddenProfile = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    outline: 0;
  }
`;

export default styles;
