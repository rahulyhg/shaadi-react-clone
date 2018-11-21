import styled from 'styled-components';
import radioStyle from '../Common/FormElements/RadioTabGroup/styles';

const s = {};

s.VerifyProfileMainWrap = styled.div`
  ${props =>
    props.isNative ? 'background: #fff;min-height: 100vh;' : 'margin: -108px 0 0; @media (max-width: 768px) {margin: -123px 0 0;}'};
`;

s.VerifiProfileSubMainWrap = styled.div`
  background: #fff;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  border-radius: 3px;
  width: 650px;
  margin: 18px auto;
  @media (max-width: 768px) {
    width: 93%;
  }
`;

s.VerifyProfileWrap = styled.div`
  max-width: 650px;
  padding: 15px 0 25px;
  font: 300 26px 'Roboto', sans-serif;
  margin: 0 auto;
`;

s.VerifyHeading = styled.h1`
  color: #72727d;
  text-align: center;
  margin: 8px 0;
  font: 500 ${props => (props.isSmall ? '16px' : '26px')} 'Roboto', sans-serif;
  @media (max-width: 768px) {
    font: 500 16px 'Roboto', sans-serif;
  }
`;

s.HelpHeading = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #72727d;
  font: 300 14px 'Roboto', sans-serif;
`;

s.Bold = styled.span`
  font-weight: ${props => props.weight || 'normal'};
`;

s.ProfileFormMain = styled.div`
  width: 87%;
  margin: 0 auto;
`;

s.OfflineIdUploadWrap = styled.div`
  width: 80%;
  min-height: 150px;
  border-radius: 3px;
  border: 1px dashed #b1b3b9;
  text-align: center;
  margin: 5px auto 15px;
`;

s.UploadFileLabel = styled.label`
  -webkit-tap-highlight-color: transparent;
`;

s.IdUploadBtnWrap = styled.div`
  width: 90px;
  margin: ${props => (props.isUploadedDoc ? '15px auto 7px' : '39px auto 0')};
`;

s.IdUploadBtn = styled.div`
  background: url(/assets/round-plus-icon.svg) no-repeat;
  background-size: 47px 47px;
  width: 47px;
  height: 47px;
  bottom: 6px;
  margin: 0 auto;
`;

s.IdUploadText = styled.div`
  color: #72727d;
  font: 300 14px 'Roboto', sans-serif;
  padding: 7px 0 0;
`;

s.UploadedFileWrap = styled.div`
  width: 86%;
  border-bottom: 1px solid #dfe0e3;
  margin: 0 auto;
  display: flex;
  padding: ${props => (props.isProgress ? '10px 0 9px' : '10px 0 16px')};
  opacity: ${props => (props.isProgress ? '0.5' : '1')};
`;

s.FileIcon = styled.div`
  background: url(/assets/file-icon.svg) no-repeat;
  background-size: 19px 17px;
  width: 19px;
  height: 17px;
  margin: 6px 10px 0 0;
`;

s.FileText = styled.div`
  color: #51505d;
  font: 400 14px 'Roboto', sans-serif;
  width: 165px;
  text-align: left;
  padding: ${props => (props.isProgress ? '0' : '7px 0 0')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

s.ProgressText = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  color: #72727d;
  font: 300 11px 'Roboto', sans-serif;
  padding: 2px 0 0;
`;

s.Divider = styled.div`
  border-bottom: 1px solid #f1f1f2;
  width: 185px;
  margin: 10px auto 14px;
`;

s.SubmitBtn = styled.button`
  display: block;
  width: ${props => (props.isMobile ? '80%' : '160px')};
  color: ${props => (props.disabled ? '#b1b3b9' : '#fff')};
  margin: 0 auto;
  padding: 10px;
  border-radius: 3px;
  outline: none;
  background: ${props => (props.disabled ? '#f1f1f2' : '#00bcd5')};
  border: 0;
  font: 400 16px/18px 'Roboto', sans-serif;
  ${props => (props.disabled ? '' : 'box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);')};
`;

s.DocumentStatusWrap = styled.div`
  border-bottom: 1px solid #f1f1f2;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.12);
  ${props => (props.isNative ? '' : 'border-radius: 3px 3px 0 0;')};
  background-color: #f1f1f2;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

s.DocumentStatusTick = styled.span`
  display: inline-block;
  background: url(/assets/green-tick.svg) no-repeat center;
  width: 15px;
  height: 12px;
  background-size: 15px 12px;
  margin: 0 5px 0 0;
`;

s.DocumentStatusText = styled.div`
  margin: 0 auto;
  font: 400 14px 'Roboto', sans-serif;
  color: #72727d;
  line-height: 20px;
`;

s.DocumentScreeningText = styled.div`
  margin: 0 auto;
  font: 300 12px 'Roboto', sans-serif;
  color: #72727d;
  line-height: 20px;
`;

s.tabwrapper = radioStyle.tabwrapper.extend`
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

s.StyleButton = radioStyle.StyleButton.extend`
  && {
    margin: 0 6px 10px 0;
  }
`;

export default s;
