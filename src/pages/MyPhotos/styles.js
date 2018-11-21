import styled from 'styled-components';
import Link from '../../components/Common/Link';

const s = {};

s.img = styled.img`
  border: 0;
`;

s.MyPhotoPageWrap = styled.div`
  display: flex;
  width: 960px;
  min-height: 400px;
  position: relative;
  padding-top: ${props => `${props.topSpace}px`};
  margin: ${props => (props.isChatOpen ? `0 auto 0 ${(props.windowWidth - 1207) / 2}px` : '0 auto')};
`;

s.ColorBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.6;
`;

s.LoadingIndicator = styled.div`
  position: relative;
  top: 250px;
  width: 252px;
  z-index: 1;
  border: 2px solid #ccccce;
  font: bold 18px arial;
  color: #444;
  text-align: center;
  border-radius: 10px;
  min-width: 222px;
  padding: 0 15px;
  background: #f6f6f6;
  margin: 0 auto;
`;

s.LoadingIcon = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  margin: 12px 3px 12px 8px;
  vertical-align: middle;
  background-image: url(/assets/loader-big.gif);
`;

s.LoadingText = styled.span`
  display: inline-block;
  vertical-align: middle;
  color: #72727d;
  font: normal 18px/52px arial;
`;

s.NoMoreMatches = styled.div`
  padding: 14px 0 25px;
  font: normal 18px arial;
  color: #72727d;
  text-align: center;
  margin: 0 auto;
`;

s.searchLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
`;

s.ContentArea = styled.div`
  width: 730px;
`;

s.PageHead = styled.div`
  font: normal 18px arial;
  color: #72727d;
  padding: 12.5px 0px;
`;

s.LoaderBar = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 25px;
`;

s.PhotoWrap = styled.div`
  background: #fff;
  border-radius: 0 0 3px 3px;
  box-shadow: ${props => (props.showBoxShadow ? '0 1px 2px rgba(43, 59, 93, 0.29)' : 'none')};
  margin: 0 0 20px;
  min-height: 376px;
`;

s.SubtabsWrap = styled.div`
  height: 40px;
  padding-top: 0;
  border-radius: 3px 3px 0 0;
`;

s.SubtabsUl = styled.ul`
  padding: 0;
  display: flex;
  border-bottom: 1px solid #00bcd4;
  margin: 0;
`;

s.SubtabsLi = styled.li`
  display: block;
  font: bold 14px arial;
  margin: 0 0 0 8px;
`;

s.SubtabsLink = styled(Link)`
  display: inline-block;
  font: bold 14px arial;
  padding: 11px 12px 3px;
  height: 23px;
  background: #fff;
  border-bottom: 2px solid ${props => (props.isActive ? '#00bcd5' : '#fff')};
  color: ${props => (props.isActive ? '#00bcd5' : '#72727d')};
  cursor: pointer;
  text-decoration: none;
  outline: none;
  &:hover {
    border-bottom: 2px solid #00bcd5;
    height: 23px;
  }
`;

s.clear = styled.div`
  clear: both;
`;

s.UploadPhotosTxt = styled.div`
  font-size: 18px;
  margin: ${props => props.margin};
`;

s.PhotoMainWrap = styled.div`
  padding: 5px 27px 15px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

s.PhotoHeading = styled.div`
  font-size: 30px;
  text-align: center;
  padding: 50px 0 19px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

s.UploadBtnWrap = styled.div`
  display: flex;
  width: 616px;
  margin: 30px auto 0;
`;

s.UploadphotoBlock = styled.div`
  width: 250px;
  background: #ecf9fa;
  border: 1px solid #b2e6e9;
  text-align: center;
  border-radius: 3px;
  padding: 18px 10px;
  float: left;
  font-size: 14px;
  color: #72727d;
  > span:nth-child(1) {
    margin: 0 0 12px;
    display: block;
  }
`;

s.PhotoOr = styled.div`
  width: 64px;
  text-align: center;
  font-size: 18px;
  line-height: 94px;
  color: #b1b3b9;
`;

s.FbphotoBlock = styled.div`
  width: 250px;
  background: #edeff4;
  border: 1px solid #c4cde0;
  text-align: center;
  border-radius: 3px;
  padding: 18px 10px;
  font-size: 14px;
  color: #475a71;
  > span:nth-child(1) {
    margin: 0 0 12px;
    display: block;
  }
`;

s.NoteTxt = styled.div`
  color: #9a9a9a;
  font: normal 11px/14px arial;
  text-align: center;
  margin: 14px 0 47px;
`;

s.NoteLink = styled.div`
  color: #00bcd5;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

s.OtherWaymain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto 35px;
`;

s.OtherWay = styled.div`
  font: normal 12px/18px arial;
  display: flex;
  a {
    color: #00bcd5;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

s.EmailIcon = styled.div`
  background: url(/assets/icon-set.gif) no-repeat left top;
  height: 19px;
  padding: 0 20px 0 0;
  margin: 0 5px 0 0;
