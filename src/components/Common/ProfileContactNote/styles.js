import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.ProfileContactNoteText = styled.div``;

styles.SameGenderHighlight = styled.span`
  color: red;
`;
styles.ShortlistHighlight = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
