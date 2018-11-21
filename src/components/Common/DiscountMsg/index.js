/* eslint-disable camelcase */
import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

const DiscountMsg = props => {
  const { offer_details } = props;

  if (offer_details === undefined || offer_details === null) {
    return null;
  }
  const percentTypeDiscount =
    offer_details && offer_details.length > 0 && (offer_details.filter(eachOffer => eachOffer.type === 'perc')[0] || '');

  switch (props.bannerType) {
    case 'dashboard':
    case 'listbanner':
      if (Object.keys(percentTypeDiscount).length > 0) {
        return (
          <s.premiumBannerSave showBorder={['dashboard'].includes(props.bannerType)}>
            Save upto <s.premiumGreen>{percentTypeDiscount.value}%</s.premiumGreen> today!
          </s.premiumBannerSave>
        );
      }
      return null;
    case 'premiumbanner':
      if (Object.keys(percentTypeDiscount).length > 0) {
        return (
          <s.SavePremiumTxt>
            Save upto <span>{percentTypeDiscount.value}%</span> off on Premium Plans!
          </s.SavePremiumTxt>
        );
      }
      return null;
    default:
      return null;
  }
};

DiscountMsg.defaultProps = {
  bannerType: null,
};

DiscountMsg.propTypes = {
  offer_details: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      currency: PropTypes.string,
    }),
  ).isRequired,
  bannerType: PropTypes.string,
};

export default DiscountMsg;
