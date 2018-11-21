import styled from 'styled-components';

const s = {};

s.MutliChoiceWrapper = styled.h1`
  text-align: center;
  margin: 0 0 2px;
  padding: 0;
`;

s.Title = styled.div`
  color: #51505d;
  font: 400 26px 'Roboto', sans-serif;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

s.Tick = styled.span`
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0px 1px 1px 0px;
  transform: rotate(45deg);
  display: inline-block;
  margin: 4px 0 0;
`;

s.radioTabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 0;
  @media (max-width: 768px) {
    padding: 10px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export default s;
