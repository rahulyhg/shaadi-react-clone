import PropTypes from 'prop-types';
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './payment-style.css';

const BackToTop = ({ show }) => (
  <AnchorLink href="#payment_header">
    <div className={show ? `bounce_arrow` : `bounce_arrow display_bounce_off`} id="bubble_icon">
      <span className="bounce_arrow_icon" />
    </div>
  </AnchorLink>
);
BackToTop.propTypes = {
  show: PropTypes.bool.isRequired,
};
export default BackToTop;
