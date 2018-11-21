import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import OtpVerificationForm from './OtpVerificationForm';

class OtpVerification extends React.PureComponent {
  componentDidMount() {
    const { mobile, country, countryCode } = this.props.verifiedMobile;
    this.props.paymentActionHandler('otpGenerationApi', mobile, country, countryCode);
  }
  render() {
    const {
      otpGenerationData,
      otpVerificationData,
      totalPayableProps,
      cartSubmitProps,
      verifiedMobile,
      paymentActionHandler,
      formFields,
      otpPage,
    } = this.props;
    const totalNewPayableProps = {
      ...totalPayableProps,
      buttonText: 'Confirm Order',
      isPosCenter: true,
    };
    const otpVerificationFormProps = {
      totalPayableProps: totalNewPayableProps,
      cartSubmitProps,
      verifiedMobile,
      paymentActionHandler,
      otpGenerationData,
      otpVerificationData,
      formFields,
      otpPage,
    };
    return (
      <s.MainDiv id="otp_verification">
        <OtpVerificationForm {...otpVerificationFormProps} />
      </s.MainDiv>
    );
  }
}
OtpVerification.defaultProps = {
  formFields: {},
};
OtpVerification.propTypes = {
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  formFields: PropTypes.oneOfType([
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      contactPersonName: PropTypes.string.isRequired,
      personPhoneNo: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      contactPersonName: PropTypes.string.isRequired,
      personPhoneNo: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      shaadiCentre: PropTypes.string.isRequired,
    }),
  ]),
  otpPage: PropTypes.string.isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
};
export default OtpVerification;
