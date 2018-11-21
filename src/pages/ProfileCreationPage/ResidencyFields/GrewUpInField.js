import React, { PureComponent } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../../PropTypes';
import withDeviceInfo from '../../../components/HOC/withDeviceInfo';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import canShowNationalityFields from '../utils/canShowNationalityFields';
import Chips from '../../../components/Common/FormElements/Chips';
import ShowHide from '../../../components/HOC/ShowHide';
import getOptGrp from '../../../helpers/getOptGrp';
import Wrapper from '../../../theme/Wrapper';
import api from '../../../api';

class GrewUpInField extends PureComponent {
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    drawerValue: !nextProps.history.location.hash.includes('drawer-grewUpIn') ? nextProps.values : prevState.drawerValue,
  });
  state = {
    options: [],
    isLoading: true,
    isFocused: false,
    drawerValue: this.props.values,
  };
  componentDidMount = () => {
    this.props.default && this.props.updateInputState('grewUpIn')({ values: '', default: false });
    api.get('/lookup/country', { params: { listType: 'frequent' } }).then(response =>
      this.setState({
        options: getOptGrp({
          ...response.data[0],
          ...response.data[1],
          frequentLabel: 'Frequently Used',
          otherLabel: 'All Countries',
        }),
        isLoading: false,
      }),
    );
  };
  componentWillUnmount = () => this.props.updateInputState('grewUpIn')({ canShowError: false });
  onFormControlMouseDown = event => {
    // @todo find a better solution than this
    if (!event.target.type) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  onChipRemove = valueToRemove => event => {
    event.preventDefault();
    event.stopPropagation();
    const values = this.values;
    const indexToSlice = values.findIndex(value => value === valueToRemove);
    values.splice(indexToSlice, 1);
    const value = values.join(',');
    this.setState({ drawerValue: value });
    this.props.updateInputState('grewUpIn')({ values: value, canShowError: value ? undefined : true });
  };
  onOptionSelection = (option, controlledInput) => {
    const { value } = option;
    const existingValue = this.valueParam;
    const selectedOptions = existingValue ? existingValue.split(',') : [];
    const deselectOptIndex = selectedOptions.findIndex(opt => opt === value);
    if (deselectOptIndex === -1) {
      selectedOptions.push(value);
    } else {
      selectedOptions.splice(deselectOptIndex, 1);
    }
    const values = selectedOptions.join(',');
    controlledInput.setInputState({ errorsFor: [], value: '' });
    if (this.isDrawerOpen()) {
      this.setState({ drawerValue: values });
      return;
    }
    this.props.updateInputState('grewUpIn')({ values, isValid: true, canShowError: undefined, value: '' });
  };
  onDone = values => this.props.updateInputState('grewUpIn')({ values, canShowError: undefined });
  getChips = values => (
    <Wrapper width="94%">
      <Chips values={values.split(',')} onDelete={this.onChipRemove} />
    </Wrapper>
  );
  get valueParam() {
    return this.isDrawerOpen() ? this.state.drawerValue : this.props.values;
  }
  get values() {
    return this.valueParam.split(',');
  }
  get drawerChips() {
    return this.state.drawerValue && this.getChips(this.state.drawerValue);
  }
  get chips() {
    return this.props.values && this.getChips(this.props.values);
  }
  get noResultsText() {
    return this.isMaxSelected ? 'You can select only 5 countries' : undefined;
  }
  get isMaxSelected() {
    return this.values.length === 5;
  }
  get placeholder() {
    return this.state.isFocused ? 'Search here' : '';
  }
  get platFormSpecificProps() {
    if (this.props.isMobile()) {
      return {
        inputRef: this.props.inputRef,
      };
    }
    return {
      afterFocus: this.afterFocus,
      afterBlur: this.afterBlur,
      inputRef: this.setInputRef,
      placeholder: this.placeholder,
    };
  }
  get drawerProps() {
    return {
      InputProps: { startAdornment: this.drawerChips },
      inputRef: this.setDrawerInputRef,
      placeholder: this.isMaxSelected ? '' : 'Search here',
    };
  }
  get drawerTheme() {
    return {
      height: this.isMaxSelected ? '0px' : '',
      padding: this.isMaxSelected ? '0px' : '',
      rootPadding: '5px 0 0',
    };
  }
  getOptionLabel = option => option.label || option.id;
  getOptionValue = option => option.options || option.id;
  getInputHeight = () => (this.canHideInput() ? '0px' : undefined);
  setInputRef = element => {
    this.inputRef = element;
    this.props.inputRef(element);
  };
  setDrawerInputRef = element => {
    this.inputRef = element;
  };
  focusInput = event => {
    this.inputRef.focus();
  };
  afterFocus = ({ setInputState }) => {
    this.setState({ isFocused: true });
    setInputState({ option: undefined });
  };
  canShrinkLabel = () => !!this.props.values || this.state.isFocused || !!this.props.value;
  isDrawerOpen = () => this.props.history.location.hash.includes('drawer-grewUpIn');
  isSelected = ({ option, values, value }) => values.split(',').includes(option.label);
  canHideInput = () => this.isMaxSelected || (!this.props.value && (!!this.props.values && !this.state.isFocused));
  afterBlur = controlledInput => {
    const { value, option, setInputState } = controlledInput;
    this.setState({ isFocused: false });
    if (option) {
      return;
    }
    const errorsFor = [];
    if (value) {
      errorsFor.push('option');
      this.props.updateInputState('grewUpIn')({ value });
    } else if (this.props.value) {
      this.props.updateInputState('grewUpIn')({ value: '' });
    } else if (!this.props.values) {
      errorsFor.push('required');
    }
    setInputState({ errorsFor, isValid: !errorsFor.length });
  };
  afterValidation = ({ setInputState, option }) => option && setInputState({ errorsFor: [] });
  updateInputWith = option => '';
  render = () => (
    <MuiThemeProvider
      theme={{
        height: this.getInputHeight(),
        padding: this.getInputHeight(),
        rootPadding: this.canShrinkLabel() ? '7px 0 0' : '',
      }}
    >
      <Wrapper onClick={!this.props.isMobile() ? this.focusInput : undefined}>
        <ResponsiveFormFieldWithOptions
          name="grewUpIn"
          id="grewUpIn"
          maxLength={100}
          maxSelect={5}
          label={`${this.props.getHeOrSheOrYou()} grew up in`}
          noResultsText={this.noResultsText}
          placeholder={this.placeholder}
          InputProps={{ startAdornment: this.chips }}
          InputLabelProps={{
            shrink: this.canShrinkLabel(),
            focused: this.state.isFocused,
          }}
          isMulti
          isMultiColumn
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isReadOnly={!this.props.isMobile() && this.canHideInput()}
          onDone={this.onDone}
          isSelected={this.isSelected}
          drawerProps={this.drawerProps}
          drawerTheme={this.drawerTheme}
          {...this.state}
          {...this.props}
          {...this.platFormSpecificProps}
          options={this.isMaxSelected ? [] : this.state.options}
          onOptionSelection={this.onOptionSelection}
          onFormControlMouseDown={this.onFormControlMouseDown}
          updateInputWith={this.updateInputWith}
          afterValidation={this.afterValidation}
        />
      </Wrapper>
    </MuiThemeProvider>
  );
}

GrewUpInField.defaultProps = {
  inputRef() {},
};

GrewUpInField.propTypes = {
  updateInputState: PropTypes.func.isRequired,
  getHeOrSheOrYou: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  isMobile: PropTypes.func.isRequired,
  default: PropTypes.bool.isRequired,
  values: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  history: PropTypes.shape(PropTypes.history).isRequired,
};

const getContext = context => {
  const isVisible =
    !context.user.isSAARCCountry() &&
    (!context.user.isNRIPlusCountry() || canShowNationalityFields(context.form.livingSince.value, context.user.birthYear));
  !isVisible &&
    !context.form.grewUpIn.default &&
    context.form.updateInputState('grewUpIn')({ values: context.user.country, default: true });
  return {
    ...context.form.grewUpIn,
    isVisible,
    updateInputState: context.form.updateInputState,
    getHeOrSheOrYou: context.user.getHeOrSheOrYou,
    isRequired: true,
    country: context.user.country,
    isValid: !!context.form.grewUpIn.values && !context.form.grewUpIn.value,
  };
};

export default withRouter(withContextConsumer({ contextToFetch: getContext })(ShowHide(withDeviceInfo(GrewUpInField))));
