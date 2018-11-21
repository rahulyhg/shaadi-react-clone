import styled from 'styled-components';

const s = {};

s.TooltipMainWrap = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  height: 32px;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    margin-left: 6px;
  }
`;

export default s;
