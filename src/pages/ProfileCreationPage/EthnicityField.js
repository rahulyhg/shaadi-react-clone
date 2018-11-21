import React, { PureComponent } from 'react';
import PropTypes from '../../PropTypes';
import withContextConsumer from '../../components/Common/withContextConsumer';
import ResponsiveFormFieldWithOptions from '../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import FormFieldWrapper from '../../components/Common/FormFieldWrapper';
import api from '../../api';

class EthnicityField extends PureComponent {
  state = {
    options: [],
  };
  componentDidMount = () =>
    // @todo make this API call specific to a criteria
    api.get('/lookup/ethnicity', { params: this.params }).then(this.afterOptionFetch);
  get params() {
    return {
      motherTongue: this.props.motherTongue,
      religion: this.props.religion,
      country: this.props.country,
    };
  }
  getOptionLabel = option => option.text;
  getOptionValue = option => option.id;
  afterOptionFetch = ({ data: options }) => {
    if (options.length < 2) {
      this.props.updateInputState('ethnicity')({ value: options[0].id, isVisible: false });
    } else {
      this.setState({
        options,
      });
    }
  };
  render = () => (
    <FormFieldWrapper isVisible={this.state.options.length > 1}>
      <ResponsiveFormFieldWithOptions
        name="ethnicity"
        id="ethnicity"
        maxLength={100}
        excludeForFilter={['other', 'others']}
        placeholder="Select"
        label="Ethnic Origin"
        getOptionLabel={this.getOptionLabel}
        getOptionValue={this.getOptionValue}
        {...this.state}
        {...this.props}
      />
    </FormFieldWrapper>
  );
}

EthnicityField.propTypes = {
  updateInputState: PropTypes.func.isRequired,
  getHisOrHerOrYour: PropTypes.func.isRequired,
  motherTongue: PropTypes.string.isRequired,
  religion: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

const getContext = context => ({
  updateInputState: context.form.updateInputState,
  getHisOrHerOrYour: context.user.getHisOrHerOrYour,
  motherTongue: context.user.motherTongue,
  religion: context.user.religion,
  country: context.user.country,
  isRequired: true,
  ...context.form.ethnicity,
});

export default withContextConsumer({ contextToFetch: getContext })(EthnicityField);
