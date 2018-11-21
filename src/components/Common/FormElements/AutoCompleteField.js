import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from '../../../PropTypes';
import TextField from './TextField';
import DesktopOptionsListing from './DesktopOptionsListing';
import ControlledInput from './ControlledInput';
import Arrow from './Arrow';
import Relative from '../../../theme/Relative';
import Absolute from '../../../theme/Absolute';

const focusInput = controlledInput => event => {
  event.stopPropagation();
  event.preventDefault();
  controlledInput.focus();
};

const toggleInputFocus = (controlledInput, isFocused) => event => {
  event.preventDefault();
  event.stopPropagation();
  controlledInput.toogleFocus();
};

const AutoCompleteField = props => (
  <ControlledInput {...props} preventAutoFillOrAutoComplete={!!props.options}>
    {controlledInput => (
      <Fragment>
        <Relative onMouseDown={focusInput(controlledInput)}>
          <TextField
            {...props}
            {...controlledInput}
            canShowError={controlledInput.canShowError()}
            helperText={props.helperText || (controlledInput.canShowError() ? props.getErrorMsg() : undefined)}
            extraElement={
              props.isLoading ? (
                <Absolute color="#ff5a60" bottom="7px" right="5px" width="20px" height="20px">
                  <CircularProgress size={19} color="inherit" />
                </Absolute>
              ) : (
                !props.hideArrow && (
                  <Arrow
                    direction={controlledInput.isFocused ? 'up' : 'down'}
                    {...props}
                    canShowError={controlledInput.canShowError()}
                    onMouseDown={toggleInputFocus(controlledInput)}
                  />
                )
              )
            }
          />
          <DesktopOptionsListing {...props} {...controlledInput} isVisible={controlledInput.isFocused} />
        </Relative>
      </Fragment>
    )}
  </ControlledInput>
);

AutoCompleteField.defaultProps = {
  value: '',
  id: '',
  helperText: '',
  isLoading: false,
  alwaysShowOptions: false,
  hasError: false,
  hideArrow: false,
  options: undefined,
  maxHeight: '228px',
  dropDownWidth: '100%',
  getErrorMsg: () => 'Oops! You seem to have missed this',
};

AutoCompleteField.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  helperText: PropTypes.string,
  maxHeight: PropTypes.string,
  dropDownWidth: PropTypes.string,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  alwaysShowOptions: PropTypes.bool,
  hideArrow: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])),
  getErrorMsg: PropTypes.func,
};

export default AutoCompleteField;
