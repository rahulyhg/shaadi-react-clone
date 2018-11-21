import styled from 'styled-components';

const styles = {};

styles.FirstPhotoUploadWrapper = styled.div`
  background: #fff none repeat scroll 0 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 15px 14px 24px;
  text-align: center;
  width: 746px;
  position: relative;
`;
styles.Content = styled.div`
  display: block;
  background: #fff;
  padding: 20px 15px;
  position: relative;
  border-radius: 0 0 3px 3px;
`;
styles.ProfileHeading = styled.div`
  color: #72727d;
  font: 24px/25px arial;
  padding: 0 0 4px;
  text-align: center;
`;
styles.LayerCloseBtn = styled.div`
  width: 30px;
  height: 30px;
  background: url(/assets/reg-layer-close.png) no-repeat 7px 7px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:hover {
    background: url(/assets/reg-layer-close.png) no-repeat 7px -24px;
  }
`;
styles.PhotoAcceptMember = styled.div`
  color: #72727d;
  font: 16px/17px arial;
  padding: 0 0 42px;
  text-align: center;
`;
styles.PhotoBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 584px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 3px;
  cursor: pointer;
`;
styles.ActivePhotoUploadBtn = styled.button`
  color: #fff;
  text-decoration: none;
  outline: 0;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  display: inline-block;
  width: 255px;
  height: 38px;
  text-align: center;
  border-radius: 3px;
  font: bold 16px/38px arial;
  box-sizing: border-box;
  &:hover {
    background: #0194a8;
    border-color: #0194a8;
  }
`;
styles.SendPhotoDivider = styled.div`
  background: url(/assets/btn-divider.jpg) no-repeat left bottom;
  display: inline-block;
  width: 2px;
  height: 40px;
  margin: 0 16px;
`;
styles.DisabledPhotoUploadBtn = styled.div`
  border: 1px solid #bebebe;
  border-radius: 3px;
  box-shadow: 0 1px 0 #fff inset;
  color: #b1b3b9;
  text-decoration: none;
  outline: 0;
  background: #eaeaea;
  display: inline-block;
  width: 264px;
  height: 38px;
  text-align: center;
  border-radius: 3px;
  font: bold 16px/38px arial;
  box-sizing: border-box;
  &:hover {
    background: #e2e1e1;
    border-color: #bebebe;
  }
`;

export default styles;
