import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const Switch = props => (
  <s.Switch>
    <s.Input type="checkbox" checked={props.value} onChange={props.onChange} />
    <s.Slider />
  </s.Switch>
);

Switch.defaultProps = {
  value: false,
};

Switch.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
