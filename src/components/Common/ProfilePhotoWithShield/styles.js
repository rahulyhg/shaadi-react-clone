import styled from 'styled-components';

const s = {};

s.ProfileImgWrap = styled.div`
  width: 105px;
  height: 105px;
  margin: 0 auto;
  position: relative;
`;

s.ProfileImg = styled.img`
  border: 1px solid #dfe0e3;
  border-radius: 50%;
  max-width: 100%;
  overflow: hidden;
  width: 105px;
  height: 105px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

s.IconShield = styled.span`
  background: url(/assets/photo-shield-green.svg) no-repeat left 0px;
  background-size: 24px 29px;
  width: 24px;
  height: 29px;
  position: absolute;
  bottom: 0px;
  right: 1px;
`;

export default s;
