import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.ContactDetails = styled.div.attrs({ 'data-contactmodaltype': props => `${props.contactmodaltype}` })`
  color: #72727d;
  font-size: 14px;
  position: relative;
  width: 588px;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  background: #fff;
`;
styles.ContactHeader = styled.div`
  border-radius: 3px 3px 0 0;
  height: 10px;
  background: #39b9c4;
  background: linear-gradient(to right, #39b9c4 0%, #42bbb7 17%, #6ec382 77%, #7cc671 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#39b9c4', endColorstr='#7cc671', GradientType=1);
`;
styles.ContactInner = styled.div`
  padding: 0 20px;
`;
styles.ContactProfileWrp = styled.div`
  display: flex;
  padding: 28px 0 0;
`;
styles.PhotoProfileWrp = styled.div`
  align-items: center;
  margin: 0;
  width: 130px;
`;
styles.PhotoShadowBox = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.16) 0 14px 50px, rgba(0, 0, 0, 0.16) 0 9px 9px;
  border: 2px solid #fff;
`;
styles.PhotoProfileInfo = styled.div`
  align-items: center;
  margin: 0;
  width: 418px;
`;
styles.ContactProfileName = styled.div`
  font: 400 28px 'Roboto', sans-serif;
  color: #51505d;
  padding: 5px 0 4px;
`;
styles.ContactProfileCreated = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  color: #72727d;
  padding: 0 0 12px;
`;
styles.ProfileContent = styled.div`
  color: #72727d;
  font: 300 14px 'Roboto', sans-serif;
  line-height: 18px;
  padding: ${props => (props.isVisible && !props.isTick ? ' 0 0 28px' : '0 0 28px 9px')};
  display: inline-block;
`;
styles.UpgradeBtnWrp = styled.div`
  margin: 18px 0 6px;
`;
styles.UpgradeLink = styled(Link)`
  font: 400 16px 'Roboto', sans-serif;
  line-height: 18px;
  color: #fff;
  display: inline-block;
  padding: 10px 19px;
  border-radius: 3px;
  background: #00bcd5;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  text-decoration: none;
  &:hover {
    background: #0194a8;
  }
`;
styles.ContentLine = styled.p`
  margin: 0;
  font: 300 14px 'Roboto', sans-serif;
`;
styles.ContactCloseModalBtn = styled.button`
  position: absolute;
  overflow: hidden;
  display: block;
  right: 12px;
  width: 40px;
  height: 40px;
  top: 20px;
  border: 0;
  outline: 0;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: url(/assets/close-normal.png) no-repeat 11px 11px;
  &:hover {
    background: rgba(0, 0, 0, 0.08) url(/assets/close-hover.png) no-repeat 11px 11px;
  }
`;
styles.contactBtnWrapper = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 'inherit';
  margin-top: 14px;
  justify-content: flex-start;
`;
styles.SendSMSBtn = styled.button`
  display: inline-block;
  transition: all 300ms ease;
  border: ${props => (props.disabled ? '1px solid #acacac' : '1px solid #00bcd5')};
  border-radius: 3px;
  color: #fff;
  outline: 0;
  font: 400 16px 'Roboto', sans-serif;
  line-height: 34px;
  padding: 0 36px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  background: ${props => (props.disabled ? '#c0c0c0' : '#00bcd5')};
  &:hover {
    background: ${props => (props.disabled ? '#c0c0c0' : '#0194a8')};
    border: ${props => (props.disabled ? '1px solid #acacac' : '1px solid #0194a8')};
  }
`;
styles.ProfileContentHeader = styled.div`
  font: 400 18px 'Roboto', sans-serif;
  color: #51505d;
  text-align: center;
  padding: ${props => (props.isLimitExceed ? '44px 0 0' : '0')};
`;
styles.LoadingWrapper = styled.div`
  position: relative;
  min-height: 50px;
  top: 50px;
