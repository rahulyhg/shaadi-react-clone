import styled from 'styled-components';

export const Language = styled.div`
  width: 98,
  height: 32,
  border-radius: 16,
  border: '1 solid #dfe0e3',
  background-Color: '#ffffff',
  color: '#72727d',
  font-family: 'Roboto',
  font-size: 15,
  font-weight: 400,
`;

export const LangList = styled.div`
  font: 300 20px/32px 'Roboto', sans-serif;
  text-align: center;
  color: #51505d;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const LangOpt = LangList.extend`
  font: 300 26px 'Roboto', sans-serif;
  text-align: center;
  color: #51505d;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Tick = LangList.extend``;
