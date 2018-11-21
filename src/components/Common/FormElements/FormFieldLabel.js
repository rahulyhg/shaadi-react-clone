import React from 'react';
import PropTypes from 'prop-types';
import MandatoryLabel from '../MandatoryLabel';

const FormFieldLabel = ({ isRequired, label }) => (isRequired ? <MandatoryLabel>{label}</MandatoryLabel> : label);

FormFieldLabel.defaultProps = {
  isRequired: false,
};

FormFieldLabel.propTypes = {
  isRequired: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormFieldLabel;
