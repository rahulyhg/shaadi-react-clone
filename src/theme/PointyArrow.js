import styled from 'styled-components';

const PointyArrow = styled.div`
  position: absolute;
  top: 27px;
  width: 20px;
  border-bottom: 2px solid rgb(170, 170, 170);
  &::after {
    content: '';
    position: absolute;
    border: 1px solid #b1b3b9;
    border-width: 0 2px 2px 0;
    height: 10px;
    width: 10px;
    padding: 0;
    background: transparent;
    cursor: pointer;
    z-index: 2;
    top: -5px;
    left: 0;
    transform: rotate(135deg);
  }
`;

export default PointyArrow;
