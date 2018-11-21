import React from 'react';
import lifecycle from 'recompose/lifecycle';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import cookie from 'cookie';
import branch from 'recompose/branch';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import getDomain from '../../helpers/getDomain';
import PropTypes from '../../PropTypes';
import constants from '../../constants/constants';
import doDomActions from '../../actions/doDomActions';
import withContextConsumer from '../../components/Common/withContextConsumer';
import LoadComponentIfCalled from '../../components/LoadComponentIfCalled';
import RedirectToLoginIfLoggedOut from '../../components/HOC/RedirectToLoginIfLoggedOut';
import withAPI from '../../components/HOC/withAPI';
import withDeviceInfo from '../../components/HOC/withDeviceInfo';
import withExitIntentLayer from '../../components/HOC/withExitIntentLayer';
import withProfileCreationLogic from './withProfileCreationLogic';
import withProfileDataHelper from '../../components/HOC/withProfileDataHelper';
import Wrapper from '../../theme/Wrapper';
import Overlay from '../../theme/Overlay';
import { theme, msiteProfileCreationFormTheme } from '../../components/Common/FormElements/theme';
import Stepper from '../../components/Common/FormElements/Stepper';
import Button from '../../components/Common/FormElements/Button';
import FieldContextProvider from '../../components/Common/Context';
import s, { Heading, SubHeading, FormLoader, FormSubmitBtn, RequiredFields } from './styles';

const Loader = () => (
  <FormLoader>
    <CircularProgress size={19} color="inherit" />
  </FormLoader>
);

const BasicsFieldSet = LoadComponentIfCalled(
  () => import(/* webpackChunkName: "BasicsFieldSet" */ './BasicsFieldSet').then(module => module.default),
  Loader,
);

const BioDataFieldSet = LoadComponentIfCalled(
  () => import(/* webpackChunkName: "BioDataFieldSet" */ './BioDataFieldSet').then(module => module.default),
  Loader,
);

const LifeStyleFieldSet = LoadComponentIfCalled(
  () => import(/* webpackChunkName: "LifeStyleFieldSet" */ './LifeStyleFieldSet').then(module => module.default),
  Loader,
);

const DetailsFieldSet = LoadComponentIfCalled(
  () => import(/* webpackChunkName: "DetailsFieldSet" */ './DetailsFieldSet').then(module => module.default),
  Loader,
);

const ExitIntentLayerModal = LoadComponentIfCalled(() =>
  import(/* webpackChunkName: "ExitIntentLayerModal" */ './ExitIntentLayerModal').then(module => module.default),
);

// eslint-disable-next-line
const fieldSetMap = {
  1: BasicsFieldSet,
  2: BioDataFieldSet,
  3: LifeStyleFieldSet,
  4: DetailsFieldSet,
};

export const ProfileCreationPageContent = props => {
  const Form = fieldSetMap[props.stepNumber];
  const formTheme = props.isMobile() ? msiteProfileCreationFormTheme : theme;
  return (
    <s.RegMainWrapper>
      <MuiThemeProvider theme={formTheme}>
        <s.RegWrapper>
          <Heading>{props.getPageHeading()}</Heading>
          <SubHeading>{props.getPageSubHeading()}</SubHeading>
          <Stepper
            completedStepNumber={props.getCompletedStepNumber()}
            isActiveStep={props.stepNumber}
            isVisible={props.canShowStepper()}
            onClick={props.navigateTo}
          />
          <s.RegInnerWrapper canAnimate>
            <form
              onSubmit={props.onFormSubmit}
              id={props.getFormName()}
              name={props.getFormName()}
              data-formisimo-form-key={props.getFormName()}
              method="POST"
              noValidate
            >
              <FieldContextProvider form={props.form} multiLang={props.multiLang} user={props.user} history={props.history}>
                <Form {...props} isMobile={props.isMobile()} />
              </FieldContextProvider>
              <Button
                width={`${props.getButtonWidth()}px`}
                disabled={props.isFormSubmitting}
                loading={props.isFormSubmitting}
                zindex={props.isFormSubmitting ? '3' : ''}
                id={`submit-form-${props.getFormName()}`}
                name={`submit-form-${props.getFormName()}`}
                type="submit"
              >
                <FormSubmitBtn loading={props.isFormSubmitting}>{props.getButtonText()}</FormSubmitBtn>
              </Button>
              <Wrapper display={props.formSubmitFailed ? '' : 'none'}>Something went wrong</Wrapper>
            </form>
          </s.RegInnerWrapper>
        </s.RegWrapper>
      </MuiThemeProvider>
      <RequiredFields>* Required fields</RequiredFields>
      {props.isFormSubmitting && <Overlay />}
      {props.canShowExitIntentLayer && (
        <ExitIntentLayerModal
          onModalClose={props.closeExitIntentLayerModal}
          hisHerOrYour={props.user.getHisOrHerOrYour()}
          profiles={props.exitIntentLayerProfiles}
          isOpen={props.isUserExiting}
        />
      )}
    </s.RegMainWrapper>
  );
};

