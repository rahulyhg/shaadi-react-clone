import styled from 'styled-components';
import { zIndex } from '../../theme';

const styles = {};

styles.HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${props => (props.profilecardDisplay ? 3 : `${zIndex.header}`)};
  height: 56px;
`;

export default styles;
