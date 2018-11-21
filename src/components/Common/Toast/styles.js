import styled, { keyframes } from 'styled-components';

const styles = {};

const fadeIn = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
}
`;

styles.Toast = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: relative;
  width: 100%;
  min-height: 40px;
  max-height: 90px;
  margin: 20px 0 9px;
  animation: ${fadeIn} 1s linear;
  animation-fill-mode: forwards;
`;

styles.CloseBtn = styled.button`
  width: 12px;
  height: 12px;
  background: url(/assets/profile-icon-sprite-v3.png) no-repeat left -150px;
  position: absolute;
  right: 4px;
  top: 4px;
  border: 0;
  outline: 0;
  &:hover {
    background: url(/assets/profile-icon-sprite-v3.png) no-repeat left -162px;
  }
`;

styles.Content = styled.div`
  display: block;
`;

export default styles;
