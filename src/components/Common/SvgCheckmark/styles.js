import styled, { keyframes } from 'styled-components';

const styles = {};

const dash = keyframes`
  from {
    stroke-dashoffset: -65;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

styles.CheckmarkWrap = styled.div`
  display: flex;
  position: absolute;
  left: ${props => (props.isPremiumCarousel ? '7px' : '50%')};
  top: 0;
  margin: ${props => (props.isPremiumCarousel ? '7px 0 0 0' : '0 -8px')};
  z-index: 2;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

styles.SvgStrokeWrap = styled.svg`
  overflow: visible !important;
`;

styles.SvgStroke = styled.g``;

styles.SvgPolyline = styled.polyline`
  animation: ${dash} 0.5s ease-in-out;
  stroke-dasharray: 80;
  stroke: #7cc04a;
`;

export default styles;
