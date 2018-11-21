import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import api from '../../../api';
import ShowHide from '../../../components/HOC/ShowHide';
import s from '../styles';

class CountryCodeField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () =>
    api.get('/lookup/phone-country', { params: { country: this.props.originCountry } }).then(this.setCountryCodeOptions);
  setCountryCodeOptions = response => {
    const { list: options, default: { id: value } } = response.data;
    const isd = value.split('|')[0];
    const country = value.split('|')[1];
    !this.props.value &&
      this.props.updateInputState({
        value: isd,
        isd,
        country,
        isDefault: true,
      });
    this.setState({
      options,
      isLoading: false,
    });
  };
  getOptionLabel = ({ text }) => `${text.split('|')[1]} (${text.split('|')[0]})`;
  getOptionValue = ({ id }) => id;
  mutateSelectedOption = option => {
    const split = option.value.split('|');
    const isd = split[0];
    const value = isd;
    const country = split[1];
    return { value, isd, country, isDefault: false };
  };
  isSelected = ({ option, value }) => `${this.props.country} (${value})` === option.label;
  isMatching = ({ option, value }) => option.id === value;
  render = () => (
    <s.countryCodeWrap>
      <ResponsiveFormFieldWithOptions
        placeholder="Country code"
        label="Country code"
        name="countryCode"
        id="countryCode"
        dropDownWidth="235px"
        optionWidth="90%"
        getErrorMsg={() => 'Please specify the country code'}
        mutateSelectedOption={this.mutateSelectedOption}
        getOptionValue={this.getOptionValue}
        getOptionLabel={this.getOptionLabel}
        isSelected={this.isSelected}
        isMatching={this.isMatching}
        {...this.state}
        {...this.props}
      />
    </s.countryCodeWrap>
  );
}

CountryCodeField.propTypes = {
  updateInputState: PropTypes.func.isRequired,
  originCountry: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const getContext = context => ({
  ...context.form.countryCode,
  originCountry: context.user.country,
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(CountryCodeField));
