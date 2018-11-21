import styled from 'styled-components';

const styles = {};
styles.Table = styled.div`
  width: 920px;
  margin: 0 auto;
  display: table;
  font: 300 16px 'Roboto', arial, sans-serif;
  height: 80px;
`;

styles.Row = styled(styles.Table)`
  ${({ styleMixin }) => styleMixin};
`;

styles.Column = styled.div`
  ${({ styleMixin }) => styleMixin};
`;

export default styles;
