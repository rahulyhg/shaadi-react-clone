import styled from 'styled-components';

const styles = {};
styles.tabList = {
  width: '177px',
  background: '#f7f7f7 url(assets/list-bg-vertical.png) repeat-y right top',
  padding: '0 0 61px',
};
styles.tab = {
  background: '#f7f7f7 url(assets/list-bg.png) repeat-x left bottom',
  borderRight: '1px solid #dfe0e3',
  borderLeft: '3px solid transparent',
  font: '300 14px "Roboto", sans-serif',
  padding: '0 0 0 8px',
  color: '#72727d',
  transition: 'all 300ms ease',
  outline: 'none',
  cursor: 'pointer',
};
styles.getListStyle = () => ({
  ...styles.tabList,
});
styles.getStyle = ({ isActive, isHover }, defaultStyle) => ({
  ...styles.tab,
  ...(isActive || isHover
    ? {
        background: '#fff url(assets/list-bg.png) repeat-x left bottom',
        color: '#51505d',
        borderLeft: '3px solid #00bcd5',
        borderRight: '1px solid #fff',
        cursor: 'pointer',
        font: '500 14px "Roboto", sans-serif',
        fontWeight: isHover && !isActive ? 300 : 500,
      }
    : {}),
});
styles.MainDiv = styled.div``;
styles.LoaderWrapper = styled.div`
  width: 430px;
  text-align: center;
  position: relative;
  padding: 150px 0;
  margin: 0 auto;
`;
styles.MopShadow = styled.div`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
  display: flex;
  margin: 0 0 10px;
`;
styles.MopShadow.displayName = 'ModeOfPaymentList';
styles.CartListWrapper = styled.div`
  width: 177px;
  padding: 0 0 61px;
  background: #f7f7f7 url(assets/list-bg-vertical.png) repeat-y right top;
`;
// styles.CartListWrapper.displayName = 'ModeOfPaymentList';
styles.CartLists = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  align-items: center;
`;

styles.CartList = styled.div`
  text-decoration: none;
  outline: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
`;

styles.CartList.displayName = 'CartList';

styles.CartContent = styled.div`
  width: 430px;
  padding: 22px 8px 22px 15px;
`;
styles.CartContent.displayName = 'CartContent';
styles.DebitIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -41px;
  width: 20px;
  height: 18px;
  display: inline-block;
  margin: 0 10px 0 0;
  vertical-align: middle;
`;
styles.DebitIcon.displayName = 'DebitIcon';
styles.PaypalIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -419px;
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 0 10px 0 0;
  vertical-align: middle;
`;
styles.NetBanIcon = styled.div`
  background: url(assets/cart-icon.png) no-repeat left -66px;
  width: 18px;
  height: 18px;
  display: inline-block;
  margin: 0 10px 0 0;
  align-self: center;
`;
styles.CashBankIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat -34px -419px;
  width: 22px;
  height: 23px;
  display: inline-block;
  margin: 0 10px 0 0;
  vertical-align: middle;
`;
styles.PayDoorIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -94px;
  width: 22px;
  height: 20px;
  display: inline-block;
  margin: 0 10px 0 0;
  vertical-align: middle;
`;
styles.PayBankIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -124px;
  width: 22px;
  height: 22px;
  display: inline-block;
  margin: 0 10px 0 0;
  vertical-align: middle;
`;
styles.ShaadiCentreIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -156px;
  width: 21px;
  height: 21px;
  display: inline-block;
  margin: 0 10px 0 0;
  vertical-align: middle;
`;
styles.HdfcIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -474px;
  width: 90px;
  height: 15px;
  display: inline-block;
  margin: 7px 0 0;
`;
styles.HdfcIcon.displayName = 'HdfcIcon';
styles.IciciIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -648px;
  width: 90px;
  height: 19px;
  display: inline-block;
`;
styles.IciciIcon.displayName = 'IciciIcon';
styles.IdbiIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -449px;
  width: 90px;
  height: 15px;
  display: inline-block;
  margin: 5px 0 0;
`;
styles.IdbiIcon.displayName = 'IdbiIcon';
styles.SbiIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -499px;
  width: 90px;
  height: 17px;
  display: inline-block;
  margin: 5px 0 0;
`;
styles.SbiIcon.displayName = 'SbiIcon';
styles.AxisIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -594px;
  width: 90px;
  height: 22px;
  display: inline-block;
`;
styles.AxisIcon.displayName = 'AxisIcon';
styles.PunjabIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -626px;
  width: 90px;
  height: 13px;
  display: inline-block;
  margin: 5px 0 0;
