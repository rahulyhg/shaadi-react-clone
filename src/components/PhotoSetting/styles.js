import styled from 'styled-components';

const styles = {};

styles.PhotoSettingWrap = styled.div`
  display: flex;
`;

styles.PhotoSetContaint = styled.div`
  clear: both;
  padding: 8px 3px 8px 8px;
  width: 375px;
  display: inline-block;
`;

styles.PhotoSettingPreviewWrap = styled.div`
  display: inline-block;
`;

styles.PhotoHead = styled.div`
  color: #72727d;
  font-size: 18px;
  margin: 15px 0 21px;
`;

styles.privacyLeftWrap = styled.div``;

styles.PhotoLabel = styled.label`
  position: relative;
`;

styles.VisibleMember = styled.input`
  margin: 0 5px 0 0;
  padding: 0;
  vertical-align: middle;
  outline: none;
`;

styles.VisibleMemberText = styled.span`
  font: normal 12px arial;
  color: #72727d;
`;

styles.RecommendedImg = styled.span`
  background: url(/assets/recommended.png) no-repeat left top;
  width: 94px;
  height: 23px;
  display: inline-block;
  position: absolute;
  top: -1px;
  left: 141px;
`;

styles.SaveSettingBtn = styled.div`
  border-radius: 3px;
  box-shadow: none;
  font: bold 14px arial;
  padding: 10px 16px;
  display: inline-block;
  margin: 12px 0 0;
  cursor: ${props => (props.isDisabled ? 'default' : 'pointer')};
  background: ${props => (props.isDisabled ? '#f1f1f2' : '#00bcd5')};
  color: ${props => (props.isDisabled ? '#cdced1' : '#fff')};
  &:hover {
    background: ${props => (props.isDisabled ? '#f1f1f2' : '#0194a8')};
  }
`;

styles.privacyPhotoArrow = styled.div`
  background: url(/assets/privacy-photo-arrow.png) no-repeat left top;
  position: absolute;
  width: 43px;
  height: 70px;
  left: 283px;
  top: 41px;
`;

styles.PrivacyPhotoWrap = styled.div`
  display: flex;
`;

styles.MoreWrap = styled.div`
  display: inline-block;
  margin: 0 0 0 -9px;
`;

styles.MorePhotoDivider = styled.span`
  color: #dfe0e3;
  margin: 0 3px 0 5px;
`;

styles.PrivacyLink = styled.a`
  color: #b1b3b9;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

styles.PhotoRadioWrap = styled.div`
  display: 'block';
  margin: 5px 0;
  height: 19px;
  position: relative;
`;

styles.onSaveMessage = styled.div`
  width: 146px;
  text-align: left;
  margin-top: ${props => (props.isVisible ? '10px' : 0)};
  height: ${props => (props.isVisible ? '14px' : 0)};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: all 2.5s;
  font-size: 12px;
`;

styles.tooltipWrap = styled.span`
  margin: 0 0 0 -3px;
`;

export default styles;
