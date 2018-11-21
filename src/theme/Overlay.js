import Fixed from './Fixed';

const Overlay = Fixed.extend`
  position: ${({ position = 'fixed' }) => position};
  top: 0;
  left: 0;
  z-index: ${({ zIndex = 2 }) => zIndex};
  background: ${({ background = 'rgba(255, 255, 255, 0.7)' }) => background};
  height: ${({ height = '100vh' }) => height};
  width: ${({ width = '100vw' }) => width};
  opacity: ${({ opacity }) => opacity};
  pointer-events: ${({ pointerEvents = 'none' }) => pointerEvents};
`;

export default Overlay;
