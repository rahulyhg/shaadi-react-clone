import React from 'react';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import options from '../../../constants/list/educationLevel.json';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';

const EducationLevelField = props => (
  <ResponsiveFormFieldWithOptions
    name="educationLevel"
    id="educationLevel"
    placeholder="Select"
    options={options}
    isMultiColumn
    isReadOnly
    isRequired
    {...props}
  />
);

const getContext = context => ({
  ...context.form.educationLevel,
  isRequired: true,
  // @todo first need to remove API validation
  // isVisible: !['High school', 'Less than high school'].includes(context.form.educationLevel.value),
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(EducationLevelField));
