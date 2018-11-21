import styled from 'styled-components';

const styles = {};

const Container = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  padding: 0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (!props.onHover ? 'rgba(0, 0, 0, 0.8)' : '')};
`;

styles.OverlayDiv = Container.extend`
  z-index: ${props => (!props.onHover ? props.zIndex : '0')};
  &:hover {
    background-color: ${props => (props.onHover ? 'rgba(0, 0, 0, 0.8)' : '')};
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: ${props => props.zIndex};
  }
`;

export default styles;
