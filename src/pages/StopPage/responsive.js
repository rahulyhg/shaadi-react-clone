import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../PropTypes';
import constants from '../../constants/constants';
import UploadVerificationId from '../../components/UploadVerificationId';
import doProfileAction from '../../actions/doProfileAction';
import doCsatSurvey from '../../actions/doCsatSurvey';
import CsatSurvey from '../../components/Common/Survey/CsatSurvey';
import doHeaderAction from '../../actions/doHeaderAction';
import doTrustBadgeAction from '../../actions/doTrustBadgeAction';
import doPrivacySettings from '../../actions/doPrivacySettings';
import OnBoardingPhoneSetting from '../../components/OnBoardingPhoneSetting';

class StopPage extends PureComponent {
  componentDidMount() {
    if (this.props.isLoggedOut) {
      this.props.history.push(constants.URI.loginPage);
    }
  }

  componentDidUpdate() {
    if (this.props.isLoggedOut) {
      this.props.history.push(constants.URI.loginPage);
    }
  }

  render() {
    switch (this.props.pageName) {
      case 'csat-survey':
        return <CsatSurvey {...this.props} />;
      case 'id-verification':
      case 'upload-id':
        return <UploadVerificationId {...this.props} />;
      case 'phone-setting':
        return <OnBoardingPhoneSetting {...this.props} />;
      default:
        this.props.history.push('/my-shaadi');
        return null;
    }
  }
}

StopPage.propTypes = {
  doCsatSurvey: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  layout: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  isNative: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape(PropTypes.shaadiUser).isRequired,
  nextUrl: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  csatSurvey: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        display_order: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['multichoice', 'rating', 'textarea']).isRequired,
        title: PropTypes.string.isRequired,
        choices: PropTypes.object,
        placeHolder: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  phoneSettings: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        tooltip: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
};
export const mapStateToProps = (state, history) => {
  const {
    session: { user, isNative, isLoggedOut, nextUrl },
    view: { layout },
    modal: { profilePhotoUpload: documentUpload = { attachments: [] } } = {},
    csatSurvey,
    privacySettings,
  } = state;
  const { match: { params: { pageName } } } = history;
  const { wwwBaseUrl } = state.config.app;
  const { phoneSettings } = privacySettings;

  return {
    isLoggedOut,
    isNative,
    layout,
    pageName,
    user,
    nextUrl,
    csatSurvey,
    phoneSettings,
    wwwBaseUrl,
    documentUpload,
  };
};

export default withRouter(
  connect(mapStateToProps, { doProfileAction, doCsatSurvey, doPrivacySettings, doHeaderAction, doTrustBadgeAction })(StopPage),
);
