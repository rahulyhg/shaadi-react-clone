import styled from 'styled-components';

const styles = {};

styles.PhotoUploadPrompt = styled.div`
  background: url(/assets/privacy-case-v3.png) no-repeat left -138px;
  font-size: 14px;
  padding: 0 0 2px 27px;
  line-height: 16px;
`;

styles.PhotoUploadBtns = styled.div`
  display: flex;
  padding: 8px 0 6px;
`;

styles.PhotoUploadInput = styled.input`
  display: none;
`;

styles.PhotoUploadInputBtn = styled.label`
  display: inline-block;
  ${props =>
    props.showIcon
      ? 'background: url(/assets/privacy-case-v3.png) no-repeat left -158px;text-indent: 36px;'
      : ''} background-color: #00bcd5;
  width: ${props => props.width};
  padding: ${props => props.padding};
  margin-left: 0;
  border: 0;
  cursor: pointer;
  font: bold 14px/10px 'Roboto', sans-serif;
  color: #fff;
  border-radius: 3px;
  resize: none;
  outline: none !important;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    background-color: #0194a8;
  }
`;

styles.FbUploadBtn = styled.button`
  flex: 1;
  padding: 4px 22px 7px 10px;
  padding: ${props => props.padding};
  border: ${props => props.border};
  border: ${props => props.border};
  margin: ${props => props.margin};
  text-indent: 0;
  white-space: nowrap;
  cursor: pointer;
  font: bold 14px 'Roboto', sans-serif;
  color: #fff;
  border-radius: 3px;
  resize: none;
  outline: none !important;
  text-decoration: none;
  height: 28px;
  background: ${props =>
    props.bakGndColor + (props.useBackground ? ' url(https://img2.shaadi.com/imgs/registration/fb-btnicon.jpg) no-repeat' : '')};
  &:hover {
    background-color: ${props => props.onHoverBakGndColor};
  }
`;

styles.FbUploadBtnIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 20px;
  vertical-align: middle;
  margin: 0 9px 0 0;
  ${props =>
    props.showIcon ? 'background: url(https://img2.shaadi.com/assests/2016/images/privacy-case-v3.png) no-repeat left -186px;' : ''};
  ${props => (props.fbBorder ? 'border-right:1px solid #4d68a4; ' : '')};
`;

styles.PhotoPrivateMsg = styled.div`
  font-size: 12px;
`;

export default styles;
