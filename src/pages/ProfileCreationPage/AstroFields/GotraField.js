import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import CustomToolTip from '../../../components/Common/CustomToolTip';
import casteForGotraNakshatra from '../../../constants/list/casteForGotraNakshatra.json';
import api from '../../../api';
import s from '../styles';

class GotraField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () => api.get('/lookup/gotra', { params: this.params }).then(this.afterOptionsFetch);
  componentWillUnmount = () => this.props.updateInputState({ canShowError: false });
  get params() {
    return {
      motherTongue: this.props.motherTongue,
      religion: this.props.religion,
    };
  }
  afterOptionsFetch = ({ data: options }) => this.setState({ options, isLoading: false }, this.afterOptionsSet);
  afterOptionsSet = () => {
    const isGotraOther = this.props.value && !this.state.options.find(opt => opt.id === this.props.value);
    if (isGotraOther) {
      this.props.updateInputValue('gotra')('Others');
      this.props.value !== 'Others' && this.props.updateInputValue('gotraOther')(this.props.value);
    }
  };
  render = () => (
    <s.herDietmain>
      <s.herDietWrap>
        <ResponsiveFormFieldWithOptions
          name="gotra"
          id="gotra"
          maxLength={100}
          placeholder="Search here"
          label="Gothra / Gothram"
          getOptionValue={({ id }) => id}
          getOptionLabel={({ text }) => text}
          canSearch
          isMultiColumn
          excludeForFilter={['other', 'others']}
          {...this.state}
          {...this.props}
        />
      </s.herDietWrap>
      <CustomToolTip id="tooltip-gotra" tooltipMargin="0 0 5px">
        In Hindu society the term Gothra means clan. In almost all Hindu families, marriage within the same gothra is not preferred.
      </CustomToolTip>
    </s.herDietmain>
  );
}

GotraField.propTypes = {
  updateInputValue: PropTypes.func.isRequired,
  motherTongue: PropTypes.string.isRequired,
  religion: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const isVisible =
    !context.user.isNRIPlusCountry() &&
    (context.user.isReligiousSouthIndian() || casteForGotraNakshatra.includes(context.form.caste.value));
  !isVisible && context.form.gotra.value && context.form.updateInputValue('gotra')('');
  return {
    ...context.form.gotra,
    motherTongue: context.user.motherTongue,
    religion: context.user.religion,
    updateInputValue: context.form.updateInputValue,
    updateInputState: context.form.updateInputState('gotra'),
    isVisible,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(GotraField));
