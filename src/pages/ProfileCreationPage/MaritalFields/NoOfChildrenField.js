import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from '../partials/ProfileCreationRadioTabGroup';
import ShowHide from '../../../components/HOC/ShowHide';
import options from '../../../constants/list/noOfChildren.json';

const NoOfChildren = props => <ProfileCreationRadioTabGroup options={options} {...props} />;

const getContext = context => {
  const { haveChildren, noOfChildren, updateInputState } = context.form;
  const isVisible = !['No', ''].includes(haveChildren.value);
  !isVisible &&
    (context.form.noOfChildren.value || context.form.noOfChildren.canShowError) &&
    updateInputState('noOfChildren')({ value: '', canShowError: false });
  return {
    ...noOfChildren,
    isVisible,
    id: 'noOfChildren',
    name: 'noOfChildren',
    label: 'No. of children',
    isRequired: true,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(NoOfChildren));
