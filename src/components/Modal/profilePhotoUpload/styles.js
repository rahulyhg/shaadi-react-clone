import styled from 'styled-components';

const styles = {};

styles.UploadProgressWrap = styled.div`
  border-bottom: solid 1px #ccc;
  height: 204px;
  overflow-y: auto;
`;
styles.ProgressContainer = styled.div`
  padding: 6px 11px;
  background-color: #f6f6f6;
  &:nth-child(even) {
    background: #fff;
  }
`;
styles.ProgressFileName = styled.div`
  font: normal 12px arial;
  color: #555;
  height: 14px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 3px;
`;
styles.ProgressFileDetail = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: ${props => (props.failed ? '#d60000' : '#72727d')};
  font: normal 10px arial;
`;
styles.ProgressBarWrp = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.ProgressBarStatus = styled.div`
  width: ${props => (props.progressPercent ? `${props.progressPercent}%` : '10%')};
  height: 8px;
  background-color: #a9d027;
  margin-top: 5px;
  border-radius: 3px;
`;
styles.UploadPhotoLayer = styled.div`
  display: block;
  width: ${props => (props.isHelpMeLayer ? '365px' : '588px')};
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
`;
styles.UploadImgBlock = styled.div`
  display: block;
  background: #fff;
  position: relative;
  border: solid 1px #e3e1d2;
`;
styles.LoadImgBlock = styled.div`
  margin: 15px;
  border: 1px solid #d9e4ff;
`;
styles.UploadPhotoLayerFooter = styled.div`
  margin: 15px 0;
  text-align: center;
`;
styles.UploadPhotoLayerBtn = styled.button`
  font: bold 14px arial;
  color: #fff;
  background: ${props => (props.uploading ? '#ddd' : '#00bcd5')};
  border: 1px solid ${props => (props.uploading ? '#ddd' : '#00bcd5')};
  border-radius: 3px;
  outline: 0;
  padding: 5px 10px;
  display: inline-block;
  &:hover {
    background: ${props => (props.uploading ? '#ddd' : '#0194a8')};
    border: 1px solid ${props => (props.uploading ? '#ddd' : '#0194a8')};
  }
`;

export default styles;
