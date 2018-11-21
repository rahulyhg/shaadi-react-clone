import { PureComponent } from 'react';
import isUndefined from 'lodash/isUndefined';
import trim from 'lodash/trim';
import PropTypes from '../../../PropTypes';

class ControlledInput extends PureComponent {
  static getDerivedStateFromProps = (nextProps, prevState) => {
    const canShowError = !prevState.isFocused && !isUndefined(nextProps.canShowError) ? nextProps.canShowError : prevState.canShowError;
    return {
      value:
        !prevState.isFocused && !isUndefined(nextProps.value) && nextProps.value !== prevState.value && !nextProps.isUncontrolled
          ? nextProps.value
          : prevState.value,
      canShowError,
    };
  };
  state = {
    value: trim(this.props.value) || '',
    isFocused: false,
    canShowError: false,
    isFocusedOut: true,
    errorsFor: [],
    isDirty: false,
    isChangedEvent: false,
    upKeyPressedCount: 0,
    downKeyPressedCount: 0,
    isTabKeyPressed: false,
    isEnterKeyPressed: false,
  };
  // prevent HTML5 Validation
  onInvalid = event => this.props.allowHtml5Validation;
  onFocus = event => {
    this.setState(
      {
        isFocused: true,
        canShowError: false,
        isFocusedOut: false,
        isChangedEvent: false,
        upKeyPressedCount: 0,
        downKeyPressedCount: 0,
        valueOnFocus: event.target.value,
        hasValueChanged: false,
        ...this.preventAutoFillOrAutoComplete(),
      },
      () => {
        this.props.afterFocus({ ...this, ...this.props, ...this.state });
      },
    );
  };
  onBlur = event => {
    const value = this.state.value.replace(!this.props.allowTrailingSpace && /[ ]+$/g, '');
    const hasValueChanged = this.state.valueOnFocus !== value;
    /* (hasValueChanged || !this.state.isInteracted) && */ this.validate();
    this.setState(
      {
        isFocused: false,
        isFocusedOut: true,
        isChangedEvent: false,
        upKeyPressedCount: 0,
        downKeyPressedCount: 0,
        isTabKeyPressed: false,
        isInteracted: true,
        name: this.props.name,
        id: this.props.id,
        value,
        hasValueChanged,
      },
      () => {
        this.props.afterBlur({ ...this, ...this.props, ...this.state, value });
      },
    );
  };
  onChange = event => {
    this.setState(
      {
        isChangedEvent: true,
        upKeyPressedCount: 0,
        downKeyPressedCount: 0,
        isDirty: true,
        option: undefined,
        value: this.getControlledValue(event.target.value),
      },
      () => {
        this.props.afterInputChange({ ...this, ...this.props, ...this.state });
      },
    );
  };
  onKeyDown = event => {
    this.setState(state => ({ isEnterKeyPressed: false }));
    switch (event.keyCode) {
      case 38: {
        event.preventDefault();
        this.handleUpKeyPress(event);
        break;
      }
      case 40: {
        event.preventDefault();
        this.handleDownKeyPress(event);
        break;
      }
      case 9:
        this.handleTabKeyPress(event);
        break;
      case 13:
        event.preventDefault();
        this.handleEnterKeyPress(event);
        break;
      case 32:
        this.handleSpaceKeyPress(event);
        break;
      default:
        break;
    }
  };
  setInputState = (setNewState, afterStateUpdate) => this.setState(setNewState, afterStateUpdate);
  getControlledValue = value => {
    let controlledValue = value;
    controlledValue = controlledValue.replace(!this.props.allowLetters && this.regex.replaceLetters, '');
    controlledValue = controlledValue.replace(this.props.allowNumbersOnly && this.regex.replaceNonNumbersCharacs, '');
    controlledValue = controlledValue.replace(!this.props.allowHyphens && this.regex.replaceHyphens, '');
    controlledValue = controlledValue.replace(!this.props.allowSpecialCharacs && this.regex.replaceSpecialCharacs, '');
    controlledValue = controlledValue.substr(0, (!this.props.canExceedMaxLength && this.props.maxLength) || value.length);
    controlledValue = controlledValue.replace(new RegExp(this.props.regex), '');
    return controlledValue;
  };
  preventAutoFillOrAutoComplete = () =>
    this.props.preventAutoFillOrAutoComplete && {
      id: undefined,
      name: undefined,
    };
  handleTabKeyPress = event => this.setState(state => ({ isTabKeyPressed: true }));
  handleEnterKeyPress = event => this.setState(state => ({ isEnterKeyPressed: true }));
  handleDownKeyPress = event => this.setState(state => ({ downKeyPressedCount: state.downKeyPressedCount + 1 }));
  handleSpaceKeyPress = event => {
    this.isEmpty() && !this.props.allowLeadingSpace && event.preventDefault();
    !this.props.allowSpaces && event.preventDefault();
  };
  handleUpKeyPress = event => this.setState(state => ({ upKeyPressedCount: state.upKeyPressedCount + 1 }));
  validate = () => {
    this.setState({ errorsFor: [] });
    this.validateForIsRequired();
    this.validateForMinLength();
    this.validateForMaxLength();
    this.validateForPattern();
    this.props.customValidation({ ...this, ...this.props, ...this.state });
    this.props.afterValidation({ ...this, ...this.props, ...this.state });
  };
  validateForPattern = () =>
    this.props.pattern &&
    !new RegExp(this.props.pattern).test(this.state.value) &&
    this.setState(state => ({ errorsFor: [...state.errorsFor, 'pattern'] }));
  validateForMaxLength = () =>
    this.props.maxLength &&
    this.state.value.length > this.props.maxLength &&
    this.setState(state => ({ errorsFor: [...state.errorsFor, 'maxLength'] }));
  validateForMinLength = () =>
    this.props.minLength &&
    this.state.value.length < this.props.minLength &&
    this.setState(state => ({ errorsFor: [...state.errorsFor, 'minLength'] }));
  validateForIsRequired = () =>
    this.isEmpty() && this.props.isRequired && this.setState(state => ({ errorsFor: [...state.errorsFor, 'required'] }));
  isNonEmpty = () => !this.isEmpty();
  isEmpty = () => !this.state.value.trim();
  inputRef = element => {
    this.inputElement = element;
    this.props.inputRef(element);
  };
  focusOut = () => this.inputElement && this.inputElement.blur();
  focus = () => this.inputElement && this.inputElement.focus();
  toogleFocus = () => (this.state.isFocused ? this.inputElement.blur() : this.inputElement.focus());
  regex = {
    replaceLetters: /[a-z]/gi,
    replaceNonNumbersCharacs: /[^0-9]/g,
    replaceSpecialCharacs: /[^a-z0-9]/gi,
    replaceHyphens: /[-]/g,
  };
  canShowError = () =>
    this.state.isFocusedOut && !this.props.isDisabled && (this.isInvalid() || this.state.canShowError) && !this.props.hideError;
  hasError = () => !!this.state.errorsFor.length;
  hasErrors = () => this.state.errorsFor.length > 1;
  isInvalid = () => (this.props.isInputInvalid ? this.props.isInputInvalid({ ...this, ...this.props, ...this.state }) : this.hasError());
  isValid = () => !this.isInvalid();
  render = () =>
    this.props.children({
      ...this.state,
      setInputValue: this.setInputValue,
      setUpKeyPressedCount: this.setUpKeyPressedCount,
      setDownKeyPressedCount: this.setDownKeyPressedCount,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onClick: this.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseOver: this.onMouseOver,
      onMouseLeave: this.onMouseLeave,
      onMouseOut: this.onMouseOut,
      isMulti: this.props.isMulti,
      onInvalid: this.onInvalid,
      inputRef: this.inputRef,
      focus: this.focus,
      focusOut: this.focusOut,
      toogleFocus: this.toogleFocus,
      canShowError: this.canShowError,
      hasError: this.hasError,
      hasErrors: this.hasErrors,
      isValid: this.isValid,
      isInvalid: this.isInvalid,
      setInputState: this.setInputState,
    });
}

