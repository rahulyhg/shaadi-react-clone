import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import getCountryISO from '../../../helpers/getCountryISO';
import ShowHide from '../../../components/HOC/ShowHide';
import api from '../../../api';

class ZipField extends PureComponent {
  state = {
    options: [],
    isLoading: false,
  };
  componentDidMount = () => this.fetchOptions(this.props.code, this.setOptionsOnLoad);
  componentDidUpdate = prevProps => {
    !prevProps.isDisabled &&
      this.props.isDisabled &&
      this.props.updateInputState({ value: '', code: '', googleCityId: '', canShowError: false, hideError: true });
    prevProps.isDisabled && !this.props.isDisabled && this.props.updateInputState({ canShowError: undefined, hideError: undefined });
  };
  setOptions = response => this.setState({ options: response.data, isLoading: false });
  setOptionsOnLoad = response => {
    const { postal, code } = response.data[0];
    if (code === this.props.value) {
      this.props.updateInputValue(postal);
    }
    this.setOptions(response);
  };
  afterInputChange = ({ value }) => this.fetchOptions(value);
  afterFocus = controlledInput => this.props.code && controlledInput.setInputState({ value: this.props.code });
  afterBlur = controlledInput => {
    this.props.updateInputState({ code: '', postal: '', value: this.props.postal, hideError: false });
    this.props.afterBlur(controlledInput);
  };
  fetchOptions = (value, setOptions = this.setOptions) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ isLoading: true });
      api
        .get('/lookup/city-by-zip', { params: { zipcode: value || 1, countryCode: this.props.countryCode } })
        .then(setOptions)
        .catch(response => this.setState({ isLoading: false }));
    }, 300);
  };
  isMatching = ({ option, value }) => option.code === value;
  isInvalid = () => this.props.canShowError;
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="zip"
      id="zip"
      label="ZIP / Postal code"
      placeholder="Type here"
      afterInputChange={this.afterInputChange}
      afterFocus={this.afterFocus}
      isMatching={this.isMatching}
      getErrorMsg={() => 'Please enter a valid ZIP code/Postal code.'}
      getOptionValue={({ label }) => label}
      getOptionLabel={({ postal }) => postal}
      maxLength={this.props.isCountry('United Kingdom') ? 4 : 7}
      extraOptionParams={({ code, postal, googleCityId }) => ({ code, postal, googleCityId })}
      autoSelectOnBlur
      hideArrow
      hideNoResultFound
      {...this.state}
      {...this.props}
      noFilter
      afterBlur={this.afterBlur}
      drawerProps={{ inputRef: undefined }}
      isInputInvalid={this.isInvalid}
    />
  );
}

ZipField.defaultProps = {
  postal: '',
  canShowError: undefined,
};

ZipField.propTypes = {
  code: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  postal: PropTypes.string,
  canShowError: PropTypes.bool,
  isCountry: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  countryCode: PropTypes.string.isRequired,
  updateInputValue: PropTypes.func.isRequired,
  updateInputState: PropTypes.func.isRequired,
  afterBlur: PropTypes.func.isRequired,
};

const getContext = context => ({
  ...context.form.zip,
  isRequired: true,
  isDisabled: context.form.zipStatus.checked,
  isVisible: !!context.user.isZipCountry(),
  isCountry: context.user.isCountry,
  afterBlur: context.form.afterBlur('zip'),
  onOptionSelection: context.form.onOptionSelection('zip'),
  updateInputValue: context.form.updateInputValue('zip'),
  updateInputState: context.form.updateInputState('zip'),
  countryCode: get(getCountryISO()[context.user.country], 'iso2'),
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(ZipField));
