import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import constants from '../../../constants/constants';
import Wrapper from '../../../theme/Wrapper';
import Color from '../../../theme/Color';
import Button from '../../../components/Common/FormElements/Button';
import AboutMeFieldController from './AboutMeFieldController';
import AboutMeDrawerBackBtn from './AboutMeDrawerBackBtn';
import AboutMeSuggestedDrawerField from './AboutMeSuggestedDrawerField';
import withDeviceInfo from '../../../components/HOC/withDeviceInfo';
import Drawer from '../../../components/Common/FormElements/Drawer';
import { msiteProfileCreationFormTheme } from '../../../components/Common/FormElements/theme';
import TextFieldWithShowHideError from '../../../components/Common/FormElements/TextField';
import ss from '../../../components/Common/FormElements/Button/styles';
import s from '../styles';

const AboutMeEditDrawerField = props => (
  <AboutMeFieldController {...props}>
    {AboutMeController => (
      <Wrapper
        bgColor="#fff"
        width="100vw"
        height={`${props.deviceInfo.windowHeight}px`}
        overflow="scroll"
        innerRef={AboutMeController.setAboutMeDrawerWrap}
        smoothScroll
      >
        <Wrapper position="absolute" displace="block" top="-1000px" padding="0 8%" innerRef={AboutMeController.getPlaceHolderHeight}>
          {constants.descriptionPlaceholder}
        </Wrapper>
        <Wrapper
          minHeight="54px"
          display="flex"
          alignItems="center"
          bgColor="#f1f1f2"
          boxShadow="0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.1)"
        >
          <AboutMeDrawerBackBtn closeDrawer={AboutMeController.closeDrawer} />
          <Wrapper flex="3" textAlign="left" minWidth={0} data-title>
            About {props.about}
          </Wrapper>
        </Wrapper>
        <Wrapper padding="0 8%" minHeight={AboutMeController.isFocused ? '' : '62vh'}>
          <Wrapper margin="21px 0 0">
            <MuiThemeProvider
              theme={{
                width: '100%',
                height: AboutMeController.inputHeight,
                rootHeight: AboutMeController.inputHeight,
                overflow: 'hidden',
              }}
            >
              <TextFieldWithShowHideError
                {...props}
                {...AboutMeController}
                onBlur={AboutMeController.onDrawerBlur}
                rows={AboutMeController.value ? undefined : 1}
                id="aboutMe-edit"
                name="aboutMe-edit"
                multiline
              />
            </MuiThemeProvider>
          </Wrapper>
          <s.textareaWrapper>
            <s.helpwrappervalidation>
              <Color color={AboutMeController.isDirty && AboutMeController.isTooShort() ? '#e53a41' : '#7ac142'}>
                {AboutMeController.getCharacterCount()}
              </Color>{' '}
              / 4000
            </s.helpwrappervalidation>
            <s.helpwrapper id="about-me-edit-help" onMouseDown={AboutMeController.getTemplate}>
              Help me write this
            </s.helpwrapper>
          </s.textareaWrapper>
        </Wrapper>
        <Wrapper margin="0 0 20px">
          <Button
            className="btn btn-action"
            id="btn-about-me-cta"
            defaultWrap={AboutMeController.isTooShort() ? ss.AboutMeDrawerDisabled : ss.AboutMeDrawer}
            padding="0"
            onMouseDown={AboutMeController.onDrawerCTA}
          >
            Done
          </Button>
        </Wrapper>
        <MuiThemeProvider theme={{ msiteProfileCreationFormTheme, height: AboutMeController.inputHeight, overflow: 'hidden' }}>
          <Drawer open={AboutMeController.isIndirectCopyMode} onClose={AboutMeController.closeDrawer}>
            <AboutMeSuggestedDrawerField {...props} value={AboutMeController.suggestedValue} />
          </Drawer>
        </MuiThemeProvider>
      </Wrapper>
    )}
  </AboutMeFieldController>
);

AboutMeEditDrawerField.propTypes = {
  about: PropTypes.string.isRequired,
  onDrawerBlur: PropTypes.func.isRequired,
  deviceInfo: PropTypes.shape({
    windowHeight: PropTypes.number,
  }).isRequired,
};

export default withDeviceInfo(AboutMeEditDrawerField);
