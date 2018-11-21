import styled, { keyframes } from 'styled-components';

const styles = {};

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const color = keyframes`
  0% {
    stroke: #ff5a60;
  }
  40% {
    stroke: #ff5a60;
  }
  66% {
    stroke: #ff5a60;
  }
  80%,
  90% {
    stroke: #ff5a60;
  }
`;

styles.ReportMisuseReasonsWrap = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.ReportMisuseTitle = styled.div`
  width: 500px;
  font: 500 18px 'Roboto', sans-serif;
  color: #51505d;
`;
styles.ReportMisuseCloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: -2px;
  display: block;
  width: 30px;
  height: 30px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/reg-layer-close.png) no-repeat 7px 7px;
  &:hover {
    background: url(/assets/reg-layer-close.png) no-repeat 7px -24px;
  }
`;
styles.ReportMisuseMainWrap = styled.div`
  border-bottom: 1px solid #dfe0e3;
  padding: 5px 0 5px;
`;
styles.ReportMisuseListTitle = styled.div`
  font: 300 16px 'Roboto', sans-serif;
  padding: 5px 0 5px 0;
  display: flex;
  cursor: pointer;
`;
styles.ReportMisuseTitleCopy = styled.div`
  flex: 1;
  color: ${props => (props.isOpen ? '#ff5a60' : '#51505d')};
`;
styles.ReportMisuseArrow = styled.div`
  background: url(/assets/report-misuse-sprite-v4.png) no-repeat left ${props => (props.isOpen ? 'top' : '-10px')};
  width: 13px;
  height: 7px;
  margin: 7px 5px 0 0;
`;
styles.ReportMisuseAction = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  font: 300 14px/18px 'Roboto', sans-serif;
`;
styles.ReportMisuseLabelWrap = styled.div`
  padding: 6px 0;
`;
styles.ReportMisuseCheckBox = styled.input`
  margin: 0 9px 0 0;
  vertical-align: middle;
  outline: none;
`;
styles.ReportMisuseLabel = styled.label`
  color: #51505d;
  vertical-align: middle;
  display: inline-block;
  margin: 0 10px 0 0;
  cursor: pointer;
`;
styles.ReportMisuseError = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: #e53a41;
  padding: 10px 0 10px 1px;
`;
styles.ReportMisuseFooter = styled.div`
  margin: 18px 0 0;
  text-align: center;
`;
styles.ReportMisuseBtn = styled.button`
  outline: 0;
  font: 400 16px 'Roboto', sans-serif;
  padding: 6px 23px;
  margin: 2px 0 18px;
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  transition: all 300ms ease;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;
styles.ReportMisuseUploadWrp = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: 455px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  padding: 38px 0 0;
`;
styles.CloseIntentModalBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 13px;
  display: block;
  width: 30px;
  height: 30px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/reg-layer-close.png) no-repeat 7px 7px;
  &:hover {
    background: url(/assets/reg-layer-close.png) no-repeat 7px -24px;
  }
`;
styles.ReportMisuseReportingIcon = styled.div`
  background: url(/assets/report-misuse-sprite-v4.png) no-repeat left top -19px;
  width: 52px;
  height: 52px;
  margin: 0 auto;
`;
styles.ReportMisuseThankyouText = styled.div`
  color: #51505d;
  font-size: 14px;
  line-height: 19px;
  padding: 16px 0;
  font-weight: 300;
`;
styles.ReportMisuseThankyouMsg = styled.div`
  font-weight: 500;
  font-size: 16px;
  display: block;
  padding: 0 0 4px;
`;
styles.ReportMisuseTextarea = styled.textarea`
  border: 1px solid #dfe0e3;
  width: 365px;
  height: 76px;
  color: #72727d;
  font: 300 12px/16px 'Roboto', sans-serif;
  padding: 7px 10px;
  border-radius: 3px;
  resize: none;
  outline: none;
`;
styles.ReportingBorder = styled.div`
  width: 100px;
  margin: 16px auto;
  border-bottom: 1px solid #fff;
`;
styles.ReportMisuseUploadTxt = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #51505d;
  font-weight: 300;
  width: 300px;
  text-align: left;
  padding: 0 0 6px 35px;
