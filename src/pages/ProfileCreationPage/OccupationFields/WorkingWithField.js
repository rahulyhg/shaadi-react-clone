import React from 'react';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import options from '../../../constants/list/workingWith.json';
import ShowHide from '../../../components/HOC/ShowHide';
import withContextConsumer from '../../../components/Common/withContextConsumer';

const WorkingWithField = props => (
  <ResponsiveFormFieldWithOptions name="workingWith" id="workingWith" placeholder="Select" options={options} isReadOnly {...props} />
);

const getContext = context => context.form.workingWith;

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(WorkingWithField));
