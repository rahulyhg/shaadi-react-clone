import styled from 'styled-components';

const styles = {};

const fontFamily = 'Roboto, sans-serif';
const primaryColor = 'color: #51505d';

styles.Label = styled.div`
  padding: 0 3px 0 17px;
  font: 400 14px ${fontFamily};
  ${props => props.isSeperate && 'width: 167px;'};
  white-space: nowrap;
  ${primaryColor};
`;

export default styles;
