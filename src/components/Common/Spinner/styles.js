import styled, { keyframes } from 'styled-components';

const styles = {};

styles.Spinner = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

styles.SpinIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url(/assets/loading.gif);
  background-repeat: no-repeat;
`;

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

const colorAnimation = ({ color }) => keyframes`
  0% {
    stroke: ${color};
  }
  40% {
    stroke: ${color};
  }
  66% {
    stroke: ${color};
  }
  80%,
  90% {
    stroke: ${color};
  }
`;

styles.spinnerLoader = styled.svg`
  animation: ${rotate} 2s linear infinite;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: ${props => props.size};
  height: ${props => props.size};
  transform-origin: center center;
  position: absolute;
`;

styles.spinnerCircle = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease infinite, ${props => colorAnimation(props)} 6s ease infinite;
  stroke-linecap: round;
`;

export default styles;
