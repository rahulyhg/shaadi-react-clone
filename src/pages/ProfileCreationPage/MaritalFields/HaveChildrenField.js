import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from '../partials/ProfileCreationRadioTabGroup';
import ShowHide from '../../../components/HOC/ShowHide';
import options from '../../../constants/list/children.json';

const HaveChildren = props => <ProfileCreationRadioTabGroup options={options} {...props} />;

const getContext = context => {
  const { doOrDoes, getHeOrSheOrYou } = context.user;
  const { maritalStatus, haveChildren, updateInputState } = context.form;
  const isVisible = !['Never Married', ''].includes(maritalStatus.value);
  !isVisible &&
    (context.form.haveChildren.value || context.form.haveChildren.canShowError) &&
    updateInputState('haveChildren')({ value: '', canShowError: false });
  return {
    ...haveChildren,
    isVisible,
    label: `${doOrDoes()} ${getHeOrSheOrYou().toLowerCase()} have any children?`,
    id: 'haveChildren',
    name: 'haveChildren',
    isRequired: true,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(HaveChildren));