`;
styles.PunjabIcon.displayName = 'PunjabIcon';
styles.PaypalIcon.displayName = 'PaypalIcon';
styles.VisaIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -187px;
  width: 24px;
  height: 16px;
  display: inline-block;
  margin: 0 2px 0 0;
  vertical-align: middle;
`;
styles.VisaIcon.displayName = 'VisaCardImage';

styles.MasterIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -212px;
  width: 25px;
  height: 18px;
  display: inline-block;
  margin: 0 2px 0 0;
  vertical-align: middle;
`;
styles.MasterIcon.displayName = 'MasterCardIcon';
styles.MaestroIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat -36px -187px;
  width: 27px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
`;
styles.MaestroIcon.displayName = 'MaestroCardIcon';
styles.NetBankText = styled.span`
  display: inline-block;
`;
styles.NetBankSmall = styled.span`
  font-size: 11px;
  display: inline-block;
`;
styles.BankHeading = styled.div`
  font: 500 14px 'Roboto', sans-serif;
  padding: 0 0 6px;
  ${props => (props.isMonthYear ? 'width: 154px;' : '')};
`;
styles.BankHeading.displayName = 'BankHeading';
styles.InputVisa = styled.input`
  border: 1px solid ${props => (props.formErrors.cardNum === false ? '#e53a41' : '#dfe0e3')};
  box-sizing: border-box;
  background-clip: padding-box;
  border-radius: 3px;
  width: 260px;
  padding: 0 8px;
  height: 34px;
  line-height: 34px;
  color: #51505d;
  outline: none;
  transition: ${props => (props.formErrors.cardNum === false ? '' : 'all 300ms ease')};
  font: 300 14px 'Roboto', sans-serif;
  background: ${props =>
    props.cardImage !== ''
      ? props.cardImage === 'visa_card'
        ? 'url(assets/visa-icon.png) no-repeat left 6px;'
        : props.cardImage === 'master_card'
          ? 'url(assets/master-icon.png) no-repeat left 5px'
          : props.cardImage === 'maestro_card' ? 'url(assets/maestro-icon.png) no-repeat left 6px;' : ''
      : ''};
`;
styles.InputVisa.displayName = 'cardNumber';

styles.AcceptCards = styled.span`
  font: 300 11px 'Roboto', sans-serif;
  color: #72727d;
  padding: 0 3px 0 8px;
  display: inline-block;
`;
styles.CvvContainer = styled.div`
  display: flex;
`;
styles.CvvLeft = styled.div`
  flex: 1;
`;
styles.CvvRight = styled.div`
  width: 236px;
  text-align: left;
`;

styles.SelectDropDown = styled.select`
  border: 1px solid
    ${props =>
      props.formErrors.cardMonth === false ||
      props.formErrors.cardYear === false ||
      props.formErrors.bankName === false ||
      props.formErrors.city === false
        ? '#e53a41'
        : '#dfe0e3'};
  width: ${props => (props.type === 'small' ? '80px' : props.type === 'medium' ? '258px' : props.type === 'big' ? '420px' : '')};
  border-radius: 3px;
  padding: 0 0 0 8px;
  margin: 0 10px 0 0;
  height: 34px;
  color: #51505d;
  outline: none;
  display: inline-block;
  background: #fff;
  font: 300 14px 'Roboto', sans-serif;
  box-sizing: border-box;
  background-clip: padding-box;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`;

styles.InputSmall = styled.input`
  border: 1px solid ${props => (props.formErrors.cvv === false ? '#e53a41' : '#dfe0e3')};
  border-radius: 3px;
  width: 64px;
  padding: 0 8px;
  color: #51505d;
  margin: 0 8px 0 0;
  height: 34px;
  line-height: 34px;
  outline: none;
  font: 300 14px 'Roboto', sans-serif;
  box-sizing: border-box;
  background-clip: padding-box;
`;

styles.CvvWrapper = styled.div`
  display: flex;
`;
styles.CvvText = styled.div`
  width: 127px;
  text-align: left;
  color: #51505d;
  font: 300 11px 'Roboto', sans-serif;
  align-self: center;
  line-height: 15px;
  ${props => (props.isMarginLeft ? 'margin-left:8px' : '')};
  ${props => (props.isMarginTop ? 'margin-top:6px' : '')};
`;
styles.InputBig = styled.input`
  border: 1px solid
    ${props =>
      props.formErrors.cardHolderName === false ||
      (props.name === 'cust_name' && props.formErrors.contactPersonName === false) ||
      (props.name === 'cust_phone' && props.formErrors.personPhoneNo === false)
        ? '#e53a41'
        : '#dfe0e3'};
  border-radius: 3px;
  width: 258px;
  padding: 0 8px;
  height: 34px;
  line-height: 34px;
  color: #51505d;
  outline: none;
  font: 300 14px 'Roboto', sans-serif;
  box-sizing: border-box;
  background-clip: padding-box;
`;

