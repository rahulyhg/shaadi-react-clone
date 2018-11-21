import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.uName = styled(Link)`
  color: #00bcd5;
  padding-left: 2px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.noCssDiv = styled.div``;

export default styles;
