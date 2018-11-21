import styled, { keyframes } from 'styled-components';

const styles = {};
const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const color = keyframes`
  0% {
    stroke: #ff5a60;
  }
  100% {
    stroke: #ff5a60;
  }
`;

const paymentColor = keyframes`
  0% {
    stroke: #fff;
  }
  100% {
    stroke: #fff;
  }
`;

styles.SvgLoader = styled.div`
  display: ${props => (props.isVisible ? (props.isPremiumCarousel ? 'block' : 'flex') : 'none')};
  position: absolute;
  left: 50%;
  top: 50%;
  width: 25px;
  margin: -12.5px auto 0 -12.5px;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;
styles.SvgLoader.displayName = 'SvgLoader';

styles.SvgPath = styled.svg`
  width: ${props => (props.isBigLoader ? '50px' : '25px')};
  height: ${props => (props.isBigLoader ? '50px' : '25px')};
  animation: ${rotate} 1.5s linear infinite;
  transform-origin: center center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

styles.SvgCircle = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite, ${props => (props.isPaymentLoader ? paymentColor : color)} 6s ease-in-out infinite;
  stroke-linecap: round;
`;

export default styles;
