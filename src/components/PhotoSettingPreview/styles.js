import styled from 'styled-components';
import '../../theme/roboto.css';

const styles = {};

styles.privacyRightWrap = styled.div`
  width: 342px;
  background: #f2f2f2;
  border-radius: 3px;
  text-align: center;
  margin: 9px 2px 20px 0;
  padding: 20px 0;
  position: relative;
`;

styles.PhotoScreened = styled.div`
  width: 342px;
  background: #f2f2f2;
  border-radius: 3px;
  text-align: center;
  margin: 9px 2px 20px 0;
  padding: 20px 0;
  position: relative;
`;

styles.PrivacyPhoto = styled.div`
  background: #fff;
  height: 200px;
  width: 150px;
  border: 1px solid #d4d4d4;
  padding: 5px;
  box-shadow: 0 0 4px 0 #e6e6e6;
  margin: 8px auto 0;
  position: relative;
`;

styles.PhotoUnderScreeningWrap = styled.div`
  width: 342px;
  background: #f2f2f2;
  border-radius: 3px;
  text-align: center;
  margin: 9px 2px 20px 0;
  padding: 20px 0;
  position: relative;
`;

styles.PrivacyPhotoTitle = styled.div`
  font-family: 'Axure Handwriting';
  font-style: italic;
  color: #51505d;
  font-size: 13px;
  font-weight: 400;
`;

styles.IllustrativePhoto = styled.div`
  width: 96px;
  text-align: center;
  font: normal 11px arial;
  color: #72727d;
  display: inline-block;
  vertical-align: middle;
  margin: 14px 0 0;
  padding: 108px 0 0;
  background: url(https://img2.shaadi.com/community/images/photo/original-photo-${props => props.genderPrefix}.png) no-repeat left top;
`;

styles.PhotoScreeningArrow = styled.div`
  background: url(/assets/privacy-photo-arrow.png) no-repeat center top;
  left: 297px;
  top: 41px;
  position: absolute;
  width: 43px;
  height: 70px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

styles.ToRightCurveArrow = styled.div`
  background: url(https://img2.shaadi.com/community/images/photo/privacy-photo-screening-arrow.png) no-repeat center top;
  width: 82px;
  height: 16px;
  display: inline-block;
  padding: 0 12px;
  vertical-align: top;
  margin: 44px 0 0;
`;

styles.IllustrativeBlurPhoto = styles.IllustrativePhoto.extend`
  position:relative;
  background: url(https://img2.shaadi.com/assests/2017/images/blur-photo-pwd-protected-${props =>
    props.genderPrefix}-new.png) no-repeat left top;
`;

styles.PhotoScreeningNote = styled.div`
  background: transparent;
  border-top: 1px dotted #cdced1;
  color: #72727d;
  font: normal 11px arial;
  text-align: left;
  margin: 13px 0 -12px;
  padding: 7px 0 0 10px;
`;

styles.PhotoLockIcon = styled.div`
  left: 6px;
  top: 20%;
  background: url(/assets/privacy-setting-new-lock.png) no-repeat center -89px;
  width: 22px;
  height: 30px;
  position: absolute;
  width: 100%;
  display: block;
`;

styles.PhotoScreeningText = styled.div`
  color: #fff;
  position: absolute;
  top: 48%;
  text-align: center;
  left: 0;
  width: 100%;
  font-size: 10px;
  text-shadow: 0 1px 2px #000;
`;

styles.PhotoScreenedLock = styled.div`
  background: url(/assets/privacy-setting-new-lock.png) no-repeat left 0;
  height: 38px;
  position: absolute;
  width: 31px;
  left: 64px;
  top: 74px;
  display: block;
  font-family: 'Roboto', sans-serif !important;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

styles.PrivacyPhotoWrap = styled.div`
  display: flex;
`;

styles.PrivacyVisibleText = styled.div`
  top: 115px;
  width: 150px;
  font: normal 14px arial;
  white-space: pre-wrap;
  color: #fff;
  position: absolute;
  text-align: center;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.75);
`;

styles.PrivacyPhotoVisible = styled.div`
  font-size: 10px;
  margin: 19px auto 0;
  margin-top: ${props => (props.showTopMargin ? '19px' : '0')};
`;

styles.blurPhotoWrap = styled.div`
  overflow: hidden;
`;

export default styles;
