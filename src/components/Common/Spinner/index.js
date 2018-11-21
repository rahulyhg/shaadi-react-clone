import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const Spinner = props => {
  switch (props.type) {
    case 'gif':
      return (
        <s.Spinner isVisible={props.isVisible}>
          <s.SpinIcon />
          {props.text && <span>{props.text}</span>}
        </s.Spinner>
      );
    case 'svg': {
      const diameter = props.size;
      const radius = props.size / 2;
      return (
        <s.spinnerLoader size={`${props.size}px`} viewBox={`${radius} ${radius} ${diameter} ${diameter}`} isVisible={props.isVisible}>
          <s.spinnerCircle
            cx={diameter}
            cy={diameter}
            r={radius - 1}
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
            color={props.color}
          />
        </s.spinnerLoader>
      );
    }
    // no default
  }
  return null;
};

Spinner.defaultProps = {
  isVisible: false,
  text: '',
  type: 'gif',
  color: '#fff',
  size: 50,
};

Spinner.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['gif', 'svg']),
  text: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Spinner;
