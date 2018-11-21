import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import constants from '../../../constants/constants';
import Color from '../../../theme/Color';
import Wrapper from '../../../theme/Wrapper';
import LoadComponentIfCalled from '../../../components/LoadComponentIfCalled';
import s from '../styles';
import AboutMeFieldController from './AboutMeFieldController';
import withDeviceInfo from '../../../components/HOC/withDeviceInfo';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import FormFieldWrapper from '../../../components/Common/FormFieldWrapper';
import { msiteProfileCreationFormTheme } from '../../../components/Common/FormElements/theme';
import TextField from '../../../components/Common/FormElements/TextField';
import AboutMeEngagingModal from './AboutMeEngagingModal';
import AboutMeEditDrawerField from './AboutMeEditDrawerField';
import AboutMeSuggestedDrawerField from './AboutMeSuggestedDrawerField';
import ShowHide from '../../../components/HOC/ShowHide';

const Drawer = LoadComponentIfCalled(() =>
  import(/* webpackChunkName: "Drawer" */ '../../../components/Common/FormElements/Drawer').then(module => module.default),
);

const AboutMeTemplateModal = LoadComponentIfCalled(() =>
  import(/* webpackChunkName: "AboutMeTemplateModal" */ './AboutMeTemplateModal').then(module => module.default),
);

const DescriptionField = props => (
  <AboutMeFieldController {...props}>
    {AboutMeController => (
      <Fragment>
        <s.aboutHelpWrap isFocused={AboutMeController.isFocused} hasError={AboutMeController.canShowError}>
          {props.title}
        </s.aboutHelpWrap>
        <Wrapper position="absolute" displace="block" top="-1000px" innerRef={AboutMeController.getPlaceHolderHeight}>
          {constants.descriptionPlaceholder}
        </Wrapper>
        <Wrapper margin="21px 0 0" onMouseDown={props.isMobile() ? AboutMeController.onMouseDown : undefined}>
          <MuiThemeProvider
            theme={{
              ...msiteProfileCreationFormTheme,
              height: AboutMeController.inputHeight,
              rootHeight: AboutMeController.inputHeight,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <FormFieldWrapper {...props} {...AboutMeController}>
              <TextField
                {...props}
                {...AboutMeController}
                rows={AboutMeController.value ? undefined : 1}
                inputRef={AboutMeController.inputRef}
                id="aboutMe"
                name="aboutMe"
                multiline
              />
            </FormFieldWrapper>
          </MuiThemeProvider>
        </Wrapper>
        <s.textareaWrapper>
          <s.helpwrappervalidation>
            <Color color={AboutMeController.isTooShort() ? (AboutMeController.isDirty ? '#e53a41' : undefined) : '#7ac142'}>
              {AboutMeController.getCharacterCount()}
            </Color>{' '}
            / 4000
          </s.helpwrappervalidation>
          <s.helpwrapper id="about-me-help" onMouseDown={AboutMeController.getTemplate}>
            Help me write this
          </s.helpwrapper>
        </s.textareaWrapper>
        {props.isMobile() && (
          <MuiThemeProvider theme={{ ...msiteProfileCreationFormTheme }}>
            <Drawer open={AboutMeController.isEditDrawerOpen} onClose={AboutMeController.closeDrawer}>
              <AboutMeEditDrawerField {...props} {...AboutMeController} />
            </Drawer>
            <Drawer open={AboutMeController.isDirectCopyMode} onClose={AboutMeController.closeDrawer}>
              <AboutMeSuggestedDrawerField {...props} {...AboutMeController} value={AboutMeController.suggestedValue} />
            </Drawer>
          </MuiThemeProvider>
        )}
        {!props.isMobile() && (
          <AboutMeTemplateModal
            isOpen={AboutMeController.showTemplateModal}
            onModalClose={AboutMeController.onModalClose}
            suggestedValue={AboutMeController.suggestedValue}
            updateValue={AboutMeController.updateValue}
          />
        )}
        <AboutMeEngagingModal
          {...props}
          {...AboutMeController}
          isOpen={props.showAboutMeEngagingModal}
          onModalClose={props.onAboutMeEngagingModalClose}
        />
      </Fragment>
    )}
  </AboutMeFieldController>
);

DescriptionField.propTypes = {
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.func.isRequired,
  showAboutMeEngagingModal: PropTypes.bool.isRequired,
  onAboutMeEngagingModalClose: PropTypes.func.isRequired,
};

const getContext = context => ({
  ...context.form.description,
  title: `About ${context.user.isPostedBySelf() ? 'yourself' : `my ${context.user.getRelationWithProfileCreator()}`}`,
  updateAboutMe: context.form.updateInputState('description'),
});

export default withContextConsumer({ contextToFetch: getContext })(withDeviceInfo(ShowHide(DescriptionField)));
