import styled from 'styled-components';

const styles = {};

styles.UploadPhotoLayer = styled.div`
  display: block;
  width: 588px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
`;
styles.CloseIntentModalBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: block;
  width: 20px;
  height: 20px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/big-close-v2.png) no-repeat left -207px;
  &:hover {
    background: url(/assets/big-close-v2.png) no-repeat left -231px;
  }
`;
styles.DeletedWrap = styled.div`
  padding: 16px;
  background: #fff;
  position: relative;
`;
styles.DeletedLayerWrap = styled.div`
  border: solid 1px #e3e1d2;
  background: #fff;
  padding: 15px;
  font: normal 14px arial;
  display: flex;
  align-items: center;
  color: #51505d;
`;
styles.SuccessIcon = styled.div`
  background: url(/assets/success-icon.png) no-repeat left top;
  height: 27px;
  width: 27px;
  margin-right: 8px;
`;
styles.UndoLink = styled.div`
  color: #00bcd5;
  text-decoration: none;
  margin: 0 0 0 12px;
  font: 300 14px arial;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