`;
styles.MisuseSsUploadingWrap = styled.div``;
styles.UploadPhotoBlock = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  border: 1px solid #00bcd7;
  border-radius: 3px;
  text-align: center;
  width: 385px;
  margin: 0 auto;
  cursor: pointer;
`;
styles.ChooseFileInputWrap = styled.span`
  display: inline-block;
  position: relative;
`;
styles.InpuFileField = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
  z-index: 1;
`;
styles.InputLabelWrap = styled.label`
  cursor: pointer;
  display: block;
  width: 385px;
  line-height: 66px;
`;
styles.ChooseFileIcon = styled.span`
  display: inline-block;
  background: url(/assets/report-misuse-sprite-v4.png) no-repeat left top -148px;
  width: 16px;
  height: 15px;
  margin: 0 9px 0 0;
  vertical-align: middle;
`;
styles.ChooseFileText = styled.span`
  display: inline-block;
  color: #00bcd5;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  height: 15px;
  line-height: 15px;
  vertical-align: middle;
`;
styles.ProgressBorder = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: 365px;
  margin: 0 auto;
  cursor: pointer;
  border: 1px solid #dfe0e3;
  padding: 8px 10px 17px;
  border-radius: 3px;
  text-align: left;
`;
styles.FileName = styled.div`
  font-size: 12px;
  color: #95959d;
  padding: 0;
  margin: 0 7px 0 0;
  font-weight: 300;
  display: inline-block;
  width: 334px;
  vertical-align: middle;
`;
styles.ProgressBarClose = styled.button`
  display: inline-block;
  width: 12px;
  height: 12px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  transition: all 300ms ease;
  background: url(/assets/reg-layer-new-close-normal.png) no-repeat left top;
  &:hover {
    background: url(/assets/reg-layer-new-close-hover.png) no-repeat left top;
  }
`;
styles.ProgressBarWrap = styled.div`
  display: block;
  width: 100%;
  background: #dfe0e3;
  height: 4px;
  margin: 10px auto 0;
  border-radius: 3px;
  overflow: hidden;
`;
styles.ProgressBar = styled.div`
  width: ${props => (props.attachmentProgress ? `${props.attachmentProgress}%` : '10%')};
  height: 4px;
  background: #ff5a60;
`;
styles.RetryLink = styled.span`
  outline: none;
  color: #00bcd5;
  &:hover {
    text-decoration: underline;
  }
`;
styles.ProgressFailed = styled.div`
  width: 100%;
  height: 4px;
  background: #95959d;
`;
styles.ProgressDelete = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: 365px;
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  padding: 19px 10px;
  cursor: pointer;
  margin: 0 auto;
  text-align: left;
`;
styles.FileNameDele = styled.div`
  font-size: 12px;
  color: #95959d;
  line-height: 12px;
  padding: 0;
  font-weight: 300;
  display: inline-block;
  width: 334px;
  vertical-align: middle;
`;
styles.FileDeleteIcon = styled.div`
  background: url(/assets/delete-icon-small.png) no-repeat left top;
  width: 12px;
  height: 16px;
  transition: all 300ms ease;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
`;
styles.ThanksWrap = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding: 38px 0 19px;
`;
styles.ThanksGreenIcon = styled.div`
  background: url(/assets/report-misuse-sprite-v4.png) no-repeat left top -73px;
  width: 40px;
  height: 40px;
  margin: 0 auto;
`;
styles.ThanksMsg = styled.div`
  font: 300 28px 'Roboto', sans-serif;
  color: #72727d;
  text-align: center;
  padding: 8px 0 0;
`;
styles.ThanksMsgPara = styled.div`
  text-align: center;
  font: 300 16px 'Roboto', sans-serif;
  color: #72727d;
  padding: 12px 0 0;
`;
styles.ModalLoader = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.SvgLoader = styled.div`
  display: block;
  position: relative;
  padding: ${props => (props.vipConsultant ? '46px' : '120px')} 0;
  width: 150px;
  margin: 0 auto;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;
styles.SvgPath = styled.svg`
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  transform-origin: center center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;
styles.SvgCircle = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite, ${color} 6s ease-in-out infinite;
  stroke-linecap: round;
`;
styles.BlockMember = styled.div`
  border-radius: 3px;
  width: 568px;
  text-align: left;
  background: #fff;
  z-index: 1;
`;

export default styles;
