import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import PaypalForm from './PaypalForm';

const Paypal = props => {
  const {
    currency = '',
    settings: { paypalConvertedAmount },
    isShaadiCareChecked,
    isProfileBoosterChecked,
    isSymbolCodeCurrency,
    finalAmount: amount = 0,
    cartId,
    accessToken,
    mopId,
    mopName,
  } = props;
  const cartSubmitProps = { cartId, accessToken, mopId, mopName };
  const { currency: approxCurrency = '', shaadi_care: shaadiCare = 0, spotlight = 0, value: approxAmount = 0 } = paypalConvertedAmount;
  const buttonText = 'Make Payment';
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
  };
  const paypalFormProps = {
    totalPayableProps,
    cartSubmitProps,
  };
  return (
    <s.CartContent id="pay_paypal">
      <PaypalForm {...paypalFormProps} />
    </s.CartContent>
  );
};
Paypal.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.cartCommonProps,
};

export default Paypal;
