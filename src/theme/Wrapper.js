import styled from 'styled-components';

const Wrapper = styled.div`
  box-shadow: ${({ withBoxShadow }) => withBoxShadow && '16px 0 16px rgba(0, 0, 0, 0.24), 0 0 16px rgba(0, 0, 0, 0.6)'};
  box-shadow: ${({ boxShadow }) => boxShadow};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-height: ${({ minHeight }) => minHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  padding-left: ${({ paddingLeft }) => paddingLeft};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ boldness }) => boldness};
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  flex: ${({ flex }) => flex};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  text-align: ${({ textAlign }) => textAlign};
  justify-content: ${({ justifyContent }) => justifyContent};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  box-sizing: ${({ boxSizing }) => boxSizing};
  background: ${({ background }) => background};
  overflow: ${({ overflow }) => overflow};
  cursor: ${({ cursor }) => cursor};
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  -webkit-overflow-scrolling: ${({ smoothScroll }) => smoothScroll && 'touch'};
`;

export default Wrapper;
