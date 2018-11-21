import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from './CheckboxFields';

const CheckboxWithLabel = ({ label, ...props }) => <FormControlLabel control={<Checkbox {...props} />} label={label} />;

CheckboxWithLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
};

export default CheckboxWithLabel;
