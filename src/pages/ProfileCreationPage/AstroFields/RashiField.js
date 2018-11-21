import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import FormFieldWrapper from '../../../components/Common/FormFieldWrapper';
import CustomToolTip from '../../../components/Common/CustomToolTip';
import api from '../../../api';
import s from '../styles';

class RashiField extends PureComponent {
  state = {
    options: [],
  };
  componentDidMount = () => this.fetchOptions();
  componentDidUpdate = prevProps => {
    if (prevProps.nakshatra !== this.props.nakshatra) {
      this.props.updateInputState({ actualValue: '', value: '' });
      this.fetchOptions();
    }
  };
  get params() {
    return {
      motherTongue: this.props.motherTongue,
      nakshatra: this.props.nakshatra,
    };
  }
  afterOptionLoad = params => {
    const selectedOption = params.options[params.selectedIndexes && params.selectedIndexes[0]];
    const selectedOptionLabel = selectedOption && selectedOption.label;
    if (selectedOptionLabel && selectedOptionLabel !== params.value) {
      this.props.updateInputState({ value: params.options[params.selectedIndexes[0]].label });
    }
  };
  afterOptionSetting = () =>
    this.state.options.length < 2 && this.props.updateInputState({ actualValue: this.state.options[0].id, value: '' });
  afterOptionFetch = ({ data: options }) => this.setState({ options }, this.afterOptionSetting);
  fetchOptions = () => api.get('/lookup/rashi', { params: this.params }).then(this.afterOptionFetch);
  isSelected = ({ option, value }) => [option.actualValue, option.label].includes(value);
  render = () => (
    <FormFieldWrapper isVisible={this.state.options.length > 1}>
      <s.herDietmain>
        <s.herDietWrap>
          <ResponsiveFormFieldWithOptions
            name="rashi"
            id="rashi"
            getOptionValue={({ text }) => text}
            getOptionLabel={({ text }) => text}
            extraOptionParams={({ id }) => ({ actualValue: id })}
            isSelected={this.isSelected}
            afterOptionLoad={this.afterOptionLoad}
            label="Rashi"
            isReadOnly
            placeholder="Select"
            {...this.state}
            {...this.props}
          />
        </s.herDietWrap>
        <CustomToolTip id="tooltip-rashi" tooltipMargin="0 0 5px">
          Rashis are the 12 signs of the zodiac. The one in which the moon was situated at the time your birth is called Rashi.
        </CustomToolTip>
      </s.herDietmain>
    </FormFieldWrapper>
  );
}

RashiField.propTypes = {
  updateInputState: PropTypes.func.isRequired,
  motherTongue: PropTypes.string.isRequired,
  nakshatra: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const getContext = context => {
  const isVisible = !!context.form.nakshatra.value && context.form.nakshatra.isValid !== false;
  !isVisible && context.form.rashi.value && context.form.updateInputValue('rashi')('');
  return {
    ...context.form.rashi,
    updateInputState: context.form.updateInputState('rashi'),
    nakshatra: context.form.nakshatra.actualValue,
    motherTongue: context.user.motherTongue,
    isVisible,
  };
};

export default withContextConsumer({
  contextToFetch: context => getContext(context),
})(ShowHide(RashiField));
