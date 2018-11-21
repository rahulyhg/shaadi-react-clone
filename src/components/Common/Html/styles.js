import styled from 'styled-components';

const styles = {};

styles.InputFile = styled.input`
  display: ${props => (props.hide ? 'none' : 'block')};
`;

export default styles;
