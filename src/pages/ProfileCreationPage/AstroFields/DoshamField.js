import React from 'react';
import PropTypes from 'prop-types';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from '../partials/ProfileCreationRadioTabGroup';
import CustomToolTip from '../../../components/Common/CustomToolTip';
import FormFieldWrapper from '../../../components/Common/FormFieldWrapper';
import options from '../../../constants/list/yesNoDontKnowOpts.json';
import ShowHide from '../../../components/HOC/ShowHide';
import s from '../styles';

const DoshamField = props => (
  <FormFieldWrapper {...props}>
    <s.herDietmain>
      <s.communityInput>
        <ProfileCreationRadioTabGroup id="dosham" name="dosham" options={options} {...props} />
      </s.communityInput>
      <CustomToolTip id="tooltip-dosham" tooltipMargin="0 0 5px 3px">
        Horoscope compatibility score may be used for matchmaking purpose.
      </CustomToolTip>
    </s.herDietmain>
  </FormFieldWrapper>
);

DoshamField.propTypes = {
  doOrDoes: PropTypes.func.isRequired,
  getHeOrSheOrYou: PropTypes.func.isRequired,
};

const getContext = context => {
  const { doOrDoes, getHeOrSheOrYou, isIndianHinduMallu, isReligiousSouthIndian } = context.user;
  const { suddhaJadhagam: { value: suddhaJadhagam }, dosham, updateInputValue } = context.form;
  const isVisible = isIndianHinduMallu() ? !['Yes', ''].includes(suddhaJadhagam) : isReligiousSouthIndian();
  !isVisible && dosham.value && updateInputValue('dosham')('');
  return {
    ...dosham,
    label: `${doOrDoes()} ${getHeOrSheOrYou()} have Dosham?`,
    isVisible,
    doOrDoes,
    getHeOrSheOrYou,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(DoshamField));
