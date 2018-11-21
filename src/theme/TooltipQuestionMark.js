import styled from 'styled-components';

const TooltipQuestionMark = styled.span`
  border-radius: 50%;
  width: 17.75px;
  height: 17.75px;
  border: 1.25px solid rgba(177, 179, 185, 0.7);
  background-color: ${({ isActive }) => (isActive ? '#b1b3b9' : '#ffffff')};
  display: flex;
  &:after {
    content: '?';
    width: 19px;
    height: 19px;
    display: flex;
    font-weight: 500;
    color: ${({ isActive }) => (isActive ? '#ffffff' : '#b1b3b9')};
    width: 100%;
    height: 100%;
    justify-content: center;
    transform: scale(0.75, 0.75);
    align-items: center;
  }
`;

export default TooltipQuestionMark;
