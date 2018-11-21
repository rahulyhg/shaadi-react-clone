import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { tabCapsuleTheme } from '../../../components/Common/FormElements/theme';
import FormFieldWrapper from '../../../components/Common/FormFieldWrapper';
import RadioTabGroup from '../../../components/Common/FormElements/RadioTabGroup';
// @todo isolate style for this
import s from '../styles';

const ProfileCreationRadioTabGroup = props => (
  <FormFieldWrapper {...props}>
    <s.skinToneMain hasError={props.canShowError}>{props.label}</s.skinToneMain>
    <s.communityInput>
      <MuiThemeProvider theme={tabCapsuleTheme}>
        <RadioTabGroup {...props} />
      </MuiThemeProvider>
    </s.communityInput>
  </FormFieldWrapper>
);

ProfileCreationRadioTabGroup.defaultProps = {
  canShowError: undefined,
};

ProfileCreationRadioTabGroup.propTypes = {
  canShowError: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
};

export default ProfileCreationRadioTabGroup;
