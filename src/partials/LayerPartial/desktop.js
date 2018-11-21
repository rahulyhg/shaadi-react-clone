/* eslint react/require-default-props: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EventListener from 'react-event-listener';
import PropTypes from '../../PropTypes';
import Modal from '../../components/Modal';
import doModalAction from '../../actions/doModalAction';
import doProfileAction from '../../actions/doProfileAction';
import doHeaderAction from '../../actions/doHeaderAction';
import withReducer from '../../withReducer';
import modalReducer from '../../reducers/modal';

const LayerPartial = props => {
  const ispaymentCartPage = ['/cart', '/payment', '/payment/thankyou', '/compare-plans'].includes(window.location.pathname);
  if (!ispaymentCartPage) {
    return (
      <div>
        <EventListener
          target="document"
          onKeyDown={e => e.code === 'Escape' && props.doModalAction(`modal/${props.template}`, (props[props.template] || {}).uid, 'close')}
        />
        <Modal
          template={props.template}
          profiles={props.profiles}
          settings={props.settings}
          watermark={props.watermark}
          sendRequest={props.sendRequest}
          sendDecline={props.sendDecline}
          contactDetails={props.contactDetails}
          reportPhoneNo={props.reportPhoneNo}
          blockMember={props.blockMember}
          reportMisuse={props.reportMisuse}
          interests={props.interests}
          pendingExitIntent={props.pendingExitIntent}
          dailyRecommendations={props.dailyRecommendations}
          inviteDailyLimit={props.inviteDailyLimit}
          hiddenConnectLayer={props.hiddenConnectLayer}
          history={props.history}
          hisHerOrYour={props.hisHerOrYour}
          request={props.request}
          wwwBaseUrl={props.wwwBaseUrl}
          firstStep={props.firstStep}
          firstPhotoUpload={props.firstPhotoUpload}
          mostMatchesTour={props.mostMatchesTour}
          campaignLayer={props.campaignLayer}
          doModalAction={props.doModalAction}
          doProfileAction={props.doProfileAction}
          callConsultant={props.callConsultant}
          saveSearchBox={props.saveSearchBox}
          searchType={props.searchType}
          premiumProposition={props.premiumProposition}
          profilePhotoUpload={props.profilePhotoUpload}
          fbPhotoUpload={props.fbPhotoUpload}
          doHeaderAction={props.doHeaderAction}
          photoGuidelines={props.photoGuidelines}
          deletePhotoConfirmation={props.deletePhotoConfirmation}
          simpleMessage={props.simpleMessage}
          thankYouPage={props.thankYouPage}
          viewAlbum={props.viewAlbum}
          acceptMatch={props.acceptMatch}
          acceptPremium={props.acceptPremium}
        />
      </div>
    );
  }
  return null;
};
LayerPartial.propTypes = {
  template: PropTypes.modalTemplate.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  watermark: Modal.propTypes.watermark,
  contactDetails: Modal.propTypes.contactDetails,
  reportPhoneNo: Modal.propTypes.reportPhoneNo,
  sendRequest: Modal.propTypes.sendRequest,
  sendDecline: Modal.propTypes.sendDecline,
  pendingExitIntent: Modal.propTypes.pendingExitIntent,
  blockMember: Modal.propTypes.blockMember,
  interests: Modal.propTypes.interests,
  reportMisuse: Modal.propTypes.reportMisuse,
  firstStep: Modal.propTypes.firstStep,
  dailyRecommendations: Modal.propTypes.dailyRecommendations,
  inviteDailyLimit: Modal.propTypes.inviteDailyLimit,
  wwwBaseUrl: Modal.propTypes.wwwBaseUrl,
  history: Modal.propTypes.history,
  request: Modal.propTypes.request,
  firstPhotoUpload: Modal.propTypes.firstPhotoUpload,
  mostMatchesTour: Modal.propTypes.mostMatchesTour,
  campaignLayer: Modal.propTypes.campaignLayer,
  hiddenConnectLayer: Modal.propTypes.hiddenConnectLayer,
  doModalAction: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  callConsultant: Modal.propTypes.callConsultant,
  saveSearchBox: Modal.propTypes.saveSearchBox,
  searchType: Modal.propTypes.searchType,
  premiumProposition: Modal.propTypes.premiumProposition,
  profilePhotoUpload: Modal.propTypes.profilePhotoUpload,
  fbPhotoUpload: Modal.propTypes.fbPhotoUpload,
  hisHerOrYour: PropTypes.string.isRequired,
  doHeaderAction: PropTypes.func.isRequired,
  photoGuidelines: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  deletePhotoConfirmation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  simpleMessage: Modal.propTypes.simpleMessage,
  thankYouPage: Modal.propTypes.thankYouPage,
  viewAlbum: Modal.propTypes.viewAlbum,
  acceptMatch: Modal.propTypes.acceptMatch,
  acceptPremium: Modal.propTypes.acceptPremium,
};

const selector = (state, { location }) => {
  const {
    template,
    watermark,
    sendRequest,
    sendDecline,
    contactDetails,
    reportPhoneNo,
    pendingExitIntent,
    blockMember,
    reportMisuse,
    firstStep,
    firstPhotoUpload,
    dailyRecommendations,
    inviteDailyLimit,
    hiddenConnectLayer,
    interests,
    history,
    request,
    mostMatchesTour,
    campaignLayer,
    callConsultant,
    saveSearchBox,
    premiumProposition,
    profilePhotoUpload,
    fbPhotoUpload,
    photoGuidelines,
    deletePhotoConfirmation,
    simpleMessage,
    thankYouPage,
    viewAlbum,
    acceptMatch,
    acceptPremium,
  } = state.modal;

  const { searchType } = state.otherSearch;

  return {
    template,
    watermark,
    sendRequest,
    sendDecline,
    contactDetails,
    pendingExitIntent,
    blockMember,
    reportMisuse,
    firstStep,
    firstPhotoUpload,
    dailyRecommendations,
    inviteDailyLimit,
    hiddenConnectLayer,
    history,
    request,
    interests,
    mostMatchesTour,
    campaignLayer,
    callConsultant,
    saveSearchBox,
    searchType,
    premiumProposition,
    reportPhoneNo,
    wwwBaseUrl: state.config.app.wwwBaseUrl,
    profiles: state.profiles,
    settings: state.session.settings,
    hisHerOrYour: state.session.user.hisHerOrYour || '',
    profilePhotoUpload,
    fbPhotoUpload,
    photoGuidelines,
    deletePhotoConfirmation,
    simpleMessage,
    thankYouPage,
    viewAlbum,
    acceptMatch,
    acceptPremium,
  };
};

export default withReducer('modal', modalReducer)(
  withRouter(
    connect(selector, {
      doModalAction,
      doProfileAction,
      doHeaderAction,
    })(LayerPartial),
  ),
);
