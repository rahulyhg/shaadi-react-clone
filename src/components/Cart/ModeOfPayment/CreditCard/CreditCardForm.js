import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import { formatCardNumber } from '@shaaditech/cc-number-formatter';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import ErrorText from '../ErrorText';
import HiddenValues from '../HiddenValues';
import PaymentDropDown from '../PaymentDropDown';
import { monthArr, yearArr, luhnAlgorithm, paymentFormURL } from '../../utils';

const CREDIT_CARD_MAX_LENGTH = 16;
const DEBIT_CARD_MAX_LENGTH = 19;
class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => {
    const initialState = {
      cardNum: '',
      cvv: '',
      cardHolderName: '',
      cardMonth: '',
      cardYear: '',
      formErrors: {
        cardNum: '',
        cvv: '',
        cardHolderName: '',
        cardMonth: '',
        cardYear: '',
      },
      cardImage: '',
      isFieldRequire: true,
      isFormSubmit: false,
      isVisibleLoader: false,
    };
    return initialState;
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.tab !== this.props.tab) {
      this.setState(this.getInitialState());
    }
  }
  onChangeValue = event => {
    this.fieldValidation(event.target.id, event.target.value);
  };
  monthRef = createRef();
  payNowBtnRef = createRef();
  submitFormRef = createRef();
  fieldValidation = (fieldName, fieldValue, type) => {
    const fieldValidationErrors = this.state.formErrors;
    switch (fieldName) {
      case 'cc_num': {
        const { tab: currentTab, currency } = this.props;
        const cardNum = fieldValue.replace(/\s/g, '');
        const maxLength = currentTab === 'CreditCard' ? CREDIT_CARD_MAX_LENGTH : DEBIT_CARD_MAX_LENGTH;
        if (/[^0-9\s]+/.test(cardNum) === false && cardNum.length <= maxLength) {
          let cardImage = /^5[1-5]/.test(cardNum) ? 'master_card' : /^4/.test(cardNum) ? 'visa_card' : '';
          if (
            /^(0604|5018|5020|5021|5022|5038|5044|5046|5047|5048|5049|5081|5082|5612|5818|5893|6002|6031|6037|6038|6220|6304|6390|6759|6761|6762|6763)/.test(
              cardNum,
            ) &&
            currency === 'INR' &&
            currentTab === 'DebitCard'
          ) {
            cardImage = 'maestro_card';
          }
          const isValidCreditCard = luhnAlgorithm(cardNum);
          if (isValidCreditCard === true && cardNum.length >= 13 && cardNum.substring(0, 6) !== '000000') {
            fieldValidationErrors.cardNum = true;
          } else {
            fieldValidationErrors.cardNum = '';
          }
          if (cardNum.length === maxLength) {
            this.monthRef.current.focus();
          }
          if (type === 'submit') {
            fieldValidationErrors.cardNum =
              cardNum.substring(0, 6) === '000000' ? false : !!(cardNum.length >= 13 && isValidCreditCard === true);
          }
          const isFieldRequire = !(cardImage === 'maestro_card' || cardNum.length === 19);
          if (!isFieldRequire) {
            fieldValidationErrors.cardMonth = true;
            fieldValidationErrors.cardYear = true;
            fieldValidationErrors.cvv = true;
          }

          // Format card numbers with spaces
          const formattedCardNum = formatCardNumber(cardNum);

          this.setState({ cardNum: formattedCardNum, formErrors: fieldValidationErrors, cardImage, isFieldRequire });
        }
        if (cardNum.length < 1) {
          fieldValidationErrors.cardNum = false;
          const cardImage = '';
          this.setState({ formErrors: fieldValidationErrors, cardImage });
        }
        break;
      }
      case 'cc_month': {
        fieldValidationErrors.cardMonth = !this.state.isFieldRequire ? true : !!fieldValue;
        this.setState({ cardMonth: fieldValue, formErrors: fieldValidationErrors });
        break;
      }
      case 'cc_year': {
        fieldValidationErrors.cardYear = !this.state.isFieldRequire ? true : !!fieldValue;
        this.setState({ cardYear: fieldValue, formErrors: fieldValidationErrors });
        break;
      }
      case 'cc_cvv': {
        const cvv = fieldValue.replace(/\s/g, '');
        if (!/[^0-9\s]+/.test(cvv) && cvv.length <= 3) {
          fieldValidationErrors.cvv = cvv.length === 3 ? true : '';
          if (type === 'submit' && cvv.length < 3) {
            fieldValidationErrors.cvv = false;
          }
          this.setState({ cvv, formErrors: fieldValidationErrors });
        }
        fieldValidationErrors.cvv = !this.state.isFieldRequire ? true : cvv.length < 1 ? false : this.state.formErrors.cvv;
        this.setState({ formErrors: fieldValidationErrors });
        break;
      }
      case 'cc_card_holder_name': {
        const cardHolderName = fieldValue;
        if (
          isNaN(cardHolderName.replace(/\s/g, '')) &&
          cardHolderName.length <= 50 &&
          !/[^a-zA-Z0-9'_@]/.test(cardHolderName.replace(/\s/g, ''))
        ) {
          fieldValidationErrors.cardHolderName = true;
          this.setState({ cardHolderName, formErrors: fieldValidationErrors });
        }
        if (cardHolderName.length < 1 || !isNaN(cardHolderName)) {
          fieldValidationErrors.cardHolderName = false;
          this.setState({ cardHolderName, formErrors: fieldValidationErrors });
        }
        break;
      }
      default: {
        break;
      }
    }
    const { cardNum, cardMonth, cardYear, cvv, cardHolderName } = this.state.formErrors;
    const validateField = { cardNum, cardMonth, cardYear, cvv, cardHolderName };

    const validateFormActive = Object.keys(validateField).map(field => validateField[field]);
    if (!validateFormActive.includes('') && !validateFormActive.includes(false)) {
      this.setState({ isFormSubmit: true });
    } else {
      this.setState({ isFormSubmit: false });
    }
  };
  placeOrder = () => {
    const { cardNum, cvv, cardHolderName, cardMonth, cardYear } = this.state;
    const fieldData = { cc_num: cardNum, cc_cvv: cvv, cc_card_holder_name: cardHolderName, cc_month: cardMonth, cc_year: cardYear };
    for (const fieldName of Object.keys(fieldData)) {
      this.fieldValidation(fieldName, fieldData[fieldName], 'submit');
    }
    if (this.state.isFormSubmit) {
      this.setState({
        isVisibleLoader: true,
        isFormSubmit: false,
      });
      this.submitFormRef.current.submit();
    }
  };
  render() {
    const { totalPayableProps, tab: currentTab, cartSubmitProps, currency } = this.props;
    const currentYear = new Date().getFullYear();
    const { formErrors, isVisibleLoader, cardNum, cardMonth, cardYear, cvv, cardHolderName, cardImage } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader, buttonRef: this.payNowBtnRef };
    const cardErrorTextProps = {
      id: 'credit_card_error',
      name: 'cardNum',
      show: !!(formErrors.cardNum === false),
    };
    const monthErrorTextProps = {
      id: 'month_year_error',
      name: 'cardMonth',
      show: !!(formErrors.cardMonth === false || formErrors.cardYear === false),
    };
    const cvvErrorTextProps = {
      id: 'cvv_error',
      name: 'cvv',
      show: !!(formErrors.cvv === false),
    };
    const holderNameErrorTextProps = {
      id: 'cardholder_error',
      name: 'cardHolderName',
      show: !!(formErrors.cardHolderName === false),
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps };
    const formattedCardNumber = cardNum;
    const cardNumber = (cardNum || '').replace(/\s+/g, '');
    return (
      <form ref={this.submitFormRef} name="cartform" id="cartform" method="post" action={paymentFormURL}>
        <s.DebitCard>
          <s.BankHeading>Card Number</s.BankHeading>
          <s.InputVisa
            value={formattedCardNumber}
            onChange={event => this.onChangeValue(event)}
            cardImage={cardImage}
            formErrors={formErrors}
            id="cc_num"
          />
          <s.InputHidden value={cardNumber} name="cc_num" />
          <s.AcceptCards>Accepted Cards</s.AcceptCards>
          <s.VisaIcon />
          <s.MasterIcon />
          {currentTab === 'DebitCard' && currency === 'INR' && <s.MaestroIcon />}
          <ErrorText {...cardErrorTextProps} />
          <s.CvvContainer>
            <s.CvvLeft>
              <s.BankHeading>Valid upto</s.BankHeading>
              <s.CvvContainer>
                <s.MonthContainer>
                  <s.SelectArrow>
                    <PaymentDropDown
                      type="small"
                      name="cc_month"
                      onChange={this.onChangeValue}
                      value={cardMonth}
                      formErrors={formErrors}
                      id="cc_month"
                      list={monthArr(1, 12)}
                      defaultText="MM"
                      refValue={this.monthRef}
                    />
                  </s.SelectArrow>
                </s.MonthContainer>
                <s.SpacerFive />
                <s.MonthContainer>
                  <s.SelectArrow>
                    <PaymentDropDown
                      type="small"
                      name="cc_year"
                      onChange={this.onChangeValue}
                      value={cardYear}
                      formErrors={formErrors}
                      id="cc_year"
                      list={yearArr(currentYear + 20, currentYear)}
                      defaultText="YYYY"
                    />
                  </s.SelectArrow>
                </s.MonthContainer>
              </s.CvvContainer>
              <ErrorText {...monthErrorTextProps} />
            </s.CvvLeft>
            <s.CvvRight>
              <s.BankHeading>CVV</s.BankHeading>
              <s.CvvContainer>
                <s.InputSmall
                  name="cc_cvv"
                  type="password"
                  onChange={event => this.onChangeValue(event)}
                  value={cvv}
                  formErrors={formErrors}
                  id="cc_cvv"
                />
                <s.CvvText>3 digit number printed on your back side of card</s.CvvText>
              </s.CvvContainer>
              <ErrorText {...cvvErrorTextProps} />
            </s.CvvRight>
          </s.CvvContainer>
          <s.BankHeading>Cardholder Name</s.BankHeading>
          <s.InputBig
            name="cc_card_holder_name"
            onChange={event => this.onChangeValue(event)}
            value={cardHolderName}
            formErrors={formErrors}
            onKeyDown={event => event.key === 'Enter' && this.payNowBtnRef.current.focus()}
            id="cc_card_holder_name"
          />
          <ErrorText {...holderNameErrorTextProps} />
          <HiddenValues {...hiddenValuesProps} />
        </s.DebitCard>
        <TotalPayable {...totalPayableNewProps} />
      </form>
    );
  }
}
CreditCardForm.propTypes = {
  tab: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
};
export default CreditCardForm;
