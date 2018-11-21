import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from '../partials/ProfileCreationRadioTabGroup';
import options from '../../../constants/list/yesNoOccasionalOpts.json';
import MandatoryLabel from '../utils/MandatoryLabel';
import ShowHide from '../../../components/HOC/ShowHide';

const getContext = context => ({
  ...context.form.smokeHabbit,
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(
  ShowHide(props => (
    <ProfileCreationRadioTabGroup id="smokeHabbit" name="smokeHabbit" options={options} {...props} label={<MandatoryLabel {...props} />} />
  )),
);
