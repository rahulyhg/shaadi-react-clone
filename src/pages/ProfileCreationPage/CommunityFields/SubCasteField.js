import React, { PureComponent } from 'react';
import PropTypes from '../../../PropTypes';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import TextFieldWithLabel from '../../../components/Common/FormElements/TextFieldWithLabel';
import ShowHide from '../../../components/HOC/ShowHide';
import api from '../../../api';

class SubCasteField extends PureComponent {
  state = {
    options: [],
    isLoading: false,
  };
  componentDidMount = () => this.fetchOptions();
  componentDidUpdate = prevProps => {
    if (prevProps.caste !== this.props.caste) {
      this.fetchOptions();
      this.props.updateInputValue('subCaste')('');
    }
  };
  get params() {
    return {
      motherTongue: this.props.motherTongue,
      caste: this.props.caste,
    };
  }
  get hasOptions() {
    return !!this.state.options.length;
  }
  get placeholder() {
    return this.hasOptions ? 'Select' : 'Type here';
  }
  getOptionLabel = ({ text }) => text;
  getOptionValue = ({ id }) => id;
  getProps() {
    return {
      name: 'subCaste',
      id: 'subCaste',
      regex: '[^a-zA-Z0-9 ]',
      placeholder: this.placeholder,
      excludeForFilter: ['other', 'others'],
      hideArrow: !this.hasOptions,
      hideNoResultFound: !this.hasOptions,
      getOptionLabel: this.getOptionLabel,
      getOptionValue: this.getOptionValue,
      label: `${this.props.getHisOrHerOrYour()} sub-community`,
      ...this.state,
      ...this.props,
    };
  }
  fetchOptions = () => api.get('/lookup/subcaste', { params: this.params }).then(this.afterOptionsFetch);
  afterOptionsFetch = ({ data: options }) => this.setState({ options, isLoading: false }, this.afterOptionsSet);
  afterOptionsSet = () => {
    const isSubCasteOther = this.props.value && this.state.options.length && !this.state.options.find(opt => opt.id === this.props.value);
    if (isSubCasteOther) {
      this.props.updateInputValue('subCaste')('Others');
      this.props.value !== 'Others' && this.props.updateInputValue('subCasteOther')(this.props.value);
    }
  };
  render = () =>
    this.hasOptions ? (
      <ResponsiveFormFieldWithOptions {...this.getProps()} afterBlur={undefined} isReadOnly />
    ) : (
      <TextFieldWithLabel {...this.getProps()} />
    );
}

SubCasteField.propTypes = {
  updateInputValue: PropTypes.func.isRequired,
  getHisOrHerOrYour: PropTypes.func.isRequired,
  motherTongue: PropTypes.string.isRequired,
  caste: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const getContext = context => {
  const { getHisOrHerOrYour, motherTongue, isNRIPlusCountry } = context.user;
  const { subCaste, caste, updateInputValue, afterTextBlur } = context.form;
  const isVisible = !isNRIPlusCountry() && !!caste.value && !caste.canShowError;
  !isVisible && context.form.subCaste.value && updateInputValue('subCaste')('');
  return {
    getHisOrHerOrYour,
    motherTongue,
    updateInputValue,
    caste: caste.value,
    afterBlur: afterTextBlur('subCaste'),
    ...subCaste,
    isVisible,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(SubCasteField));
