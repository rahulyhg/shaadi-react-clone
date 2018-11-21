import React from 'react';
import PropType from 'prop-types';
import options from '../../../constants/list/maritalStatus.json';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';

const MaritalStatus = props => (
  <ResponsiveFormFieldWithOptions name="maritalStatus" id="maritalStatus" options={options} placeholder="Select" isReadOnly {...props} />
);

MaritalStatus.propTypes = {
  getHisOrHerOrYour: PropType.func.isRequired,
};

const getContext = context => ({
  ...context.form.maritalStatus,
  getHisOrHerOrYour: context.user.getHisOrHerOrYour,
  label: `${context.user.getHisOrHerOrYour()} marital status`,
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(MaritalStatus);
