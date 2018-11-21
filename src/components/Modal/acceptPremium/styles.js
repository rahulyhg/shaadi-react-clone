import styled, { keyframes } from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

const zoomIn = keyframes`
  from{
   opacity: 0;
 }
 to {
   opacity: 1;
 }
`;

styles.RequestFlash = styled.div`
  padding-left: 18px;
  font-size: 12px;
  border-right: 1px solid #eee;
  padding-right: 5px;
  margin-right: 5px;
  background: ${props =>
    ['error', 'fail'].includes(props.icon)
      ? 'url(/assets/fail.png) no-repeat 0px 0px'
      : ['loading'].includes(props.icon)
        ? 'url(/assets/spinner.gif) no-repeat 0px 0px'
        : ['success'].includes(props.icon) ? 'url(/assets/success.png) no-repeat 0px 0px' : 'transparent'};
`;
styles.DraftBtn = styled.button`
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: ${props => (props.isActive ? '#00bcd5' : '#b1b3b9')};
  font-size: 12px;
  text-decoration: none;
  padding-right: 5px;
  margin-right: 5px;
  font-weight: 300;
  letter-spacing: 0.1px;
`;
styles.DraftBtnDivider = styled.span`
  border-left: 1px solid #e5e6e9;
  font-size: 13px;
  position: relative;
  left: -5px;
  width: 1px;
  height: 10px;
  top: 0;
  margin: 0 5px;
`;
styles.HistoryWrap = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 33px;
`;
styles.SmallPhotoWrap = styled.div`
  flex: 1 0 39px;
`;
styles.ChatIconWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
styles.ChatIcon = styled.div`
  width: 39px;
  height: 31px;
  background: url(/assets/no-chat.png) no-repeat center center;
  display: inline-block;
`;
styles.FromMessageWrap = styled.div`
  background: #f8f8f8;
  position: relative;
  display: flex;
  padding: 9px 0 9px 11px;
  margin: 0 15px 0 0;
  border-radius: 15px 15px 15px 0;
  font-size: 13px;
  width: 440px;
  max-height: ${props => (props.showMore ? '780px' : '20px')};
`;
styles.FromMessage = styled.div`
  max-height: ${props => (props.showMore ? '780px' : '20px')};
  white-space: ${props => (props.showMore ? 'normal' : 'nowrap')};
  text-overflow: ${props => (props.showMore ? 'unset' : 'ellipsis')};
  overflow: ${props => (props.showMore ? 'visible' : 'hidden')};
  transition: 1s linear max-height;
  text-align: left;
  max-width: ${props => (props.showMore ? '478px' : '350px')};
  min-height: 90px;
  font: 300 14px/18px 'Roboto', sans-serif;
  margin-right: 10px;
  letter-spacing: 0.1px;
`;
styles.DraftReadMore = styled.span`
  letter-spacing: 0.1px;
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  position: absolute;
  display: flex;
  flex: 1;
  white-space: nowrap;
  bottom: 5px;
  right: 15px;
`;
styles.DraftReadMoreFrom = styled.span`
  letter-spacing: 0.1px;
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  position: absolute;
  display: flex;
  flex: 1;
  white-space: nowrap;
  bottom: 10px;
  right: 15px;
`;
styles.DraftListWrap = styled.div`
  position: absolute;
  left: 124px;
`;
styles.UpArrow = styled.span`
  background: url(/assets/draft-message-arrow.svg) left top no-repeat;
  width: 17px;
  height: 17px;
  position: absolute;
  top: 9px;
  right: 55px;
  display: inline-block;
  z-index: 1000;
`;
styles.DraftList = styled.ul`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  border: 1px solid #cdced1;
  border-radius: 10px;
  position: absolute;
  top: 20px;
  right: -88px;
  z-index: 999;
  background: #fff;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.05);
  padding: 0;
  width: 532px;
  min-height: 45px;
  list-style: none;
  margin: 0;
`;
styles.LayerWrap = styled.div`
  position: relative;