ControlledInput.defaultProps = {
  options: [],
  maxLength: 0,
  minLength: 0,
  value: undefined,
  pattern: '',
  regex: '',
  id: '',
  name: '',
  allowLeadingSpace: false,
  allowTrailingSpace: false,
  allowSpecialCharacs: true,
  allowNumbersOnly: undefined,
  allowLetters: true,
  allowHtml5Validation: false,
  canExceedMaxLength: false,
  isRequired: false,
  allowHyphens: true,
  allowSpaces: true,
  isMulti: false,
  hideError: false,
  isDisabled: false,
  preventAutoFillOrAutoComplete: false,
  children() {},
  afterInputChange() {},
  inputRef() {},
  customValidation() {},
  afterValidation() {},
  afterBlur() {},
  afterFocus() {},
  isInputInvalid: undefined,
};

ControlledInput.propTypes = {
  maxLength: PropTypes.number.isRequired,
  minLength: PropTypes.number.isRequired,
  value: PropTypes.string,
  pattern: PropTypes.string,
  regex: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  allowLeadingSpace: PropTypes.bool.isRequired,
  allowTrailingSpace: PropTypes.bool.isRequired,
  allowSpecialCharacs: PropTypes.bool.isRequired,
  allowNumbersOnly: PropTypes.bool,
  allowLetters: PropTypes.bool.isRequired,
  allowHtml5Validation: PropTypes.bool.isRequired,
  canExceedMaxLength: PropTypes.bool.isRequired,
  isRequired: PropTypes.bool.isRequired,
  allowHyphens: PropTypes.bool.isRequired,
  allowSpaces: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool,
  hideError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  preventAutoFillOrAutoComplete: PropTypes.bool,
  children: PropTypes.func.isRequired,
  customValidation: PropTypes.func,
  afterInputChange: PropTypes.func,
  inputRef: PropTypes.func,
  afterValidation: PropTypes.func,
  afterBlur: PropTypes.func,
  afterFocus: PropTypes.func,
  isInputInvalid: PropTypes.func,
};

export default ControlledInput;