`;

s.PiostIcon = styled.div`
  background: url(/assets/icon-set.gif) no-repeat -26px 3px;
  height: 19px;
  padding: 0 20px 0 0;
  margin: 0 5px 0 0;
`;

s.PhotoGuideline = styled.div`
  width: 584px;
  margin: 22px auto 15px;
  display: flex;
`;

s.PhotoShadow = styled.div`
  background: linear-gradient(to right, rgba(243, 243, 243, 1) 0%, rgb(236, 233, 233) 51%, rgba(243, 243, 243, 1) 100%);
  width: 70%;
  height: 2px;
  margin: 0 auto;
`;

s.LeftGuideline = styled.div``;

s.PhotosUpload = styled.div`
  font: normal 12px arial;
  color: #72727d;
  display: flex;
  margin: 0 0 4px;
  &:before {
    content: '';
    display: block;
    padding: 0 10px 0 5px;
    background: url(/assets/icon-green-tick.gif) no-repeat 5px top;
    width: 21px;
    height: 21px;
  }
`;

s.ImgContainer = styled.div`
  text-align: center;
  width: 86px;
  margin: 0 9px 10px 0;
  font-size: 11px;
  img {
    margin: 0 0 2px;
  }
`;

s.ImgMainContainer = styled.div`
  display:flex;
    &:after {
      content: '';
      background: linear-gradient(to bottom,rgba(243,243,243,1) 0%,rgb(224, 220, 220) 51%,rgba(243,243,243,1) 100%);
      width: 1px;
      height: 68px;
      display: block;
      margin: 3px 0 0;
`;

s.ImgMainContainerNext = styled.div`
  display: flex;
  margin: 8px 0 0;
`;

s.RightGuideline = styled.div`
  margin: 0 0 0 12px;
`;

s.PhotosCancel = styled.div`
  font: normal 12px arial;
  color: #72727d;
  display: flex;
  margin: 0 0 4px;
  &:before {
    content: '';
    display: block;
    padding: 0 10px 0 5px;
    background: url(/assets/icon-cross.gif) no-repeat 5px top;
    width: 16px;
    height: 17px;
  }
`;

s.PhotosFaq = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #72727d;
  font-size: 12px;
  cursor: pointer;
  a {
    color: #00bcd5;
    font: normal 12px arial;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

s.Links = styled.a`
  display: flex;
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

s.MessageLayerMain = styled.div`
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  width: 707px;
`;

s.MessageLayerClose = styled.div`
  cursor: pointer;
  display: block;
  width: 20px;
  height: 20px;
  margin: 0;
  position: absolute;
  right: 18px;
  top: 23px;
`;

s.MessageLayerCloseLink = styled.a`
  display: block;
  width: 20px;
  height: 20px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/big-close-v2.png) no-repeat left -207px;
`;

s.MessageHead = styled.div`
  color: #51505d;
  padding: 19px 0 20px 15px;
  font: bold 18px arial;
  margin: 0;
  position: relative;
  background: #f1f1f2;
  border-radius: 3px 3px 0 0;
`;

s.PhotosUploadWrap = styled.div`
  display: flex;
  margin: 9px 0 0;
`;

s.PhotosLayerWrap = styled.div`
  padding: 0 20px;
`;

s.PhotosUploadLeft = styled.div`
  margin: 0 0 0 31px;
  height: 132px;
  width: 246px;
  border-right: 1px solid #e2e2e2;
`;

s.PhotosUploadRight = styled.div`
  margin: 0 0 0 31px;
`;

s.PhotosCanUpload = styled.div`
  background: url(/assets/guidelines-photo.png) no-repeat left top;
  padding: 0 0 0 24px;
  margin: 0 0 10px;
  height: 18px;
  font: normal 14px/17px arial;
  color: #72727d;
  text-transform: uppercase;
`;

s.PhotosUploadRightWrap = styled.div`
  display: flex;
`;

s.PhotosCanotUpload = styled.div`
  background: url(/assets/guidelines-photo.png) no-repeat left -24px;
  padding: 0 0 0 24px;
  margin: 0 0 10px 33px;
  height: 18px;
  font: normal 14px/17px arial;
  color: #72727d;
  text-transform: uppercase;
`;

s.photoView = styled.div`
  margin: 0 0 0 26px;
  display: flex;
`;

s.CloseupWrapper = styled.div`
  text-align: center;
  width: 70px;
  margin: 7px 5px 0;
  font: normal 14px/17px arial;
  color: #b1b3b9;
`;

s.PhotoGuidelinePic = styled.div`
  background-image: url(/assets/guidelines-photo.png);
  background-repeat: no-repeat;
  background-position: left ${props => (props.gender === 'male' ? props.backgroundLeftMale : props.backgroundLeftFemale)};
  width: 60px;
  height: 60px;
  margin: 0 auto 7px;
`;

s.GuidelinesBg = styled.div`
  background: #fff;
  width: auto;
  padding: 20px 0;
  position: relative;
  border-radius: 0 0 3px 3px;
`;

s.guidelineGreyBg = styled.div`
  margin: 20px 0 0;
  padding: 20px 20px 20px 17px;
  background: #f3f3f3;
`;

s.guidelineHdOne = styled.div`
  background: url(/assets/guidelines-photo.png) no-repeat -3px -52px;
  height: 22px;
  padding: 0 0 0 25px;
  margin: 0 0 0 3px;
  font: bold 14px/16px arial;
  color: #72727d;
`;

s.guidelineHdTwo = styled.div`
  background: url(/assets/guidelines-photo.png) no-repeat left -80px;
  height: 23px;
  padding: 0 0 0 28px;
  font: bold 14px/16px arial;
  color: #72727d;
  margin: 27px 0 0;
`;

s.guidelineNote = styled.div`
  background: #fffcdc;
  padding: 6px 10px;
  margin: 15px 0 0;
  font: normal 12px/16px arial;
  color: #72727d;
  border-radius: 3px;
  box-shadow: 0 1px 0 #e7dfc0;
`;

s.GuidelineText = styled.span`
  font: normal 14px/16px arial;
  margin: 0;
  width: 608px;
  padding: 0;
  color: #72727d;
  vertical-align: top;
  display: flex;
  margin: 12px 0 0 3px;
  &:before {
    content: '';
    display: block;
    background: url(/assets/guidelines-photo.png) no-repeat left -104px;
    width: 25px;
    height: 20px;
    vertical-align: top;
  }
`;

s.PhotoUploadMain = styled.div`
  margin: 15px 0 0;
  position: relative;
`;

s.PhotoUploadWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

s.UploadImgWrap = styled.div`
  position: relative;
  border: 1px solid #dcdcdc;
  height: 167px;
  width: 125px;
  margin: 0 0 5px;
  padding: 5px;
`;

s.ImgWrap = styled.div`
  position: relative;
  width: 125px;
  height: 167px;
  overflow: hidden;
  background: #f1f1f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

s.Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

s.PhotoUpload = styled.div`
  height: 220px;
  margin-right: 42px;
  &:nth-child(4n) {
    margin-right: 0;
  }
`;

s.captionWrap = styled.div`
  font: normal 12px arial;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3px 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

s.photoStatusMsg = styled.div`
  font: normal 12px arial;
  display: ${props => (props.tooltipVisible ? 'inline-flex' : 'flex')};
  justify-content: center;
  ${props => (props.tooltipVisible ? 'padding-left: 7px' : '')};
`;

s.DropdownWrap = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: ${props => (props.extendWidth ? '134px' : '100%')};
  position: absolute;
  right: 5px;
  top: 8px;
`;

s.ImgOverlay = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-color: #000;
`;

s.InvalidWrap = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  font: normal 11px arial;
  color: #fff;
  cursor: pointer;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

s.Invalid = styled.a`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
`;

s.ArrowWrap = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: 0.4;
  background-color: #000;
`;

s.Arrow = styled.button`
  position: absolute;
  top: 5px;
  right: 6.5px;
  border: 1px solid #fff;
  border-width: 0 2px 2px 0;
  padding: 3px 2px 2px 3px;
  background: transparent;
  cursor: pointer;
  z-index: 2;
  transform: rotate(
    ${props =>
      ({
        up: -135,
        down: 45,
        left: -45,
        right: 135,
      }[props.arrow])}deg
  );
  &:focus {
    outline: none;
  }
`;

s.photoDownbox = styled.div`
  background: #fff;
  margin: 3px 0 0;
  box-shadow: 0 6px 20px rgba(43, 59, 93, 0.45);
  border-radius: 3px;
  position: relative;
  z-index: 1;
  > ul:nth-child(1) {
    padding: 6px;
    margin: 0;
    text-align: left;
    z-index: 999;
    > li:nth-child(n) {
      list-style: none;
      > a:nth-child(n) {
        text-decoration: none;
        padding: 10px;
        margin: 0;
        display: block;
        color: inherit;
        font: normal 12px arial;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
`;

s.PhotoActions = styled.li`
  border: none;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

s.ShaadiTooltip = styled.span`
  position: relative;
  &:active:after {
    content: attr(title);
    padding: 5px;
    border: 1px solid #ccc;
    top: 5px;
    right: 10%;
    background: #bada55;
  }
`;

s.AwaitingPhotoText = styled.div`
  position: absolute;
  left: 4%;
  bottom: 3px;
`;

s.UploadBtnsWithNoteWrap = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

export default s;
