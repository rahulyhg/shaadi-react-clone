import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const Chips = props =>
  props.values.map((value, key) => (
    <Chip
      key={`chips_${value.label || value}_${Math.random().toString(16)}`}
      avatar={value.avatar}
      label={value.label || value}
      onDelete={props.onDelete(value)}
    />
  ));

Chips.defaultProps = {
  values: [],
  onDelete() {},
};

Chips.propTypes = {
  onDelete: PropTypes.func,
  values: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        avatar: PropTypes.node,
      }),
    ),
  ]),
};

export default Chips;
