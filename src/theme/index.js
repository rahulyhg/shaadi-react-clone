import styled from 'styled-components';
import zIndex from './zIndex';
import './basic.css';
import './roboto.css';
import './react-joyride-compiled.css';
import './custom-components.css';

const styles = {};

styles.Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 960px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

styles.Main = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 100%;
  flex-wrap: nowrap;
  box-sizing: border-box;
  padding-top: ${props => (props.theme.needMainPadding ? '100px' : 0)};
`;

styles.Content = styled.div`
  display: ${props => props.theme.contentDisplay};
  position: relative;
  flex: 1;
`;

const Arrow = styled.span`
  cursor: pointer;
  background: url(/assets/verify-img-sprite.png) no-repeat left -145px;
  width: 15px;
  height: 13px;
  display: block;
  background-size: 115px;
  transform: rotate(0deg);
  transition: transform 300ms ease;
  transform: rotate(${props => (props.isOpen ? -178 : 0)}deg);
`;

export default styles;

export { zIndex, Arrow };
