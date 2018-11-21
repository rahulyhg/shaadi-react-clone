import styled from 'styled-components';

const Option = styled.div`
  color: rgba(81, 80, 93, 0.87);
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 16px;
  font-family: Roboto;
  font-size: ${({ isOptionGroup }) => (isOptionGroup ? '20px' : '16px')};
  font-weight: ${({ isOptionGroup }) => (isOptionGroup ? '500' : '300')};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ isOptionGroup }) => (isOptionGroup ? 600 : 300)};
  background-color: ${({ selected }) => selected && '#83E1ED'};
  line-height: 24px;
  margin: ${({ margin }) => margin};
  white-space: normal;
  padding-left: 50px;
  height: auto;
  width: auto;
  background-position: center;
  text-align: left;
  align-items: center;
  justify-content: flex-start;
  transition: background 0.8s;
  position: relative;
  cursor: pointer;
`;

export default Option;
