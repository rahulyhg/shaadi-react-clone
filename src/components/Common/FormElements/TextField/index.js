import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import s from '../styles';

const styles = theme => ({
  input: {
    display: theme.canHideInput ? 'none' : undefined,
    textAlign: theme.textAlign,
    height: theme.height,
    padding: theme.padding,
    width: theme.width,
    overflow: theme.overflow,
  },
  root: {
    padding: theme.rootPadding,
    height: theme.rootHeight,
  },
});

const TextField = props => {
  const {
    disableAutoComplete,
    autoComplete,
    autoFocus,
    className,
    defaultValue,
    fullWidth,
    helperText,
    id,
    FormHelperTextProps,
    InputLabelProps,
    inputProps,
    InputProps,
    inputRef,
    label,
    multiline,
    name,
    onBlur,
    onChange,
    onFocus,
    onClick,
    onMouseDown,
    onFormControlMouseDown,
    onKeyDown,
    placeholder,
    required,
    rows,
    rowsMax,
    type,
    value,
    isDisabled,
    isReadOnly,
    canShowError: error,
    noMargin,
    extraElement,
  } = props;
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const textfield = (
    <Fragment>
      {disableAutoComplete && (
        <input type={type} id={`${id}_fake`} name={`${name}_fake`} style={{ display: 'none' }} data-formisimo-hidden="true" />
      )}
      <FormControl
        aria-describedby={helperTextId}
        className={className}
        error={error}
        fullWidth={fullWidth}
        required={required}
        onMouseDown={onFormControlMouseDown}
        disabled={isDisabled}
      >
        {label && (
          <InputLabel htmlFor={id} disabled={isDisabled} error={error} {...InputLabelProps}>
            {label}
          </InputLabel>
        )}
        <Input
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          fullWidth={fullWidth}
          multiline={multiline}
          name={name}
          rows={rows}
          rowsMax={rowsMax}
          type={type}
          value={value}
          id={id}
          placeholder={placeholder}
          inputProps={{
            readOnly: isReadOnly,
            className: props.classes.input,
            pattern: props.pattern,
            ...inputProps,
          }}
          inputRef={inputRef}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
          className={props.classes.root}
          {...InputProps}
        />
        {extraElement}
      </FormControl>
      {helperText && (
        <FormHelperText error={error} id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </Fragment>
  );
  return props.noWrap ? textfield : <s.TextFieldsWrap noMargin={noMargin}>{textfield}</s.TextFieldsWrap>;
};

TextField.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  canShowError: PropTypes.bool.isRequired,
  multiline: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  noMargin: PropTypes.bool,
  noWrap: PropTypes.bool,
  disableAutoComplete: PropTypes.bool,

  autoComplete: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  helperText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]),
  extraElement: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]),
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,

  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  FormHelperTextProps: PropTypes.shape({}),
  InputLabelProps: PropTypes.shape({}),
  inputProps: PropTypes.shape({}),
  InputProps: PropTypes.shape({}),
  classes: PropTypes.shape({ input: PropTypes.string, root: PropTypes.string }).isRequired,

  inputRef: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onFormControlMouseDown: PropTypes.func,
  onKeyDown: PropTypes.func,
};

TextField.defaultProps = {
  required: false,
  fullWidth: false,
  multiline: false,
  autoFocus: false,
  disableAutoComplete: true,
  isDisabled: false,
  canShowError: false,
  isReadOnly: false,
  noMargin: false,
  noWrap: false,
  label: '',
  extraElement: '',
  value: '',
  name: '',
  id: '',
  className: '',
  placeholder: '',
  helperText: '',
  type: 'text',
  autoComplete: 'disable-chrome-autofill',
  defaultValue: undefined,
  pattern: undefined,
  rows: undefined,
  rowsMax: undefined,
  inputRef: undefined,
  onChange: undefined,
  onClick: undefined,
  FormHelperTextProps: undefined,
  InputLabelProps: undefined,
  inputProps: undefined,
  InputProps: undefined,
  onBlur: undefined,
  onFocus: undefined,
  onMouseDown: undefined,
  onFormControlMouseDown: undefined,
  onKeyDown: undefined,
};

export default withStyles(styles)(TextField);
