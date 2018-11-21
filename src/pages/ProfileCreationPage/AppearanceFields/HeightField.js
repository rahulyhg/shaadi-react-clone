import React from 'react';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import options from '../../../constants/list/height.json';
import ShowHide from '../../../components/HOC/ShowHide';

const getContext = context => ({
  ...context.form.height,
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(
  ShowHide(props => (
    <ResponsiveFormFieldWithOptions
      name="height"
      id="height"
      placeholder="Select"
      options={options}
      extraOptionParams={({ inches }) => ({ inches })}
      isReadOnly
      {...props}
    />
  )),
);