`;
styles.CloseIcon = styled.button`
  background: url(/assets/white-layer-close.png) center center no-repeat;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
  padding: 15px;
  border: 0;
  outline: 0;
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
styles.MonetizationWrap = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  width: 620px;
  position: relative;
  z-index: 3;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.21);
  border-radius: 3px;
  background: #fff;
  text-align: center;
  overflow: hidden;
`;
styles.TopSectionWrap = styled.div`
  background: linear-gradient(115deg, #88c86c 0%, #20bccf 100%);
  height: 270px;
  border-radius: 3px 3px 80% 80%;
  color: #fff;
  width: 716px;
  position: absolute;
  left: -47px;
`;
styles.LayerTitle = styled.div`
  background: url(/assets/it-s-an-accept.png) center top no-repeat;
  height: 55px;
  margin: 30px 0 0;
`;
styles.TopMsg = styled.div`
  padding: 1px 0 24px;
  font-size: 16px;
  font-weight: 400;
`;
styles.LayerLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  outline: 0;
`;
styles.NameBg = styled.span`
  display: inline-block;
  max-width: 174px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: text-top;
`;
styles.PhotoWrap = styled.div`
  display: flex;
  justify-content: center;
`;
styles.ProfilePhoto = styled.div`
  width: 90px;
  height: 90px;
  background: #d7d7d7 ${props => `url(${props.profilePhoto}) center top/cover no-repeat`};
  animation: ${zoomIn} 1s;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
`;
styles.ProfilePhotoSmall = styles.ProfilePhoto.extend`
  width: 39px;
  height: 39px;
  animation: unset;
  left: 0;
  border: none;
  box-shadow: none;
  position: relative;
`;
styles.ProfileName = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.26px;
  margin: 10px 0 0;
`;
styles.BtmSection = styled.div`
  padding: 290px 60px 25px 60px;
  width: 525px;
`;
styles.MsgTopUtilWrap = styled.div`
  display: flex;
  min-height: 28px;
  padding: 0 66px 6px 0px;
  font-family: Roboto;
  font-weight: 300;
  align-items: center;
`;
styles.MsgLabel = styled.div`
  color: #72727d;
  font-size: 14px;
  flex: 1;
  text-align: left;
  font-size: 16px;
  letter-spacing: 0.1px;
`;
styles.SavedMsgLinkWrap = styled.div`
  width: 138px;
  height: 25px;
  border-radius: 14px;
  border: 1px solid #e3e3e3;
  background-color: ${props => (props.isVisible ? '#ececec' : '#fff')};
  position: relative;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    background-color: #ececec;
  }
`;
styles.SavedMsgLink = styled.span`
  color: #00bcd5;
  font-size: 12px;
  display: flex;
  align-items: center;
  line-height: 25px;
  cursor: pointer;
  justify-content: center;
  letter-spacing: 0.1px;
`;
styles.DraftDropDown = styled.span`
  background: url(/assets/dropdown-arrow.png) no-repeat left top;
  display: inline-block;
  width: 9px;
  height: 6px;
  margin-left: 6px;
  transform: rotate(${props => (props.isVisible ? '180deg' : '0deg')});
`;
styles.TextAreaWrap = styled.div`
  display: flex;
`;
styles.SelfPhotoSmall = styled.div`
  width: 39px;
  height: 39px;
  position: relative;
  left: 10px;
  top: 60px;
  border: none;
  box-shadow: none;
  border-radius: 50%;
  background: #d7d7d7 ${props => `url(${props.profilePhoto}) center top/cover no-repeat`};
`;
styles.DraftBtnsWrapper = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  justify-content: space-between;
  color: #95959d;
  font: 400 14px 'Roboto', sans-serif;
  border-bottom: 0;
  position: relative;
  padding: 10px 0;
`;
styles.SendMsgButton = styled.button`
  width: 135px;
  height: 36px;
  box-shadow: 0 5px 9px rgba(10, 226, 255, 0.39);
  border-radius: 36px;
  background-image: linear-gradient(180deg, #60cdd4 0%, #00bbd5 100%);
  border: 0;
  color: #ffffff;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0.2px;
  margin-top: 20px;
`;

export default styles;
