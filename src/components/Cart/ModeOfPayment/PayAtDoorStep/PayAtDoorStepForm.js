import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import ErrorText from '../ErrorText';
import HiddenValues from '../HiddenValues';
import OtpVerification from '../OtpVerification';
import SvgLoader from '../../../Common/SvgLoader';
import PaymentDropDown from '../PaymentDropDown';
import { doorStepAndAtBankValidation, paymentFormURL } from '../../utils';

class PayAtDoorStepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        city: '',
        contactPersonName: props.customerDetails.name,
        personPhoneNo: props.customerDetails.mobile,
        address: '',
      },
      formErrors: {
        city: '',
        contactPersonName: props.customerDetails.name !== '' ? true : '',
        personPhoneNo: props.customerDetails.mobile !== '' ? true : '',
        address: '',
      },
      showOtpVerificationForm: false,
      isFormSubmit: false,
      isVisibleLoader: false,
    };
  }
  onChangeValue = event => {
    this.fieldValidation(event.target.name, event.target.value);
  };
  submitFormRef = createRef();
  fieldValidation = (fieldName, fieldValue) => {
    const { formFields, formErrors } = this.state;
    const returnValidation = doorStepAndAtBankValidation(true, formFields, formErrors, fieldName, fieldValue);
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
    const { city, contactPersonName, personPhoneNo, address } = this.state.formFields;
    fieldData = { cust_city: city, cust_name: contactPersonName, cust_phone: personPhoneNo, cust_address1: address };

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
    const {
      doorStepCityList: { frequentlyUsedCities = [], moreCities = [] },
      totalPayableProps,
      cartSubmitProps,
      otpGenerationData,
      otpVerificationData,
      verifiedMobile,
      paymentActionHandler,
    } = this.props;
    const { formErrors, isVisibleLoader, formFields, showOtpVerificationForm } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader };
    if (showOtpVerificationForm) {
      const otpVerificationProps = {
        totalPayableProps,
        isPayAtDoor: false,
        otpPage: 'PayAtDoorStep',
        cartSubmitProps,
        otpGenerationData,
        otpVerificationData,
        verifiedMobile,
        paymentActionHandler,
        formFields,
      };
      return <OtpVerification {...otpVerificationProps} />;
    }
    const cityErrorTextProps = {
      id: 'pay_city_error',
      name: 'city',
      show: !!(formErrors.city === false),
    };
    const nameErrorTextProps = {
      id: 'pay_name_error',
      name: 'contactPersonName',
      show: !!(formErrors.contactPersonName === false),
    };
    const phoneErrorTextProps = {
      id: 'pay_phone_error',
      name: 'personPhoneNo',
      show: !!(formErrors.personPhoneNo === false),
    };
    const addressErrorTextProps = {
      id: 'pay_textarea_error',
      name: 'address',
      show: !!(formErrors.address === false),
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps, formFields, isVerifiedMobile: verifiedMobile.isVerifiedMobile };
    return (
      <form ref={this.submitFormRef} name="cartform" method="post" action={paymentFormURL}>
        {(frequentlyUsedCities.length > 0 && (
          <s.CartContent>
            <s.PayAtDoor>
              <s.DefaultText>
                Please fill in your details, our representative will contact you within 2 days to schedule a pickup for free!
              </s.DefaultText>
              <s.SpacerTen />
              <s.BankHeading>City</s.BankHeading>
              <s.SelectContainer>
                <s.SelectArrow>
                  <PaymentDropDown
                    type="medium"
                    name="cust_city"
                    onChange={this.onChangeValue}
                    value={formFields.city}
                    formErrors={formErrors}
                    id="cust_city"
                    defaultText="Select City"
                    list={frequentlyUsedCities}
                    label="Frequently Used"
                    listKey="display_name"
                    listValue="city_name"
                    listDisplay="display_name"
                    otherList={moreCities}
                    otherLabel="More"
                  />
                </s.SelectArrow>
              </s.SelectContainer>
              <ErrorText {...cityErrorTextProps} />
              <s.BankHeading>Contact {"Person's"} Name</s.BankHeading>
              <s.InputBig
                name="cust_name"
                onChange={event => this.onChangeValue(event)}
                value={formFields.contactPersonName}
                formErrors={formErrors}
                id="cust_name"
              />
              <ErrorText {...nameErrorTextProps} />
              <s.BankHeading>Contact {"Person's"} Phone Number</s.BankHeading>
              <s.InputBig
                name="cust_phone"
                onChange={event => this.onChangeValue(event)}
                value={formFields.personPhoneNo}
                formErrors={formErrors}
                id="cust_phone"
                disabled={!!(verifiedMobile.isVerifiedMobile && !!formFields.personPhoneNo)}
              />
              <ErrorText {...phoneErrorTextProps} />
              <s.BankHeading>Address</s.BankHeading>
              <s.Textarea
                type="textarea"
                name="cust_address1"
                onChange={event => this.onChangeValue(event)}
                value={formFields.address}
                formErrors={formErrors}
                id="cust_address1"
              />
              <ErrorText {...addressErrorTextProps} />
              <HiddenValues {...hiddenValuesProps} />
            </s.PayAtDoor>
            <TotalPayable {...totalPayableNewProps} />
          </s.CartContent>
        )) || (
          <s.LoaderWrapper>
            <SvgLoader isVisible isBigLoader />
          </s.LoaderWrapper>
        )}
      </form>
    );
  }
}
PayAtDoorStepForm.propTypes = {
  doorStepCityList: PropTypes.shape(PropTypes.cartDoorStepCityList).isRequired,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
  customerDetails: PropTypes.shape(PropTypes.cartCustomerDetails).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
};
export default PayAtDoorStepForm;
