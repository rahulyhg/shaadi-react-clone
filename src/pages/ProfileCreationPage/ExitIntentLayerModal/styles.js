import styled from 'styled-components';

const s = {};

s.UploadPhotoLayer = styled.div`
  display: block;
  width: ${props => (props.isHelpMeLayer ? '365px' : '588px')};
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  z-index: inherit;
`;

s.RegcontentMainWrap = styled.div`
  padding: 20px 30px 30px;
  font-size: 14px;
  font-family: arial;
  line-height: 18px;
  background: #fff;
  position: relative;
  width: 528px;
  border-radius: 3px;
`;

s.Regcontenthead = styled.div`
  font: 400 18px 'Roboto', sans-serif;
  margin: 0 0 20px;
  color: #51505d;
`;

s.RegcontentWrap = styled.div`
  font: 300 16px 'Roboto', sans-serif;
  color: #51505d;
  padding: 12px 13px;
  border-radius: 3px;
  border: 1px solid #dfe0e3;
`;

s.modelBtnWrap = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
`;

s.cancelBtn = styled.div`
  font: 400 16px 'Roboto', sans-serif;
  color: #95959d;
  margin: 0 50px 0 0;
  cursor: pointer;
`;

export default s;
