import styled from 'styled-components';

const styles = {};

styles.ChatWidget = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 3;
  top: 55px;
  top: ${props => (props.isOpen ? '' : 'auto')};
  max-height: ${props => (props.isOpen ? 'inherit' : '30px')};
  width: 245px;
  background: #fff;
  border-top: solid 1px #dfe0e3;
  border-left: solid 1px #dfe0e3;
  border-right: solid 1px #dfe0e3;
  will-change: top;
  &:after {
    content: '';
    box-shadow: inset 4px 0 4px -2px #e1e1e3;
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    z-index: 5;
  }
`;

export default styles;
