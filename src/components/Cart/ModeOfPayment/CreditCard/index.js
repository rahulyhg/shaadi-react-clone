import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import CreditCardForm from './CreditCardForm';
import CreditCardJusPayForm from './JusPayForm/CreditCardJusPayForm';

const CreditCard = props => {
  const {
    currency = '',
    settings: { ccConvertedAmount },
    isShaadiCareChecked,
    isProfileBoosterChecked,
    isSymbolCodeCurrency,
    finalAmount: amount = 0,
    cartPageExperiment,
    tab,
    cartId,
    accessToken,
    mopId,
    mopName,
    paymentActionHandler,
    orderId,
    juspayAB,
  } = props;
  const cartSubmitProps = { cartId, accessToken, mopId, mopName };
  const { currency: approxCurrency = '', shaadi_care: shaadiCare = 0, spotlight = 0, value: approxAmount = 0 } = ccConvertedAmount;
  const buttonText = cartPageExperiment && cartPageExperiment === 'C' ? 'Next' : 'Pay Now';
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
  const creditCardFormProps = {
    totalPayableProps,
    cartSubmitProps,
    tab,
    currency,
  };
  const showJusPayForm = !!(juspayAB === 'B' && currency === 'INR');
  return (
    <s.CartContent id="credit_debit_card">
      {!showJusPayForm && <CreditCardForm {...creditCardFormProps} />}
      {showJusPayForm && <CreditCardJusPayForm orderId={orderId} paymentActionHandler={paymentActionHandler} {...creditCardFormProps} />}
    </s.CartContent>
  );
};
CreditCard.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.cartCommonProps,
  cartPageExperiment: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  orderId: PropTypes.shape(PropTypes.cartOrderId).isRequired,
  juspayAB: PropTypes.string.isRequired,
};
export default CreditCard;
