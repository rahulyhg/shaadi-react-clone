import React, { PureComponent } from 'react';
import PropTypes from '../../../PropTypes';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import casteForReligions from '../../../constants/list/casteForReligions.json';
import ShowHide from '../../../components/HOC/ShowHide';
import getOptGrp from '../../../helpers/getOptGrp';
import api from '../../../api';

class CasteField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () =>
    api.get('/lookup/caste', { params: this.params }).then(response =>
      this.setState({
        options: getOptGrp({
          ...response.data,
          otherLabel: 'All Communities',
        }),
        isLoading: false,
      }),
    );
  get params() {
    return {
      motherTongue: this.props.motherTongue,
      religion: this.props.religion,
      listType: 'frequent',
    };
  }
  getOptionLabel = option => option.label || option.text;
  getOptionValue = option => option.options || option.id;
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="caste"
      id="caste"
      maxLength={100}
      placeholder="Search here"
      label={`${this.props.getHisOrHerOrYour()} ${this.props.isNRIPlusCountry() ? 'sub-' : ' '}community`}
      getOptionLabel={this.getOptionLabel}
      getOptionValue={this.getOptionValue}
      isMultiColumn
      excludeForFilter={['other', 'others']}
      {...this.state}
      {...this.props}
    />
  );
}

CasteField.propTypes = {
  getHisOrHerOrYour: PropTypes.func.isRequired,
  isNRIPlusCountry: PropTypes.func.isRequired,
  motherTongue: PropTypes.string.isRequired,
  religion: PropTypes.string.isRequired,
  caste: PropTypes.string.isRequired,
};

const getContext = context => ({
  ...context.form.caste,
  getHisOrHerOrYour: context.user.getHisOrHerOrYour,
  isNRIPlusCountry: context.user.isNRIPlusCountry,
  motherTongue: context.user.motherTongue,
  religion: context.user.religion,
  caste: context.form.caste.value,
  isVisible: casteForReligions.includes(context.user.religion),
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(CasteField));
