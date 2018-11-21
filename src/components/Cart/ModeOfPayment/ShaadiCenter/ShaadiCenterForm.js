import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import OtpVerification from '../OtpVerification';
import ErrorText from '../ErrorText';
import SvgLoader from '../../../Common/SvgLoader';
import PaymentDropDown from '../PaymentDropDown';
import HiddenValues from '../HiddenValues';
import Centers from '../Centers';
import { shaadiAndUaeCentreValidation, paymentFormURL } from '../../utils';

class ShaadiCenterForm extends React.Component {
  state = {
    centers: [],
    formFields: {
      city: '',
      shaadiCentre: '',
    },
    formErrors: {
      city: '',
      centre: '',
    },
    showOtpVerificationForm: false,
    isFormSubmit: false,
    isVisibleLoader: false,
  };
  onCityChange = event => {
    this.onChangeValue(event);
    const { shaadiCentersCityList } = this.props;
    const centers = shaadiCentersCityList.centers.filter(f => f.city === event.target.value);

    if (centers.length === 1) {
      const mEvent = { target: { name: 'centreadd', value: `${centers.map(item => item.id)[0]}` } };
      this.onChangeValue(mEvent);
    }
    this.setState({ centers });
  };
  onSelectCentre = event => {
    this.onChangeValue(event);
  };
  onChangeValue = event => {
    this.fieldValidation(event.target.name, event.target.value);
  };
  submitFormRef = createRef();
  fieldValidation = (fieldName, fieldValue) => {
    const { formErrors, formFields } = this.state;
    const returnValidation = shaadiAndUaeCentreValidation(true, formFields, formErrors, fieldName, fieldValue);
    this.setState({ formFields: returnValidation.formfield, formErrors: returnValidation.formErrors });

    const { city, centre } = this.state.formErrors;
    const validateField = { city, centre };
    const validateFormActive = Object.keys(validateField).map(field => validateField[field]);
    if (!validateFormActive.includes('') && !validateFormActive.includes(false)) {
      this.setState({ isFormSubmit: true });
    } else {
      this.setState({ isFormSubmit: false });
    }
  };
  placeOrder = () => {
    let fieldData = '';
    const { city, shaadiCentre } = this.state.formFields;
    fieldData = { shaadiCenterCity: city, centreadd: shaadiCentre };
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
      shaadiCentersCityList: { cities = [] },
      totalPayableProps,
      cartSubmitProps,
      otpGenerationData,
      otpVerificationData,
      verifiedMobile,
      paymentActionHandler,
    } = this.props;
    const { formErrors, formFields, centers, isVisibleLoader, showOtpVerificationForm } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader };
    if (showOtpVerificationForm) {
      const otpVerificationProps = {
        totalPayableProps,
        otpPage: 'ShaadiCenter',
        cartSubmitProps,
        otpGenerationData,
        otpVerificationData,
        verifiedMobile,
        paymentActionHandler,
        formFields,
      };
      return <OtpVerification {...otpVerificationProps} />;
    }
    const errorTextProps = {
      id: 'shaadi_centre_error',
      name: formErrors.city === true && formErrors.centre === false ? 'shaadiCenter' : 'city',
      show: !!((formErrors.city === true && formErrors.centre === false) || formErrors.city === false),
    };
    const centersProps = {
      formErrors,
      centers,
      onSelectCentre: this.onSelectCentre,
      showHeading: true,
      checkboxId: 'centreadd',
      autoHeightMax: 240,
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps };
    const paymentValuesProps = {
      type: 'big',
      name: 'shaadiCenterCity',
      id: 'shaadiCenterCity',
      list: cities,
      defaultText: 'Select City',
      onChange: this.onCityChange,
      value: formFields.city,
      formErrors,
    };
    return (
      <form ref={this.submitFormRef} name="cartform" method="post" action={paymentFormURL}>
        {(cities.length > 0 && (
          <s.CartContent id="shaadi_centre">
            <s.ShaadiCenter>
              <s.DefaultText>
                Make payment using Cash/ DD/ Credit Card at any of the<br />
                Shaadi Centres
              </s.DefaultText>
              <s.SpacerTen />
              <s.BankHeading>Select Nearest Shaadi Centre:</s.BankHeading>
              <s.SelectCashPayment>
                <s.SelectArrow>
                  <PaymentDropDown {...paymentValuesProps} />
                </s.SelectArrow>
              </s.SelectCashPayment>
              {centers && centers.length > 0 && <Centers {...centersProps} />}
              <ErrorText {...errorTextProps} />
              <HiddenValues {...hiddenValuesProps} />
            </s.ShaadiCenter>
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
ShaadiCenterForm.propTypes = {
  shaadiCentersCityList: PropTypes.shape(PropTypes.cartCentersCityList).isRequired,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
};
export default ShaadiCenterForm;
