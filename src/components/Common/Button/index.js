import PropTypes from 'prop-types';
import React from 'react';

const Button = props => {
  const { className, onClick, children, isVisible } = props;
  if (isVisible === false) {
    return <span />;
  }
  return <input type="button" value={children} onClick={onClick} className={className} />;
};

Button.defaultProps = {
  isVisible: true,
  className: '',
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