styles.PayNowBtn = styled.button.attrs({ type: 'button' })`
  display: block;
  position: relative;
  text-align: center;
  width: 200px;
  height: 44px;
  font: 400 18px 'Roboto', sans-serif;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  margin: ${props => (props.isPosCenter ? '0 auto' : '')};
  text-decoration: none;
  box-sizing: border-box;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  line-height: 42px;
  padding: 0;
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
  &:active {
    padding: 0;
  }
`;
styles.PayNowBtn.displayName = 'PayNowBtn';

styles.TotalPayable = styled.div`
  text-align: center;
  font: 400 14px 'Roboto', sans-serif;
  color: #72727d;
  padding: 12px 0 0 0;
  width: ${props => (props.isPosCenter ? '' : '200px')};
  white-space: nowrap;
`;

styles.TotalPayable.displayName = 'TotalPayableText';

styles.ErrorText = styled.div`
  text-align: ${props => (props.isPosCenter ? 'center' : 'left')};
  font: 500 11px 'Roboto', sans-serif;
  color: #e53a41;
`;
styles.ErrorText.displayName = 'ErrorText ';

styles.ErrorTextContainer = styled.div`
  height: 20px;
  padding: 5px 0 0;
`;
styles.SecureIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -270px;
  width: 76px;
  height: 37px;
  display: inline-block;
  margin: 20px 0 0;
`;
styles.SecureIcon.displayName = 'SecureIcon';
styles.DefaultText = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  color: #51505d;
  line-height: 20px;
`;
styles.DefaultText.displayName = 'DefaultText';

styles.DebitCard = styled.div`
  display: block;
`;

styles.PayPal = styled.div`
  display: block;
  padding: 0 0 20px;
`;
styles.NetBanking = styled.div`
  display: block;
`;
styles.PayAtDoor = styled.div`
  display: block;
`;
styles.PayAtBank = styled.div`
  display: block;
`;
styles.ShaadiCenter = styled.div`
  display: block;
`;
styles.CashPayment = styled.div`
  display: block;
`;
styles.CashPayment.displayName = 'CashPayment';

styles.OtpVerification = styled.div`
  display: block;
`;

styles.BankWrapper = styled.div`
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  padding: 0 6px;
  text-align: center;
  margin: 0 12px 0 0;
  height: 52px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  display: flex;
`;

styles.BankWrapper.displayName = 'BankWrapper';

styles.RadioButton = styled.input`
  vertical-align: top;
  text-align: center;
  width: 20px;
  margin: 0 auto;
`;
styles.BankContainer = styled.div`
  display: flex;
  padding: 0 0 15px;
`;
styles.NoteContainer = styled.div`
  font: 300 11px 'Roboto', sans-serif;
  color: #72727d;
  padding: 15px 0 0 0;
  line-height: 16px;
`;
styles.SpacerTen = styled.div`
  padding: 10px;
`;
styles.SpacerFive = styled.div`
  padding: 5px;
`;
styles.Textarea = styled.textarea`
  border: 1px solid ${props => (props.formErrors.address === false ? '#e53a41' : '#dfe0e3')};
  box-sizing: border-box;
  background-clip: padding-box;
  padding: 8px;
  height: 75px;
  color: #51505d;
  font: 300 14px 'Roboto', sans-serif;
  vertical-align: top;
  width: 258px;
  border-radius: 3px;
  outline: none;
  resize: none;
`;
styles.UaeXchangeIcon = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -672px;
  width: 132px;
  height: 28px;
  display: inline-block;
  vertical-align: middle;
`;
styles.ShaadiCentreWrapper = styled.div`
  border: 1px solid ${props => (props.formErrors.centre === false ? '#e53a41' : '#dfe0e3')};
  border-top: ${props => (props.formErrors.centre === false ? '' : 'none')};
  padding: 0 0 2px 8px;
  width: 420px;
  border-radius: 0 0 3px 3px;
  box-sizing: border-box;
  background-clip: padding-box;
  overflow: hidden;
`;

styles.CheckBoxWrapper = styled.div`
  width: 25px;
`;
styles.CheckBox = styled.input`
  vertical-align: middle;
  display: ${props => (props.hide === true ? 'none' : 'block')};
`;
styles.CentreAddress = styled.div`
  width: 227px;
  font: 400 11px 'Roboto', sans-serif;
  color: #72727d;
  line-height: 16px;