`;
styles.ProfileContactText = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  color: #72727d;
  line-height: 18px;
  text-align: center;
  padding: ${props => (props.isLimitExceed ? '14px 20px 40px' : '14px 0 75px 0')};
`;
styles.SmsBtnWrapper = styled.div`
  text-align: center;
  margin-bottom: ${props => (props.isPayment ? '15px' : 'inherit')};
`;
styles.GoPayment = styled.a`
  display: inline-block;
  margin: ${props => (props.isContactExceeded ? '0 auto' : '9px auto 0')};
  transition: all 300ms ease;
  box-shadow: ${props => (props.disabled ? '' : '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)')};
  border: ${props => (props.disabled ? '1px solid #acacac' : 'none')};
  border-radius: 3px;
  color: #fff;
  outline: 0;
  font: normal 18px/37px arial;
  text-decoration: none;
  padding: 0 13px;
  background: ${props => (props.disabled ? 'silver' : '#00bcd5')};
  &:hover {
    background: #0194a8;
  }
`;
styles.ProfileContentText = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  color: #72727d;
  line-height: 18px;
  text-align: center;
  padding: ${props => (props.isLimitExceed ? '14px 20px 15px' : '14px 0 75px 0')};
`;
styles.verifyBtn = styled.a`
  display: inline-block;
  margin: 10px 0 30px;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  color: #fff;
  outline: 0;
  font: 400 16px 'Roboto', sans-serif;
  text-decoration: none;
  line-height: 34px;
  padding: 0 36px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  background: #00bcd5;
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;
styles.ConnectNumWrp = styled.div`
  margin: ${props => (props.addPadding ? '21px 0 10px' : '21px 0 0')};
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.ConnectNumIcon = styled.span`
  background: url('/assets/contact-detail-sprite.png') no-repeat left top -63px;
  width: 16px;
  height: 24px;
  display: inline-block;
  margin: 0 10px 0 0;
`;
styles.ConnectNum = styled.span`
  font: 700 16px 'Roboto', sans-serif;
  line-height: 25px;
  width: 155px;
  color: #51505d;
  display: inline-block;
  vertical-align: top;
`;
styles.ConnectMailIcon = styled.span`
  background: url('/assets/contact-detail-sprite.png') no-repeat left top -41px;
  width: 24px;
  height: 17px;
  display: inline-block;
  vertical-align: top;
  margin: 3px 8px 0 0;
`;
styles.ConnectMailId = styled.span`
  font: 400 16px 'Roboto', sans-serif;
  line-height: 23px;
  color: #1fbcd3;
  display: inline-block;
  vertical-align: top;
`;
styles.ConnectSms = styled.div`
  font: 400 12px 'Roboto', sans-serif;
  line-height: 15px;
  color: #72727d;
  display: inline-block;
  vertical-align: top;
  padding: ${props => (props.chngSentSmsPos ? '6px 0 10px 30px' : '6px 0 10px 0')}; // if tick 6px 0 10px 20px; // if no tick 6px 0 10px 0;
  cursor: pointer;
`;
styles.ConnectSmsUp = styled.span`
  background: ${props =>
    props.updown
      ? 'url("/assets/contact-detail-sprite.png") no-repeat left top -100px'
      : 'url("/assets/contact-detail-sprite.png") no-repeat left top -91px'};
  width: 9px;
  height: 6px;
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  vertical-align: top;
  margin: 3px 0 0 8px;
`;
styles.getSmsTxt = styled.span`
  font: 400 12px 'Roboto', sans-serif;
  color: #72727d;
  display: inline-block;
  position: absolute;
  width: 200px;
  right: -40px;
  top: 33px;
`;
styles.GetSmsLoader = styled.span`
  position: absolute;
  display: inline-block;
  width: 17px;
  height: 10px;
  left: 500px;
  top: 33px;
`;
styles.GetSMSBtn = styled.button`
  position: absolute;
  overflow: hidden;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  right: 53px;
  width: 40px;
  height: 40px;
  top: 20px;
  border: 0;
  outline: 0;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: url(/assets/get-sms-contact.png) no-repeat 11px 11px;
  &:hover {
    background: ${props =>
      props.disabled
        ? 'url(/assets/get-sms-contact.png) no-repeat 11px 11px'
        : 'rgba(0, 0, 0, 0.08) url(/assets/get-sms-contact-hover.png) no-repeat 11px 11px'};
  }