export const mapStateToProps = ({ session, config }) => {
  const { queryParams, user } = session;
  const multiLang = {
    litem: user.litem,
    slang: user.slang,
  };
  const isSuspendedUser = (queryParams.sus && true) || false;
  const isReturningUser = (queryParams.email && true) || false;
  return {
    isSuspendedUser,
    isReturningUser,
    config,
    session,
    multiLang,
  };
};

ProfileCreationPageContent.propTypes = {
  stepNumber: PropTypes.number.isRequired,
  getCompletedStepNumber: PropTypes.func.isRequired,
  doDomActions: PropTypes.func.isRequired,
  isMobile: PropTypes.func.isRequired,
  onOptionSelection: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.shaadiUser).isRequired,
  isSuspendedUser: PropTypes.bool.isRequired,
  isReturningUser: PropTypes.bool.isRequired,
  isFormSubmitting: PropTypes.bool.isRequired,
  canShowStepper: PropTypes.func.isRequired,
  formSubmitFailed: PropTypes.bool.isRequired,
  session: PropTypes.shape(PropTypes.reducerSession).isRequired,
  showExitIntentLayer: PropTypes.func.isRequired,
  isUserExiting: PropTypes.bool.isRequired,
  canShowExitIntentLayer: PropTypes.bool.isRequired,
  closeExitIntentLayerModal: PropTypes.func.isRequired,
  exitIntentLayerProfiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getPageHeading: PropTypes.func.isRequired,
  getPageSubHeading: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  getFormName: PropTypes.func.isRequired,
  getButtonText: PropTypes.func.isRequired,
  getButtonWidth: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
  history: PropTypes.shape(PropTypes.history).isRequired,
  multiLang: PropTypes.shape({ slang: PropTypes.string.isRequired, litem: PropTypes.string.isRequired }).isRequired,
};

const mapActionsToProps = { doDomActions };

const composedHoc = compose(
  connect(mapStateToProps, mapActionsToProps),
  withContextConsumer(context => ({ dispatch: context.dispatch })),
  RedirectToLoginIfLoggedOut,
  withAPI,
  withState('draftProfileData', 'setDraftProfileFetched', null),
  withState('draftProfileFetchError', 'setDraftProfileFail', null),
  withHandlers({
    onDraftProfileFetch: ({ setDraftProfileFetched }) => data => setDraftProfileFetched(data),
    onDraftProfileFail: ({ setDraftProfileFail }) => error => setDraftProfileFail(error),
  }),
  lifecycle({
    componentDidMount() {
      const { getDraftProfile, onDraftProfileFetch, onDraftProfileFail } = this.props;
      getDraftProfile({ uid: cookie.parse(document.cookie).abclogin, xDomain: getDomain() })
        .then(response => {
          onDraftProfileFetch(response.data.data);
        })
        .catch(error => {
          onDraftProfileFail(error);
        });
    },
  }),
  branch(({ draftProfileData }) => !draftProfileData, () => () => <Loader />),
  branch(({ draftProfileFetchError }) => draftProfileFetchError, () => () => window.history.push(constants.URI.loginPage)),
  withDeviceInfo,
  withProfileDataHelper,
  withProfileCreationLogic,
  withExitIntentLayer,
);

export default composedHoc(ProfileCreationPageContent);
