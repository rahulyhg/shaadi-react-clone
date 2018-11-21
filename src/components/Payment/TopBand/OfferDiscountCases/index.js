import PropTypes from 'prop-types';
import React from 'react';
import DisplayAmount from '../../../Common/DisplayAmount';
import PaymentTicker from '../../../Common/PaymentTicker';
import Discount from './discount';
import s from '../styles';
import getUnixToFormat from '../../../../helpers/getUnixToFormat';

const returnIcon = type =>
  ['justforu', 'birthday-free'].includes(type) ? type === 'justforu' ? <s.JustForYou /> : <s.BirthdayIcon /> : '';
const validTillText = (expiry, showTicker) => {
  if (!showTicker) {
    return <React.Fragment>Valid till {getUnixToFormat(expiry, 'Do MMMM')}</React.Fragment>;
  }
  return (
    <React.Fragment>
      Expires in&nbsp;<PaymentTicker target_time={Number(expiry)} />
    </React.Fragment>
  );
};
const discountVal = (discountType, discount, currency) =>
  discountType === 'perc' ? `${discount}%` : <DisplayAmount amount={discount} currency={currency} />;
const OfferDiscountCases = ({ type, maxDiscount, discountType, showTicker, validTill, isOldPrice, currency, html }) => {
  const discountText = discountVal(discountType, maxDiscount, currency);
  const validTillContent = validTillText(validTill, showTicker);
  const discountProps = { type, discountText, validTillContent, isOldPrice, html };
  return (
    <s.OfferWrapper>
      {returnIcon(type)}
      <Discount {...discountProps} />
    </s.OfferWrapper>
  );
};
OfferDiscountCases.defaultProps = {
  type: '',
  maxDiscount: 0,
  discountType: '',
  showTicker: false,
  validTill: '',
  isOldPrice: false,
  currency: '',
  html: '',
};
OfferDiscountCases.propTypes = {
  type: PropTypes.string.isRequired,
  maxDiscount: PropTypes.number.isRequired,
  discountType: PropTypes.string.isRequired,
  showTicker: PropTypes.bool.isRequired,
  validTill: PropTypes.string.isRequired,
  isOldPrice: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};
export default OfferDiscountCases;
