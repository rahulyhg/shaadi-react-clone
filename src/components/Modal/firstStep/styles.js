import styled, { keyframes } from 'styled-components';

const styles = {};

const slideOut = keyframes`
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
`;

styles.FistStepWrapper = styled.div`
  position: absolute;
  left: calc(100vw/2 - 305px);
  bottom: -100%;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  width: 610px;
  background: #fff;
  padding: 20px 15px;
  border-radius: 3px 3px 0 0;
  text-align: center;
  z-index: 2;
  font: normal 16px 'Roboto', sans-serif;
  color: #51505d;
  font-weight: 300;
  will-change: bottom;
  animation: ${slideOut} linear;
  animation-duration: 2s;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;
styles.ClapImg = styled.div`
  display: block;
  width: 140px;
  height: 110px;
  background: url('/assets/pp-clap-v2.gif') center center no-repeat;
  margin: 0 auto;
`;
styles.FirstStepTitle = styled.h3`
  font: normal 23px 'Roboto', sans-serif;
  font-weight: 400;
  margin: 0;
  color: #51505d;
`;
styles.Caption = styled.p``;
styles.WhyWait = styled.div`
  display: inline-block;
  border-top: 1px solid #d0d1d5;
  padding: 15px 20px 0;
  text-align: center;
`;
styles.UpgradeText = styled.p`
  margin: 0;
`;
styles.LayerUpgradeLink = styled.span`
  font: normal 15px/18px 'Roboto', sans-serif;
  font-weight: 300;
  color: #fff;
  display: inline-block;
  padding: 10px 19px;
  margin: 0;
  border-radius: 3px;
  background: #00bcd5;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 0.2s ease-out;
  margin-top: 8px;
  text-decoration: none;
`;
styles.Discount = styled.div`
  font-size: 14px;
  color: #ff5a60;
  margin-top: 8px;
  margin-bottom: 8px;
`;
styles.NextProfileLink = styled.span`
  background: url(/assets/right-gray-arrow.png) no-repeat right center;
  font: normal 14px 'Roboto', sans-serif;
  color: #00bcd5;
  padding: 0 11px 0 0;
  font-weight: 400;
  margin-top: 8px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
