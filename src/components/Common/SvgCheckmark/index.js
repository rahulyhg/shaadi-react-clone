import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const SvgCheckmark = props => (
  <s.CheckmarkWrap isVisible={props.isVisible} isPremiumCarousel={props.isPremiumCarousel}>
    <s.SvgStrokeWrap
      viewBox="2293 334 44 44"
      version="1.1"
      width={props.isDropdownWidget || props.isListingSvg ? `12` : `16`}
      height={props.isDropdownWidget || props.isListingSvg ? `12` : `16`}
    >
      <s.SvgStroke
        id="checkbox-tick"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(2293.000000, 334.000000)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <s.SvgPolyline
          id="Shape"
          stroke="#7cc04a"
          strokeWidth={props.isDropdownWidget ? `6` : `8`}
          points="42 7 13.7647059 37 2 20.6607143"
        />
      </s.SvgStroke>
    </s.SvgStrokeWrap>
  </s.CheckmarkWrap>
);

SvgCheckmark.defaultProps = {
  isVisible: false,
  isDropdownWidget: false,
  isListingSvg: false,
  isPremiumCarousel: false,
};

SvgCheckmark.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isDropdownWidget: PropTypes.bool.isRequired,
  isListingSvg: PropTypes.bool.isRequired,
  isPremiumCarousel: PropTypes.bool.isRequired,
};

export default SvgCheckmark;
