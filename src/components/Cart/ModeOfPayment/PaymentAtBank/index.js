import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import PaymentAtBankForm from './PaymentAtBankForm';

const PaymentAtBank = props => {
  const {
    currency = '',
    settings: { paymentAtBankConvertedAmount },
    isShaadiCareChecked,
    isProfileBoosterChecked,
    isSymbolCodeCurrency,
    finalAmount: amount = 0,
    otpGenerationData,
    otpVerificationData,
    paymentActionHandler,
    cartId,
    accessToken,
    mopId,
    mopName,
    customerDetails,
    verifiedMobile,
  } = props;
  const cartSubmitProps = { cartId, accessToken, mopId, mopName };
  const {
    currency: approxCurrency = '',
    shaadi_care: shaadiCare = 0,
    spotlight = 0,
    value: approxAmount = 0,
  } = paymentAtBankConvertedAmount;
  const buttonText = 'Proceed';
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
    isCallAssistant: true,
  };
  const paymentAtBankFormProps = {
    totalPayableProps,
    cartSubmitProps,
    customerDetails,
    verifiedMobile,
    paymentActionHandler,
    otpGenerationData,
    otpVerificationData,
  };
  return (
    <s.MainDiv id="pay_at_bank">
      <PaymentAtBankForm {...paymentAtBankFormProps} />
    </s.MainDiv>
  );
};
PaymentAtBank.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.cartCommonProps,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  customerDetails: PropTypes.shape(PropTypes.cartCustomerDetails).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
};

export default PaymentAtBank;
