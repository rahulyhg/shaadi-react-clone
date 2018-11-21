import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from '../partials/ProfileCreationRadioTabGroup';
import options from '../../../constants/list/yesNoDontKnowOpts.json';
import ShowHide from '../../../components/HOC/ShowHide';

const SuddhaJadhagamField = props => (
  <ProfileCreationRadioTabGroup id="suddhaJadhagam" name="suddhaJadhagam" options={options} {...props} />
);

const getContext = context => {
  const { user: { doOrDoes, getHeOrSheOrYou, isIndianHinduMallu }, form: { suddhaJadhagam } } = context;
  const isVisible = isIndianHinduMallu();
  !isVisible && suddhaJadhagam.value && suddhaJadhagam.updateInputValue('');
  return {
    ...suddhaJadhagam,
    label: `${doOrDoes()} ${getHeOrSheOrYou()} have Suddha Jadhagam?`,
    isVisible,
    doOrDoes,
    getHeOrSheOrYou,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(SuddhaJadhagamField));
