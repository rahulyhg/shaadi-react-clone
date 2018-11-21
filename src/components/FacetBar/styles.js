import styled from 'styled-components';

const styles = {};

styles.FacetBar = styled.div`
  width: 207px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  margin: ${props => (props.source === 'inbox' ? '10px 0 0' : '20px 0 0')};
  position: relative;
  z-index: 24;
`;

styles.Title = styled.h1`
  border: solid 1px #dfe0e3;
  border-bottom: 0;
  width: 205px;
  background: #dfe0e3;
  margin: 0;
  padding: 4px 0;
  font: normal 16px/24px arial;
  color: #72727d;
  text-align: center;
`;

export default styles;
