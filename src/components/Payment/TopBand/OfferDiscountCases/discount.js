import PropTypes from 'prop-types';
import React from 'react';
import unescape from 'lodash/unescape';
import HtmlToReact from '../../../Common/HtmlToReact';
import FontBold from '../../../Common/FontBold';

const Discount = ({ type, discountText, validTillContent, isOldPrice, html }) => (
  <React.Fragment>
    {type === '' &&
      ((html !== '' && <HtmlToReact html={unescape(unescape(html))} />) || <React.Fragment>Save upto {discountText}</React.Fragment>)}
    {type === 'justforu' && (
      <React.Fragment>
        <FontBold>Save {discountText}</FontBold> on all premium plans. Offer valid only for today
      </React.Fragment>
    )}
    {type === 'birthday-free' && (
      <React.Fragment>
        <FontBold>Happy Birthday! Save {discountText}</FontBold> on any Premium plan!!!
      </React.Fragment>
    )}
    {type === 'bigday' && (
      <React.Fragment>
        Save upto <FontBold>{discountText}</FontBold>. Offer valid for today
      </React.Fragment>
    )}
    {type === 'CartSweetner' && (
      <React.Fragment>
        Complete your order <FontBold>{discountText} !!!</FontBold> Hurry, this offer expires today
      </React.Fragment>
    )}
    {type === 'renewal-member' &&
      !isOldPrice && (
        <React.Fragment>
          Renew at a Special Price. <FontBold>Save upto {discountText}!</FontBold>
        </React.Fragment>
      )}
    {type === 'renewal-member' &&
      isOldPrice && (
        <React.Fragment>
          Renew now to get your <FontBold>Old Price!</FontBold>
        </React.Fragment>
      )}
    {(type === 'lifecycle-bigday' || type === 'fishnet') && (
      <FontBold>
        Save upto {discountText}. {validTillContent}
      </FontBold>
    )}
  </React.Fragment>
);
Discount.defaultProps = {
  type: '',
  discountText: {
    amount: 0,
    currency: '',
    fractionAllowed: 0,
  },
  validTillContent: {
    children: [],
  },
  isOldPrice: false,
  html: '',
};
Discount.propTypes = {
  type: PropTypes.string.isRequired,
  discountText: PropTypes.oneOfType([
    PropTypes.shape({
      amount: PropTypes.number,
      currency: PropTypes.string,
      fractionAllowed: PropTypes.number,
    }),
    PropTypes.string,
  ]).isRequired,
  validTillContent: PropTypes.shape({
    children: PropTypes.array,
  }).isRequired,
  isOldPrice: PropTypes.bool.isRequired,
  html: PropTypes.string.isRequired,
};
export default Discount;
