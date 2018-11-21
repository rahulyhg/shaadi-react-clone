import styled from 'styled-components';

const Cross = styled.div`
  opacity: 0.3;
  width: ${({ size = '32px' }) => size};
  height: ${({ size = '32px' }) => size};
  &::hover {
    opacity: 1;
  }
  &::before,
  &::after {
    position: absolute;
    content: ' ';
    width: 2px;
    height: ${({ size = '32px' }) => size};
    background-color: #333;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export default Cross;
