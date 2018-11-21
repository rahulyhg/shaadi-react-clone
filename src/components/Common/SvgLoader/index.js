import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const SvgLoader = props => (
  <s.SvgLoader isPremiumCarousel={props.isPremiumCarousel} isVisible={props.isVisible}>
    <s.SvgPath viewBox="25 25 50 50" isBigLoader={props.isBigLoader}>
      <s.SvgCircle isPaymentLoader={props.isPaymentLoader} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
    </s.SvgPath>
  </s.SvgLoader>
);

SvgLoader.defaultProps = {
  isVisible: false,
  isPremiumCarousel: false,
  isPaymentLoader: false,
  isBigLoader: false,
};

SvgLoader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isPremiumCarousel: PropTypes.bool,
  isPaymentLoader: PropTypes.bool,
  isBigLoader: PropTypes.bool,
};

export default SvgLoader;
