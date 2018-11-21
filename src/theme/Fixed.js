import styled from 'styled-components';

const Absolute = styled.div`
  position: fixed;
  top: ${({ top = '' }) => top};
  right: ${({ right = '' }) => right};
  left: ${({ left = '' }) => left};
  bottom: ${({ bottom = '' }) => bottom};
`;

export default Absolute;
