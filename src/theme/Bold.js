import styled from 'styled-components';

const Bold = styled.span`
  font-weight: {({ boldness = 'bold'}) => props.boldness};
`;

export default Bold;
