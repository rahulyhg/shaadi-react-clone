import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import ErrorText from '../ErrorText';
import HiddenValues from '../HiddenValues';
import OtpVerification from '../OtpVerification';
import { doorStepAndAtBankValidation, paymentFormURL } from '../../utils';

class PaymentAtBankForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        contactPersonName: props.customerDetails.name,
        personPhoneNo: props.customerDetails.mobile,
      },
      formErrors: {
        contactPersonName: props.customerDetails.name !== '' ? true : '',
        personPhoneNo: props.customerDetails.mobile !== '' ? true : '',
      },
      showOtpVerificationForm: false,
      isFormSubmit: !!(props.customerDetails.name !== '' && props.customerDetails.mobile !== ''),
      isVisibleLoader: false,
    };
  }
  onChangeValue = event => {
    this.fieldValidation(event.target.name, event.target.value);
  };
  submitFormRef = createRef();
  fieldValidation = (fieldName, fieldValue) => {
    const { formFields, formErrors } = this.state;
    const returnValidation = doorStepAndAtBankValidation(false, formFields, formErrors, fieldName, fieldValue);
    this.setState({ formFields: returnValidation.formfield });

    const validateField = { ...formErrors };
    const validateFormActive = Object.keys(validateField).map(field => validateField[field]);
    if (!validateFormActive.includes('') && !validateFormActive.includes(false)) {
      this.setState({ isFormSubmit: true });
    } else {
      this.setState({ isFormSubmit: false });
    }
  };
  placeOrder = () => {
    let fieldData = '';
    const { contactPersonName, personPhoneNo } = this.state.formFields;
    fieldData = { cust_name: contactPersonName, cust_phone: personPhoneNo };

    for (const fieldName of Object.keys(fieldData)) {
      this.fieldValidation(fieldName, fieldData[fieldName]);
    }
    if (this.state.isFormSubmit) {
      const otpShouldVerify = this.props.verifiedMobile.isVerifiedMobile;
      if (!otpShouldVerify) {
        this.setState({
          isVisibleLoader: true,
          isFormSubmit: false,
        });
        this.submitFormRef.current.submit();
      } else {
        this.setState({
          showOtpVerificationForm: true,
        });
      }
    }
  };
  render() {
    const { totalPayableProps, cartSubmitProps, otpGenerationData, otpVerificationData, verifiedMobile, paymentActionHandler } = this.props;
    const { formErrors, isVisibleLoader, formFields, showOtpVerificationForm } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader };
    if (showOtpVerificationForm) {
      const otpVerificationProps = {
        totalPayableProps,
        otpPage: 'PaymentAtBank',
        cartSubmitProps,
        otpGenerationData,
        otpVerificationData,
        verifiedMobile,
        paymentActionHandler,
        formFields,
      };
      return <OtpVerification {...otpVerificationProps} />;
    }
    const nameErrorTextProps = {
      id: 'bank_contact_error',
      name: 'contactPersonName',
      show: !!(formErrors.contactPersonName === false),
    };
    const phoneErrorTextProps = {
      id: 'bank_number_error',
      name: 'personPhoneNo',
      show: !!(formErrors.personPhoneNo === false),
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps, formFields, isVerifiedMobile: verifiedMobile.isVerifiedMobile };
    return (
      <form ref={this.submitFormRef} name="cartform" method="post" action={paymentFormURL}>
        <s.CartContent>
          <s.PayAtBank>
            <s.DefaultText>Please complete the form below and get details on how to make payment at ICICI Bank</s.DefaultText>
            <s.SpacerTen />
            <s.BankHeading>Contact {"Person's"} Name</s.BankHeading>
            <s.InputBig
              name="cust_name"
              onChange={event => this.onChangeValue(event)}
              value={formFields.contactPersonName}
              formErrors={formErrors}
              id="cust_name"
            />
            <ErrorText {...nameErrorTextProps} />
            <s.BankHeading>Confirm Contact Number</s.BankHeading>
            <s.InputBig
              name="cust_phone"
              onChange={event => this.onChangeValue(event)}
              value={formFields.personPhoneNo}
              formErrors={formErrors}
              id="cust_phone"
              disabled={!!(verifiedMobile.isVerifiedMobile && !!formFields.personPhoneNo)}
            />
            <ErrorText {...phoneErrorTextProps} />
            <HiddenValues {...hiddenValuesProps} />
          </s.PayAtBank>
          <TotalPayable {...totalPayableNewProps} />
        </s.CartContent>
      </form>
    );
  }
}
PaymentAtBankForm.propTypes = {
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
  customerDetails: PropTypes.shape(PropTypes.cartCustomerDetails).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
};
export default PaymentAtBankForm;
