import styled from 'styled-components';

const styles = {};

styles.Switch = styled.label`
  position: relative;
  margin: 0 15px;
  cursor: pointer;
`;

styles.Input = styled.input`
  visibility: hidden;
  width: 30px;
  -webkit-appearance: none;
  height: 16px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  &:checked + span {
    background-color: #83e1ed;
  }

  &:checked + span::after {
    background-color: #00bcd5;
    left: 16px;
  }
`;

styles.Slider = styled.span`
  content: '';
  display: inline-block;
  position: relative;
  width: 30px;
  height: 15px;
  background-color: #b9b8b8;
  border-radius: 15px;
  transition: background 0.3s ease;
  vertical-align: middle;

  &:after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #f1f1f1;
    border-radius: 20px;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);
    left: -5px;
    top: -3px;
    transition: left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease;
  }
`;

export default styles;
