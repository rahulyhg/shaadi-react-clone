import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import CustomToolTip from '../../../components/Common/CustomToolTip';
import casteForGotraNakshatra from '../../../constants/list/casteForGotraNakshatra.json';
import api from '../../../api';
import s from '../styles';

class NakshatraField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () => api.get('/lookup/nakshatra', { params: this.params }).then(this.afterOptionFetch);
  componentWillUnmount = () => this.props.updateInputState({ canShowError: false });
  get params() {
    return {
      motherTongue: this.props.motherTongue,
    };
  }
  afterOptionLoad = params => {
    const selectedOption = params.options[params.selectedIndexes && params.selectedIndexes[0]];
    const selectedOptionLabel = selectedOption && selectedOption.label;
    if (selectedOptionLabel && selectedOptionLabel !== params.value) {
      this.props.updateInputState({ value: params.options[params.selectedIndexes[0]].label });
    }
  };
  afterOptionFetch = ({ data: options }) => this.setState({ options, isLoading: false });
  isSelected = ({ option, value }) => [option.actualValue, option.label].includes(value);
  render = () => (
    <s.herDietmain>
      <s.herDietWrap>
        <ResponsiveFormFieldWithOptions
          name="nakshatra"
          id="nakshatra"
          maxLength={30}
          placeholder="Search here"
          label="Nakshatra"
          getOptionValue={({ text }) => text}
          getOptionLabel={({ text }) => text}
          extraOptionParams={({ id }) => ({ actualValue: id })}
          isSelected={this.isSelected}
          afterOptionLoad={this.afterOptionLoad}
          canSearch
          isMultiColumn
          {...this.state}
          {...this.props}
        />
      </s.herDietWrap>
      <CustomToolTip id="tooltip-nakshatra" tooltipMargin="0 0 5px">
        A Nakshatra is one of 27 sectors along the ecliptic. Their names are related to the most prominent asterisms in the respective
        sectors.
      </CustomToolTip>
    </s.herDietmain>
  );
}

NakshatraField.propTypes = {
  motherTongue: PropTypes.string.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const isVisible =
    !context.user.isNRIPlusCountry() &&
    (context.user.isReligiousSouthIndian() || casteForGotraNakshatra.includes(context.form.caste.value));
  !isVisible && context.form.nakshatra.value && context.form.updateInputValue('nakshatra')('');
  return {
    ...context.form.nakshatra,
    updateInputState: context.form.updateInputState('nakshatra'),
    motherTongue: context.user.motherTongue,
    isVisible,
  };
};

export default withContextConsumer({
  contextToFetch: getContext,
})(ShowHide(NakshatraField));
