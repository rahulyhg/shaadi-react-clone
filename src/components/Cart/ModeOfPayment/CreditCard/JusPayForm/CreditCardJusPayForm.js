import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import createRef from 'create-react-ref/lib/createRef';
import s from '../../styles';
import CardNumber from './CardNumber';
import MonthYear from './MonthYear';
import CvvNumber from './CvvNumber';
import CardHolderName from './CardHolderName';
import TotalPayable from '../../TotalPayable';
import HiddenValues from '../../HiddenValues';
import doDomActions from '../../../../../actions/doDomActions';
import { ccAndDcJusPayFormValidation, jusPayEventHandler, orderIdGeneration } from '../../../utils';

class CreditCardJusPayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.submitFormNewRef = createRef();
    this.cardNumberRef = createRef();
    this.cvvRef = createRef();
    this.crdHolderNameRef = createRef();
    this.bindEvents();
  }
  getInitialState = () => {
    const initialState = {
      formErrors: {
        cardNum: '',
        cvv: '',
        cardHolderName: '',
        cardMonth: '',
        cardYear: '',
        trySubmit: '',
      },
      cardBrand: '',
      tab: this.props.tab,
      orderId: this.props.orderId.id,
      cardImage: '',
      isFormSubmit: false,
      isVisibleLoader: false,
    };
    return initialState;
  };
  componentDidMount() {
    this.props.doDomActions({ type: 'appendScript', script: './JusPaySetup.js' });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tab !== this.props.tab) {
      this.resetForm();
    }
    if (prevProps.orderId.id !== this.props.orderId.id) {
      this.updateAndSubmitForm(prevProps.orderId.id);
    }
  }
  getOrderId = () => {
    orderIdGeneration(this.props.totalPayableProps, this.props.cartSubmitProps, this.props.paymentActionHandler);
  };
  updateAndSubmitForm = orderId => {
    this.setState({ orderId, isFormSubmit: false }, () => {
      document.getElementById('common_pay_btn').click();
    });
  };
  resetForm = () => {
    this.setState(this.getInitialState());
    window.creditDebitForm && window.creditDebitForm.clear_form();
  };
  handleChange = event => {
    if (typeof event.data === 'string' && event.data.includes('handle-iframe-event')) {
      const eventHandler = JSON.parse(event.data).eventObject;
      const { formErrors, cardImage, cardBrand } = this.state;
      const validations = jusPayEventHandler(eventHandler, formErrors, cardImage, cardBrand);
      this.setState({
        formErrors: validations.formErrors,
        cardImage: validations.cardImage,
        cardBrand: validations.cardBrand,
      });
      this.enableSubmit();
    }
  };
  bindEvents = () => {
    window.addEventListener('message', this.handleChange, false);
  };
  fieldValidation = (fieldName, fieldValue) => {
    const { formErrors } = this.state;
    const validations = ccAndDcJusPayFormValidation(formErrors, fieldName, fieldValue);
    this.setState({ formErrors: validations.formErrors });
    this.enableSubmit();
  };
  enableSubmit = () => {
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
    const { cardNum, cardMonth, cardYear, cvv, cardHolderName } = this.state.formErrors;
    const fieldData = { cardNum, cardMonth, cardYear, cvv, cardHolderName };
    for (const fieldName of Object.keys(fieldData)) {
      this.fieldValidation(fieldName, fieldData[fieldName]);
    }

    if (this.state.isVisibleLoader === false) {
      if (this.state.isFormSubmit) {
        this.setState({ isVisibleLoader: true });
        this.getOrderId();
      } else {
        document.getElementById('common_pay_btn').click();
      }
    }
  };
  render() {
    const { totalPayableProps, tab: currentTab, cartSubmitProps, currency, orderId } = this.props;
    const { formErrors, isVisibleLoader, cardImage, cardBrand } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader, buttonRef: this.payNowBtnRef };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps };
    return (
      <form className="juspay_inline_form" id="juspay_form">
        <s.DebitCard>
          <CardNumber
            cardImage={cardImage}
            formErrors={formErrors}
            innerRef={this.cardNumberRef}
            currentTab={currentTab}
            currency={currency}
            cardBrand={cardBrand}
          />
          <s.InputWrapper>
            <s.FieldWrapper>
              <MonthYear formErrors={formErrors} />
              <CvvNumber innerRef={this.cvvRef} formErrors={formErrors} />
            </s.FieldWrapper>
          </s.InputWrapper>
          <CardHolderName innerRef={this.crdHolderNameRef} formErrors={formErrors} />
          <s.JusPayButton ref={this.submitFormNewRef} type="submit" id="common_pay_btn" />
          <HiddenValues {...hiddenValuesProps} juspay orderId={orderId.id} />
        </s.DebitCard>
        <TotalPayable {...totalPayableNewProps} />
      </form>
    );
  }
}
CreditCardJusPayForm.propTypes = {
  tab: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
  doDomActions: PropTypes.func.isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  orderId: PropTypes.shape(PropTypes.cartOrderId).isRequired,
};

const selector = () => ({});
export default connect(selector, { doDomActions })(CreditCardJusPayForm);
