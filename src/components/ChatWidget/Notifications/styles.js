/* eslint-disable */
import styled, { keyframes } from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

styles.AlertLink = styled(Link)`
  display: inline-block;
  color: #72727d;
  text-decoration: none;
`;

styles.Name = styled.span`
  color: #00bcd5;
  font-weight: bold;
`;


styles.NewNotifications = styled.div`
  animation: ${props => (props.willFade ? fadeOut : null)} 3s linear;
  animation-fill-mode: forwards;
  animation-delay: 11000ms;
  background: #fff8db;
  border-radius: 3px;
  border: solid 1px #e0cb68;
  bottom: ${props => (((props.index*50) + 32) + 'px')};
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.22);
  box-sizing: border-box;
  color: #72727d;
  cursor: pointer;
  font-size: 14px;
  margin: 0 0 3px -13px;
  opacity: 1;
  padding: 10px;
  position: absolute;
  right: 0px;
  text-decoration: none;
  width: 238px !important;
  z-index: 5;
`;

styles.NotificationBtn = styled.button`
  background: url(/assets/im-icon-sprite-ver7.png) no-repeat left -638px;
  cursor: pointer;
  display: inline-block;
  height: 12px;
  width: 12px;
  position: absolute;
  right: 5px;
  top: 5px;
  border: 0;
  outline: 0;
`;

export default styles;
