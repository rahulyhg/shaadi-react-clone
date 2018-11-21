import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextFieldWithLabel from '../../../components/Common/FormElements/TextFieldWithLabel';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import constants from '../../../constants/constants';
import ShowHide from '../../../components/HOC/ShowHide';
import s from '../styles';

const getMobileRegexChange = country => {
  const getMobileNumberMinLength = () => constants.mobileNumberMinLength[country] || 7;
  const getMobileNumberMaxLength = () => constants.mobileNumberMaxLength[country] || 10;
  const maxLength = getMobileNumberMaxLength() - 1;
  const minLength = getMobileNumberMinLength() - 1;
  const startingRangeOfDigit = country === 'India' ? 6 : 1;
  const startingDigit = `[${startingRangeOfDigit}-9]{1}[0-9]`;
  return {
    pattern: `^${startingDigit}{${minLength},${maxLength}}$`,
    regex: `(^[^${startingDigit}{0,0}$)`,
    maxLength: maxLength + 1,
    minLength: minLength + 1,
    canRegexTrim: true,
  };
};

class MobileNumberField extends PureComponent {
  componentDidUpdate = prevProps => {
    if (this.props.countryCodeValid && prevProps.country !== this.props.country) {
      setTimeout(() => this.inputRef.focus(), 500);
      this.props.updateInputState('mobileNumber')({ value: '', isValid: false });
    }
  };
  setInputRef = element => {
    this.inputRef = element;
    this.props.inputRef(element);
  };
  inputRef = {
    focus() {},
  };
  render = () => (
    <s.countryNumberWrap>
      <TextFieldWithLabel
        id="mobileNumber"
        name="mobileNumber"
        placeholder="Type here"
        label="Your mobile number"
        type="tel"
        maxLength={getMobileRegexChange(this.props.country).maxLength}
        minLength={getMobileRegexChange(this.props.country).minLength}
        pattern={getMobileRegexChange(this.props.country).pattern}
        regex={getMobileRegexChange(this.props.country).regex}
        allowNumbersOnly
        hideArrow
        hideNoResultFound
        getErrorMsg={() => 'Please enter a valid mobile number'}
        {...this.props}
        inputRef={this.setInputRef}
      />
    </s.countryNumberWrap>
  );
}

MobileNumberField.defaultProps = {
  inputRef() {},
};

MobileNumberField.propTypes = {
  country: PropTypes.string.isRequired,
  updateInputState: PropTypes.func.isRequired,
  countryCodeValid: PropTypes.bool.isRequired,
  inputRef: PropTypes.func,
};

const getContext = context => ({
  ...context.form.mobileNumber,
  updateInputState: context.form.updateInputState,
  country: context.form.countryCode.country,
  countryCodeValid: !context.form.countryCode.isDefault && !!context.form.countryCode.value && !context.form.countryCode.canShowError,
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(MobileNumberField));
