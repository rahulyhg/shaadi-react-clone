import React from 'react';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import options from '../../../constants/list/residencyStatus.json';
import canShowNationalityFields from '../utils/canShowNationalityFields';
import ShowHide from '../../../components/HOC/ShowHide';

const ResidencyStatusField = props => (
  <ResponsiveFormFieldWithOptions
    getOptionValue={({ id }) => id}
    getOptionLabel={({ text }) => text}
    placeholder="Select"
    name="residencyStatus"
    id="residencyStatus"
    maxLength={100}
    options={options}
    isReadOnly
    isList
    canBlurOnSelect
    {...props}
  />
);

const getContext = context => {
  const isVisible =
    !context.user.isIndian() &&
    !context.user.isPakistani() &&
    (!context.user.isNRIPlusCountry() || canShowNationalityFields(context.form.livingSince.value, context.user.birthYear));
  const { residencyStatus } = context.form;
  !isVisible &&
    !residencyStatus.default &&
    context.form.updateInputState('residencyStatus')({ value: 'Citizen', default: true, canShowError: false });
  isVisible &&
    residencyStatus.default &&
    context.form.updateInputState('residencyStatus')({ value: '', default: false, canShowError: undefined });
  return {
    ...residencyStatus,
    isVisible,
    label: `${context.user.getHisOrHerOrYour()} residency status`,
    isValid: !!residencyStatus.value,
    isRequired: true,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(ResidencyStatusField));
