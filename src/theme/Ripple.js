import styled, { keyframes } from 'styled-components';

const rippleAnimation = keyframes`
  0% {
    transform: scale(1);
  } 
  100% {
    opacity: 0;
    transform: scale(var(--scale));
  }
`;

const Ripple = styled.div`
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  background-color: ${({ color }) => color};
  --scale: ${({ scale }) => scale};
  width: 2px;
  height: 2px;
  position: absolute;
  border-radius: 50%;
  animation: ${rippleAnimation} 0.5s ease-in-out;
`;

export default Ripple;