`;
styles.TextAreaWrp = styled.div`
  width: ${props => (props.chngTxtAreaPos ? '387px' : '421px')};
  padding: ${props =>
    props.chngTxtAreaPos
      ? !props.toggleSmsDraft ? '0 0 0 180px' : '0 0 20px 180px'
      : !props.toggleSmsDraft ? '0 0 0 145px' : '0 0 20px 150px'};
  height: ${props => (props.toggleSmsDraft ? '117px' : '0px')};
  overflow: hidden;
  transition: height 0.5s;
`;
styles.SmsTextArea = styled.textarea`
  transition: none;
  background: transparent;
  height: 70px;
  font: 400 14px 'Roboto', sans-serif;
  line-height: 16px;
  color: #51505d;
  padding: 12px 10px;
  border: 1px solid #dfe0e3;
  margin: 0 0 8px;
  border-radius: 3px;
  overflow: auto;
  resize: none;
  outline: 0;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  background: ${props => (props.disabled ? '#f1f1f2' : '')};
`;
styles.DraftBtnsWrapper = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  justify-content: space-between;
  color: #95959d;
  font: 400 14px 'Roboto', sans-serif;
  border-bottom: 0;
  position: relative;
`;
styles.CharsRemaining = styled.div`
  margin: -3px 0 0;
  font: 300 12px 'Roboto', sans-serif;
  padding: 0 0 0 6px;
  color: #72727d;
  width: 144px;
`;
styles.CharsCount = styled.span`
  max-width: 30px;
  margin: -2px 0 0 4px;
  border: 0;
  color: #51505d;
  font: 400 14px 'Roboto', sans-serif;
`;
styles.SuccessfullyText = styled.div`
  padding: 0 0 0 4px;
  font: 300 12px 'Roboto', sans-serif;
  color: #72727d;
`;
styles.SmsLoader = styled.span`
  position: relative;
  display: inline-block;
  width: 17px;
  height: 10px;
  margin-left: 10px;
`;
styles.ReportPhoneWrp = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  margin: 0 20px;
  border-top: 1px dashed #cdced1;
  padding: 18px 0;
`;
styles.ReportPhoneSpan = styled.span`
  display: inline-block;
  cursor: pointer;
`;
styles.Note = styled.div`
  margin: 2px 0 0 0;
  width: 203px;
  padding: 0 0 0 115px;
  font: 300 11px 'Roboto', sans-serif;
  color: ${props => (props.changeFont ? '#72727d' : '#ff8b8f')};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
`;
styles.ContactsAvailableWrapper = styled.div`
  display: flex;
  width: 230px;
`;
styles.ContactsAvailableLabel = styled.div`
  padding: 0 3px 0 0;
  font: 300 14px 'Roboto', sans-serif;
  color: #51505d;
  width: 210px;
  text-align: right;
`;
styles.ContactCount = styled.span`
  color: #51505d;
  font: 400 14px 'Roboto', sans-serif;
`;
styles.ResonText = styled.div`
  font: 400 18px 'Roboto', sans-serif;
  color: #51505d;
  padding: 20px 0 8px 0;
`;
styles.ResonSelectWrp = styled.div``;
styles.ResonSelect = styled.div`
  font: 400 14px 'Roboto', sans-serif;
  color: #51505d;
  padding: 10px 0;
`;
styles.ResonSelectInput = styled.input`
  vertical-align: top;
  margin: 1px 4px 0 0;
`;
styles.SubmitWrp = styled.div`
  text-align: center;
  padding: 28px 0 16px;
`;
styles.ThankYouTickWrp = styled.div`
  margin: 32px auto 7px;
`;
styles.TickIncon = styled.span`
  background: url('/assets/contact-detail-sprite.png') no-repeat left top -23px;
  width: 16px;
  height: 13px;
  display: inline-block;
  margin: 2px 4px 0 0;
  vertical-align: top;
`;
styles.ConnectMsg = styled.span`
  font: 300 14px 'Roboto', sans-serif;
  color: #72727d;
  display: inline-block;
  vertical-align: top;
  width: 360px;
  padding: ${props => (props.isVisible && !props.isTick ? ' 0 0 12px' : '0 0 12px 9px')};
`;

styles.ViewContactNote = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  font: 300 14px 'Roboto', sans-serif;
  width: 360px;
  border-radius: 3px 3px 3px 0;
  background-color: #d7eafe;
  color: #51505d;
  line-height: 24px;
  margin: 0 21px 20px 180px;
  padding: 4px 14px;
`;

export default styles;
