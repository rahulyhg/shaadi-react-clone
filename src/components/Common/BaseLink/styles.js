import styled from 'styled-components';
import Link from '../Link';

const styles = {};
styles.HyperLink = styled(Link)`
  ${({ styleMixin }) => styleMixin};
`;

styles.HyperAnchor = styled.a`
  ${({ styleMixin }) => styleMixin};
`;

export default styles;
