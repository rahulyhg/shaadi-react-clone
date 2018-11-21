import PropTypes from 'prop-types';
import React from 'react';
import './payment-style.css';

const ErrorMessage = ({ message }) => (
  <div className={message !== '' ? 'error_wrapper' : 'error_wrapper display_off'}>
    <div className="error_message">{message}</div>
  </div>
);
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
export default ErrorMessage;
