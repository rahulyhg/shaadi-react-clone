import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from '../partials/ProfileCreationRadioTabGroup';
import options from '../../../constants/list/yesNoOccasionalOpts.json';
import MandatoryLabel from '../utils/MandatoryLabel';
import ShowHide from '../../../components/HOC/ShowHide';

const getContext = context => ({
  ...context.form.drinkHabbit,
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(
  ShowHide(props => (
    <ProfileCreationRadioTabGroup id="drinkHabbit" name="drinkHabbit" options={options} {...props} label={<MandatoryLabel {...props} />} />
  )),
);
