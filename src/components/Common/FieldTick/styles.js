import styled, { keyframes } from 'styled-components';

const styles = {};
const animateTick = keyframes`
   0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 8px;
    opacity: 1;
  }
  40% {
    height: 18px;
    width: 8px;
    opacity: 1;
  }
  100% {
    height: 18px;
    width: 8px;
    opacity: 1;
  }
`;

styles.CheckmarkCircle = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  display: inline-block;
  vertical-align: top;
`;

styles.CheckmarkBackground = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #87ca5f;
  position: absolute;
`;

styles.CheckmarkDraw = styled.div`
  &:after {
    animation-delay: 10ms;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-name: ${animateTick};
    transform: scaleX(-1) rotate(135deg);
    animation-fill-mode: forwards;
    opacity: 1;
    width: 8px;
    height: 18px;
    transform-origin: left top;
    border-right: 4px solid #fff;
    border-top: 4px solid #fff;
    content: '';
    left: 8px;
    top: 20px;
    position: absolute;
  }
`;

export default styles;
