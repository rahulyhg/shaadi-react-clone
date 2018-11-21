import styled from 'styled-components';

const styles = {};

styles.ChatStack = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  right: 100%;
  z-index: 2;
  margin-right: 3px;
  writing-mode: rl-tb;

  &:hover {
    z-index: 3;
  }
`;

export default styles;
