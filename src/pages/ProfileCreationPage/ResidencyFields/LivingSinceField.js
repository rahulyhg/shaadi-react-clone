import React from 'react';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import ShowHide from '../../../components/HOC/ShowHide';
import withContextConsumer from '../../../components/Common/withContextConsumer';

const getLivingSinceList = birthYear => {
  const list = [{ value: 'Birth', label: 'Birth' }];
  let currentYear = new Date().getFullYear();
  while (birthYear <= currentYear) {
    const yearMap = {
      value: currentYear.toString(),
      label: currentYear.toString(),
    };
    list.push(yearMap);
    currentYear -= 1;
  }
  return list;
};

const LivingSinceField = props => (
  <ResponsiveFormFieldWithOptions name="livingSince" id="livingSince" isReadOnly maxLength={100} placeholder="Select" {...props} />
);

const getContext = context => ({
  ...context.form.livingSince,
  isRequired: true,
  isVisible: context.user.isNRIPlusCountry(),
  options: getLivingSinceList(context.user.birthYear),
  label: `${context.user.getHeOrSheOrYou()}${context.user.isPostedBySelf() ? ' are' : "'s"} living in ${context.user.country} since`,
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(LivingSinceField));
