import styled from 'styled-components';

const styles = {};

styles.TextFieldsWrap = styled.div`
  display: block;
  color: #51505d;
  margin: ${({ noMargin }) => (noMargin ? '0' : '16px 0 0 0')};
`;

styles.ArrowButton = styled.button`
  outline: none;
  display: flex;
  border: 1px solid ${props => (props.canShowError ? '#e53a41' : '#b1b3b9')};
  border-width: 0 2px 2px 0;
  height: 10px;
  padding: 0;
  width: 10px;
  background: transparent;
  z-index: 2;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transform: rotate(
    ${props =>
      ({
        up: -135,
        down: 45,
        left: 135,
        right: -45,
      }[props.direction])}deg
  );
  transition: transform 0.5s ease-in-out;
  &:focus {
    outline: none;
  }
  {
    props=>props.style
  }
`;

export default styles;
