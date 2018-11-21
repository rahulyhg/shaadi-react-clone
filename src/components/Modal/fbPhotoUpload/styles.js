import styled from 'styled-components';

const styles = {};

styles.FBTabWrap = styled.div`
  flex: 1 0 182px;
  border-bottom: 1px solid #e8e8e8;
`;
styles.FBTabTitle = styled.div`
  font: bold 16px/21px arial;
  color: #72727d;
  padding: 15px 0 14px 19px;
  background: #f1f1f2;
  border-right: 1px solid #dfe0e3;
  border-bottom: 1px solid #dfe0e3;
  text-shadow: 0 1px 1px #fff;
`;
styles.FBTabList = styled.div``;
styles.FBTabListItem = styled.div`
  color: #72727d;
  padding: 10px 0 8px 14px;
  background: ${props => (props.isActiveTab ? '#fff' : '#f1f1f2 ')};
  border-top: 1px solid ${props => (props.isActiveTab ? '#dbdbdb ' : '#fff')};
  border-left: 5px solid ${props => (props.isActiveTab ? '#ff5a60 ' : '#f1f1f2 ')};
  border-right: ${props => (props.isActiveTab ? 'none' : '1px solid #dfe0e3 ')};
  border-bottom: 1px solid ${props => (props.isActiveTab ? 'transparent' : '#dfe0e3 ')};
  cursor: pointer;
  box-shadow: 0 -1px 1px #ebebeb, 0 -1px 1px #ebebeb;
  display: flex;
  align-items: center;
  &:hover {
    background: ${props => (props.isActiveTab ? '#fff' : '#eee')};
    border-top: 1px solid ${props => (props.isActiveTab ? '#dfe0e3 ' : '#fff')};
    border-right: ${props => (props.isActiveTab ? 'none' : '1px solid #f1f1f2 ')};
    border-bottom: 1px solid transparent;
    border-left: 5px solid #ff5a60;
  }
`;
styles.FBTabLabel = styled.div`
  font: normal 12px arial;
  color: #00bcd5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  width: 117px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
styles.FBTabCountWrap = styled.div`
  width: 22px;
  margin: 0 24px 0 0;
  background: #fff;
  position: relative;
  border-radius: 3px;
`;
styles.FBTabCount = styled.div`
  border: 1px solid #dedede;
  border-radius: 3px;
  font: bold 11px arial;
  color: #72727d;
  text-align: center;
  box-shadow: 0 1px 0 #fff;
  padding: 4px;
`;
styles.FBTabCountArrow = styled.div`
  background: url(/assets/arr-left.gif) no-repeat left top;
  width: 4px;
  height: 8px;
  position: absolute;
  top: 7px;
  left: -3px;
`;
styles.FBThumbnailWrap = styled.div`
  flex: 1 0 563px;
  padding: 20px 5px 19px 20px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
`;
styles.FBLoader = styled.div`
  background: url(/assets/reg-loader.gif) no-repeat center center;
  width: 563px;
  height: 352px;
`;
styles.FBAlbumContainer = styled.div`
  display: block;
`;
styles.FBPhotoWrap = styled.div`
  display: inline-block;
  height: 88px;
  border: 5px solid #fff;
  cursor: pointer;
  box-shadow: ${props => (props.isSelectedThumbNail ? '0 0 8px #bbb' : '0 0 7px #fff')};
  margin: 5px;
  position: relative;
`;
styles.FBThumbnail = styled.div`
  ${props => (props.fbImageURL ? `background: url(${props.fbImageURL}) no-repeat center 25%;` : '')} background-size: cover;
  width: 117px;
  height: 88px;
`;
styles.FBThumbnailInputIcon = styled.span`
  display: inline-block;
  background: url(/assets/photo-tick-icon.png) no-repeat left -36px;
  width: 35px;
  height: 34px;
  border: none;
  position: absolute;
  right: 2px;
  bottom: 2px;
  cursor: pointer;
  outline: 0;
`;
styles.FBPuploadWrap = styled.div`
  display: block;
  width: 800px;
`;
styles.FBImportPhotoWrap = styled.div`
  background: #fff;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border-radius: 3px;
  position: relative;
  text-align: left;
  cursor: auto;
`;
styles.FBPuploadTitle = styled.div`
  flex: 1;
  font: bold 18px arial;
  color: #51505d;
`;
styles.FBImportPhotoTitle = styled.div`
  text-align: center;
  font: normal 20px arial;
  color: #51505d;
  padding: 22px 0;
`;
styles.FBContentWrap = styled.div`
  display: flex;
`;
styles.FBUploadBtnWrap = styled.div`
  background: #f1f1f2;
  padding: 15px 0 18px;
  text-align: center;
`;
styles.FBUploadBtn = styled.button`
  color: #fff;
  background: #00bcd5 url(/assets/button-arrow.png) no-repeat 95px center;
  border: 1px solid #00bcd5;
  font: bold 16px arial;
  padding: 6px 32px 6px 18px;
  transition: all 300ms ease;
  border-radius: 3px;
  outline: 0;
  text-decoration: none;
  &:hover {
    background: #0194a8 url(/assets/button-arrow.png) no-repeat 95px center;
    border: 1px solid #0194a8;
  }
`;

export default styles;
