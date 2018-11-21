import React from 'react';
import PropTypes from '../../../PropTypes';
import TextField from './TextField';

const DrawerTextField = props => (
  <TextField
    {...props}
    InputProps={{
      disableUnderline: true,
      ...props.InputProps,
    }}
    label={''}
    canShowError={false}
  />
);

DrawerTextField.defaultProps = {
  inputProps: {},
  isFocused: false,
  InputProps: undefined,
  InputLabelProps: undefined,
};

DrawerTextField.propTypes = {
  InputProps: PropTypes.shape({}),
  inputProps: PropTypes.shape({}),
};

export default DrawerTextField;
