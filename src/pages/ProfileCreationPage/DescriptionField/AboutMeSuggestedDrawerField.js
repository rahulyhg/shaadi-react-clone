import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import constants from '../../../constants/constants';
import Wrapper from '../../../theme/Wrapper';
import Color from '../../../theme/Color';
import Button from '../../../components/Common/FormElements/Button';
import AboutMeFieldController from './AboutMeFieldController';
import AboutMeDrawerBackBtn from './AboutMeDrawerBackBtn';
import withDeviceInfo from '../../../components/HOC/withDeviceInfo';
import TextFieldWithShowHideError from '../../../components/Common/FormElements/TextField';
import ss from '../../../components/Common/FormElements/Button/styles';
import s from '../styles';

const AboutMeSuggestedDrawerField = ({ about, ...props }) => (
  <AboutMeFieldController {...props}>
    {AboutMeController => (
      <Wrapper
        bgColor="#fff"
        width="100vw"
        height={`${props.deviceInfo.windowHeight}px`}
        overflow="scroll"
        innerRef={AboutMeController.setAboutMeDrawerWrap}
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
          <Wrapper id="description-suggested-drawer-title" flex="3" textAlign="left" alignItems="center" minWidth={0} display="inline-flex">
            About {about}&nbsp;
            <Wrapper fontSize="14px" boldness="400">
              (Suggested)
            </Wrapper>
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
                id="aboutMe-suggested"
                name="aboutMe-suggested"
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
          </s.textareaWrapper>
        </Wrapper>
        <Wrapper margin="0 0 20p" height="73px">
          <Button
            className="btn btn-action"
            id="btn-about-me-cta"
            defaultWrap={AboutMeController.isTooShort() ? ss.AboutMeDrawerDisabled : ss.AboutMeDrawer}
            padding="0"
            onMouseDown={AboutMeController.onDrawerCTA}
          >
            Copy this
          </Button>
        </Wrapper>
      </Wrapper>
    )}
  </AboutMeFieldController>
);

AboutMeSuggestedDrawerField.propTypes = {
  about: PropTypes.string.isRequired,
  onDrawerBlur: PropTypes.func.isRequired,
  deviceInfo: PropTypes.shape({
    windowHeight: PropTypes.number,
  }).isRequired,
};

export default withDeviceInfo(AboutMeSuggestedDrawerField);
