import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import PayAtDoorStepForm from './PayAtDoorStepForm';

class PayAtDoorStep extends React.PureComponent {
  componentDidMount() {
    this.props.paymentActionHandler('doorStepCollectionApi');
  }
  render() {
    const {
      currency = '',
      doorStepCityList,
      settings: { payAtDoorConvertedAmount },
      isShaadiCareChecked,
      isProfileBoosterChecked,
      isSymbolCodeCurrency,
      finalAmount: amount = 0,
      otpGenerationData,
      otpVerificationData,
      cartId,
      accessToken,
      mopId,
      mopName,
      paymentActionHandler,
      customerDetails,
      verifiedMobile,
    } = this.props;
    const cartSubmitProps = { cartId, accessToken, mopId, mopName };
    const { currency: approxCurrency = '', shaadi_care: shaadiCare = 0, spotlight = 0, value: approxAmount = 0 } = payAtDoorConvertedAmount;
    const buttonText = 'Confirm Order';
    const totalPayableProps = {
      buttonText,
      isSymbolCodeCurrency,
      amount,
      currency,
      approxAmount,
      approxCurrency,
      isShaadiCareChecked,
      isProfileBoosterChecked,
      shaadiCare,
      spotlight,
      isPayAtDoor: true,
    };
    const payAtDoorStepFormProps = {
      doorStepCityList,
      totalPayableProps,
      cartSubmitProps,
      customerDetails,
      verifiedMobile,
      paymentActionHandler,
      otpGenerationData,
      otpVerificationData,
    };
    return (
      <s.MainDiv id="pay_at_doorstep">
        <PayAtDoorStepForm {...payAtDoorStepFormProps} />
      </s.MainDiv>
    );
  }
}
PayAtDoorStep.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.cartCommonProps,
  doorStepCityList: PropTypes.shape(PropTypes.cartDoorStepCityList).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  customerDetails: PropTypes.shape(PropTypes.cartCustomerDetails).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
};

export default PayAtDoorStep;
