import React from 'react';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import options from '../../../constants/list/educationField.json';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';

const EducationField = props => (
  <ResponsiveFormFieldWithOptions
    name="educationField"
    id="educationField"
    placeholder="Select"
    options={options}
    isReadOnly
    isMultiColumn
    {...props}
  />
);

const getContext = context => ({
  ...context.form.educationField,
  isRequired: true,
  // @todo first need to remove API validation
  // isVisible: !['High school', 'Less than high school'].includes(context.form.educationLevel.value),
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(EducationField));