`;
styles.TelephoneNumber = styled.div`
  font: 400 13px 'Roboto', sans-serif;
  color: #51505d;
  padding: 25px 0 0 15px;
  width: 135px;
`;
styles.TelephoneUae = styled.div`
  font: 400 13px 'Roboto', sans-serif;
  color: #51505d;
  padding: 0 0 0 15px;
  width: 150px;
`;
styles.ContactPerson = styled.div`
  font: 500 11px 'Roboto', sans-serif;
  padding: 5px 0 0;
`;
styles.AddressHeading = styled.div`
  font: 400 16px 'Roboto', sans-serif;
  padding: 0 0 6px;
`;
styles.CentreAddContainer = styled.div`
  border-bottom: 1px dashed #95949d;
  width: 402px;
  display: flex;
  padding: 12px 0 20px;
  &:last-child {
    border-bottom: none;
  }
`;
styles.TotalWrapper = styled.div`
  padding: 4px 0 0;
  text-align: ${props => (props.isPosCenter ? 'center' : '')};
`;

styles.SelectArrow = styled.div`
  &:after {
    content: '';
    width: 7px;
    height: 4px;
    border-left: none;
    position: absolute;
    right: 10px;
    top: 15px;
    pointer-events: none;
    background: url(assets/select-arrow.png) no-repeat left top;
  }
`;
styles.SelectContainer = styled.div`
  position: relative;
  width: 260px;
`;
styles.SelectCashPayment = styled.div`
  position: relative;
  width: 420px;
`;
styles.MonthContainer = styled.div`
  position: relative;
  width: 80px;
`;
styles.InputHidden = styled.input.attrs({ type: 'hidden' })``;
styles.OtpHeading = styled.div`
  font: 500 14px 'Roboto', sans-serif;
  padding: 0 0 29px;
  text-align: center;
  line-height: 20px;
`;
styles.OtpNumber = styled.input`
  width: 40px;
  border: 0;
  border-bottom: 2px solid ${props => (props.isError ? '#e53a41' : '#dfe0e3')};
  margin: 0 5px;
  text-align: center;
  font: 300 30px 'Roboto', sans-serif;
  color: #51505d;
  outline: none;
`;

styles.OtpWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
styles.OtpNote = styled.div`
  text-align: center;
  font: 300 12px 'Roboto', sans-serif;
  color: #72727d;
  padding: 0 0 20px;
`;
styles.EditLink = styled.span`
  color: #00bcd5;
  cursor: pointer;
`;
styles.EditLink.displayName = 'EditLink';

styles.InputWrapper = styled.div`
  margin-bottom: 0px;
`;
styles.FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  ${props => (props.isMonthYear ? 'width:180px' : '')};
`;
styles.FormInput = styled.div`
  border: 1px solid
    ${props =>
      (props.isCardImage && props.formErrors.cardNum === false) ||
      (props.isMonth && props.formErrors.cardMonth === false) ||
      (props.isYear && props.formErrors.cardYear === false) ||
      (props.isCvv && props.formErrors.cvv === false) ||
      (props.isCardHolder && props.formErrors.cardHolderName === false)
        ? '#e53a41'
        : '#dfe0e3'};
  box-sizing: border-box;
  background-clip: padding-box;
  border-radius: 3px;
  width: 260px;
  padding: ${props => (props.isCardImage ? '0 40px 0 8px' : '0 8px')};
  height: 34px;
  line-height: 34px;
  color: #51505d;
  outline: none;
  transition: ${props => (props.formErrors.cardNum2 === false ? '' : 'all 300ms ease')};
  font: 300 14px 'Roboto', sans-serif;
  background: ${props =>
    props.cardImage !== ''
      ? props.cardImage === 'visa_card'
        ? 'url(assets/visa-icon.png) no-repeat left 6px;'
        : props.cardImage === 'master_card'
          ? 'url(assets/master-icon.png) no-repeat left 5px'
          : props.cardImage === 'maestro_card' ? 'url(assets/maestro-icon.png) no-repeat left 6px;' : ''
      : ''};
`;
styles.SmallFormInput = styles.FormInput.extend`
  width: ${props => (props.isCvv ? '64px' : '106px')};
  ${props => (props.isMarginRight ? 'margin-right:10px' : '')};
  ${props => (props.isMarginLeft ? 'margin-left:10px' : '')};
  ${props => (props.isMarginTop ? 'margin-top:6px' : '')};
`;

styles.FlexHeading = styled.div`
  font: 500 14px 'Roboto', sans-serif;
  ${props => (props.isMonthYear ? 'width: 194px;' : '')};
`;
styles.JusPayButton = styled.button`
  display: none;
`;
export default styles;
