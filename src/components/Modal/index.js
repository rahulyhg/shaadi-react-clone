import React from 'react';
import PropTypes from '../../PropTypes';
import LoadComponentIfCalled from '../LoadComponentIfCalled';
import s from './styles';

const Watermark = LoadComponentIfCalled(() => import('./watermark').then(module => module.default));
const SendRequest = LoadComponentIfCalled(() => import('./sendRequest').then(module => module.default));
const SendDecline = LoadComponentIfCalled(() => import('./sendDecline').then(module => module.default));
const ContactDetails = LoadComponentIfCalled(() => import('./ContactDetails').then(module => module.default));
const ReportPhoneNo = LoadComponentIfCalled(() => import('./ContactDetails/reportPhoneNo').then(module => module.default));
const PendingExitIntent = LoadComponentIfCalled(() => import('./pendingExitIntent').then(module => module.default));
const BlockMember = LoadComponentIfCalled(() => import('./blockMember').then(module => module.default));
const ReportMisuse = LoadComponentIfCalled(() => import('./reportMisuse').then(module => module.default));
const FirstStep = LoadComponentIfCalled(() => import('./firstStep').then(module => module.default));
const FirstPhotoUpload = LoadComponentIfCalled(() => import('./firstPhotoUpload').then(module => module.default));
const DailyRecommendations = LoadComponentIfCalled(() => import('./dailyRecommendations').then(module => module.default));
const InviteDailyLimit = LoadComponentIfCalled(() => import('./inviteDailyLimit').then(module => module.default));
const UploadPhoto = LoadComponentIfCalled(() => import('./uploadPhoto').then(module => module.default));
const History = LoadComponentIfCalled(() => import('./history').then(module => module.default));
const Interests = LoadComponentIfCalled(() => import('./interests').then(module => module.default));
const MostMatchesTour = LoadComponentIfCalled(() => import('./mostMatchesTour').then(module => module.default));
const ProfileRequest = LoadComponentIfCalled(() => import('./request').then(module => module.default));
const CampaignLayer = LoadComponentIfCalled(() => import('./campaignLayer').then(module => module.default));
const LightBox = LoadComponentIfCalled(() => import('./lightBox').then(module => module.default));
const HiddenConnectLayer = LoadComponentIfCalled(() => import('./hiddenConnectLayer').then(module => module.default));
const CallConsultant = LoadComponentIfCalled(() => import('./callConsultant').then(module => module.default));
const SavedSearchBox = LoadComponentIfCalled(() => import('./savedSearchBox').then(module => module.default));
const PremiumProposition = LoadComponentIfCalled(() => import('./premiumProposition').then(module => module.default));
const ProfilePhotoUpload = LoadComponentIfCalled(() => import('./profilePhotoUpload').then(module => module.default));
const DeletePhotoConfirmation = LoadComponentIfCalled(() => import('./deletePhotoConfirmation').then(module => module.default));
const SimpleMessage = LoadComponentIfCalled(() => import('./simpleMessage').then(module => module.default));
const FBPhotoUpload = LoadComponentIfCalled(() => import('./fbPhotoUpload').then(module => module.default));
const PhotoGuidelines = LoadComponentIfCalled(() => import('./photoGuidelines').then(module => module.default));
const AcceptMatch = LoadComponentIfCalled(() => import('./acceptMatch').then(module => module.default));
const ThankYouPage = LoadComponentIfCalled(() => import('./ContactDetails/thankYouPage').then(module => module.default));
const AcceptPremium = LoadComponentIfCalled(() => import('./acceptPremium').then(module => module.default));

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onModalClose = this.modalAction('close');
    this.onMostMatchesTourInit = this.modalAction('mostMatchesTourInit');
    this.onAction = this.onAction.bind(this);
    this.headerAction = this.headerAction.bind(this);
  }

  onAction(type, ...args) {
    this.props.doProfileAction(`modal/${this.props.template}`, (this.props[this.props.template] || {}).uid, type, ...args);
  }

  headerAction(type, ...args) {
    let source = 'header';
    if (this.props.template === 'fbPhotoUpload') {
      source = this.props.fbPhotoUpload.source;
    }
    this.props.doHeaderAction(source, type, (this.props[this.props.template] || {}).uid, ...args);
  }

  modalAction(...args) {
    return () => this.props.doModalAction(`modal/${this.props.template}`, (this.props[this.props.template] || {}).uid, ...args);
  }

  render() {
    const template = this.props.template;
    switch (template) {
      case 'watermark':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <Watermark data={this.props.watermark} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'sendRequest':
        return (
          <s.Modal isVisible style={{ zIndex: 13 }}>
            <s.ColorBg />
            <SendRequest
              data={this.props.sendRequest}
              wwwBaseUrl={this.props.wwwBaseUrl}
              preview={this.props.profiles.self}
              settings={this.props.settings}
              onModalClose={this.onModalClose}
              doProfileAction={this.props.doProfileAction}
            />
          </s.Modal>
        );
      case 'sendDecline':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <SendDecline data={this.props.sendDecline} onModalClose={this.onModalClose} doProfileAction={this.props.doProfileAction} />
          </s.Modal>
        );
      case 'contactDetails':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <ContactDetails
              wwwBaseUrl={this.props.wwwBaseUrl}
              data={this.props.contactDetails}
              settings={this.props.settings}
              onModalClose={this.onModalClose}
              doProfileAction={this.props.doProfileAction}
              connectionFlags={
                (this.props.profiles[(this.props.contactDetails && this.props.contactDetails.uid) || 0] &&
                  this.props.profiles[(this.props.contactDetails && this.props.contactDetails.uid) || 0].flags) ||
                {}
              }
            />
          </s.Modal>
        );
      case 'reportPhoneNo':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <ReportPhoneNo data={this.props.reportPhoneNo} onModalClose={this.onModalClose} doProfileAction={this.props.doProfileAction} />
          </s.Modal>
        );
      case 'blockMember':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <BlockMember data={this.props.blockMember} onAction={this.onAction} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'reportMisuse':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <ReportMisuse data={this.props.reportMisuse} onAction={this.onAction} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'profilePhotoUpload':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <ProfilePhotoUpload data={this.props.profilePhotoUpload} headerAction={this.headerAction} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'deletePhotoConfirmation':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <DeletePhotoConfirmation
              data={this.props.deletePhotoConfirmation}
              headerAction={this.headerAction}
              onModalClose={this.onModalClose}
            />
          </s.Modal>
        );
      case 'simpleMessage':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <SimpleMessage data={this.props.simpleMessage} headerAction={this.headerAction} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'thankYouPage':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <ThankYouPage data={this.props.thankYouPage} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'fbPhotoUpload': {
        const fbPhotoUploadData = this.props.fbPhotoUpload;
        fbPhotoUploadData.existingPhotoCount = this.props.profiles.self.photos.count;
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <FBPhotoUpload data={this.props.fbPhotoUpload} headerAction={this.headerAction} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      }
      case 'premiumProposition':
        return (
          <s.Modal isVisible>
            <s.ColorBg onClick={this.onModalClose} />
            <PremiumProposition data={this.props.premiumProposition} onAction={this.onAction} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'firstStep':
        return (
          <s.Modal isVisible style={{ zIndex: 13 }}>
            <s.ColorBg
              onClick={() =>
                this.props.doModalAction(
                  `modal/${this.props.template}`,
                  this.props[this.props.template].uid,
                  'close',
                  `${this.props.firstStep}`,
                )
              }
            />
            <FirstStep
              wwwBaseUrl={this.props.wwwBaseUrl}
              data={this.props.firstStep}
              nextProfileLink={this.props.firstStep.nextProfileLink}
              doProfileAction={this.props.doProfileAction}
              onModalClose={this.onModalClose}
            />
          </s.Modal>
        );
      case 'firstPhotoUpload':
        return (
          <s.Modal isVisible style={{ zIndex: '12' }}>
            <s.ColorBg />
            <FirstPhotoUpload
              wwwBaseUrl={this.props.wwwBaseUrl}
              data={this.props.firstPhotoUpload}
              doProfileAction={this.props.doProfileAction}
              onModalClose={this.onModalClose}
            />
          </s.Modal>
        );
      case 'pendingExitIntent':
        return (
          <s.Modal isVisible style={{ zIndex: '12' }}>
            <s.ColorBg />
            <PendingExitIntent
              data={this.props.pendingExitIntent}
              doModalAction={this.props.doModalAction}
              onModalClose={this.onModalClose}
            />
          </s.Modal>
        );
      case 'dailyRecommendations':
        return (
          <s.Modal isVisible style={{ zIndex: '12' }}>
            <s.ColorBg />
            <DailyRecommendations
              data={this.props.dailyRecommendations}
              doModalAction={this.props.doModalAction}
              onModalClose={this.onModalClose}
            />
          </s.Modal>
        );
      case 'inviteDailyLimit':
        return (
          <s.Modal isVisible style={{ zIndex: '12' }}>
            <s.ColorBg />
            <InviteDailyLimit
              data={this.props.inviteDailyLimit}
              doProfileAction={this.props.doProfileAction}
              onModalClose={this.onModalClose}
            />
          </s.Modal>
        );
      case 'history':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <History data={this.props.history} doProfileAction={this.props.doProfileAction} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'request':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <ProfileRequest data={this.props.request} wwwBaseUrl={this.props.wwwBaseUrl} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'uploadPhoto':
        return (
          <s.Modal isVisible style={{ zIndex: '10' }}>
            <s.ColorBg />
            <UploadPhoto onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'interests':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <Interests items={this.props.interests.items} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'campaignLayer':
        return (
          <s.Modal isVisible style={{ zIndex: '12' }}>
            <s.ColorBg onClick={this.onModalClose} />
            <CampaignLayer data={this.props.campaignLayer} onModalClose={this.onModalClose} wwwBaseUrl={this.props.wwwBaseUrl} />
          </s.Modal>
        );
      case 'hiddenConnectLayer':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <HiddenConnectLayer data={this.props.hiddenConnectLayer} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      case 'callConsultant':
        return (
          <s.Modal isVisible>
            <s.ColorBg onClick={this.onModalClose} />
            <CallConsultant
              callConsultant={this.props.callConsultant}
              onModalClose={this.onModalClose}
              wwwBaseUrl={this.props.wwwBaseUrl}
              doProfileAction={this.props.doProfileAction}
              settings={this.props.settings}
              profileData={this.props.profiles[(this.props.callConsultant && this.props.callConsultant.uid) || 0]}
              selfData={this.props.profiles.self}
            />
          </s.Modal>
        );
      case 'saveSearchBox':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <SavedSearchBox
              doProfileAction={this.props.doProfileAction}
              onModalClose={this.onModalClose}
              saveSearchBox={this.props.saveSearchBox}
              searchType={this.props.searchType && this.props.searchType.name}
            />
          </s.Modal>
        );
      case 'photoGuidelines':
        return (
          <s.Modal isVisible>
            <s.ColorBg />
            <PhotoGuidelines onModalClose={this.onModalClose} gender={this.props.profiles.self.gender.toLowerCase()} />
          </s.Modal>
        );
      case 'mostMatchesTour':
        return <MostMatchesTour data={this.props.mostMatchesTour} onModalClose={this.onModalClose} onInit={this.onMostMatchesTourInit} />;
      case 'viewAlbum': {
        return (
          <s.Modal isVisible>
            <s.ColorBg onClick={this.onModalClose} />
            <LightBox data={this.props.viewAlbum} onModalClose={this.onModalClose} />
          </s.Modal>
        );
      }
      case 'accept_match':
        return (
          <s.Modal isVisible>
            <s.ColorBg onClick={this.onModalClose} />
            <AcceptMatch
              doModalAction={this.props.doModalAction}
              name={this.props.acceptMatch.name}
              uid={this.props.acceptMatch.uid}
              profilePhoto={this.props.acceptMatch.profilePhoto}
              selfPhoto={this.props.profiles.self.fullPhoto}
              himHer={this.props.acceptMatch.himHer}
              type={this.props.acceptMatch.type}
              settings={this.props.settings}
            />
          </s.Modal>
        );
      case 'acceptPremium':
        return (
          <s.Modal isVisible>
            <s.ColorBg onClick={this.onModalClose} />
            <AcceptPremium
              onModalClose={this.onModalClose}
              doProfileAction={this.props.doProfileAction}
              data={this.props.acceptPremium}
              selfPhoto={this.props.profiles.self.fullPhoto}
            />
          </s.Modal>
        );
      default:
        return null;
    }
  }
}

Modal.defaultProps = {
  saveSearchBox: {},
  searchType: {},
  acceptMatch: {},
  acceptPremium: {},
};

const getModalData = (ModalName, dataKeyName = 'data') => (ModalName.propTypes ? ModalName.propTypes[dataKeyName] : {});

Modal.propTypes = {
  doHeaderAction: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  doModalAction: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  template: PropTypes.modalTemplate.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  interests: PropTypes.shape(getModalData(Interests, 'items')).isRequired,
  callConsultant: PropTypes.shape(getModalData(CallConsultant, 'callConsultant')).isRequired,
  saveSearchBox: PropTypes.shape(getModalData(SavedSearchBox, 'saveSearchBox')),
  watermark: PropTypes.shape(getModalData(Watermark)).isRequired,
  contactDetails: PropTypes.shape(getModalData(ContactDetails)).isRequired,
  reportPhoneNo: PropTypes.shape(getModalData(ReportPhoneNo)).isRequired,
  sendRequest: PropTypes.shape(getModalData(SendRequest)).isRequired,
  sendDecline: PropTypes.shape(getModalData(SendDecline)).isRequired,
  blockMember: PropTypes.shape(getModalData(BlockMember)).isRequired,
  reportMisuse: PropTypes.shape(getModalData(ReportMisuse)).isRequired,
  firstStep: PropTypes.shape(getModalData(FirstStep)).isRequired,
  premiumProposition: PropTypes.shape(getModalData(PremiumProposition)).isRequired,
  firstPhotoUpload: PropTypes.shape(getModalData(FirstPhotoUpload)).isRequired,
  pendingExitIntent: PropTypes.shape(getModalData(PendingExitIntent)).isRequired,
  dailyRecommendations: PropTypes.shape(getModalData(DailyRecommendations)).isRequired,
  inviteDailyLimit: PropTypes.shape(getModalData(InviteDailyLimit)).isRequired,
  history: PropTypes.shape(getModalData(History)).isRequired,
  mostMatchesTour: PropTypes.shape(getModalData(MostMatchesTour)).isRequired,
  campaignLayer: PropTypes.shape(getModalData(CampaignLayer)).isRequired,
  hiddenConnectLayer: PropTypes.shape(getModalData(HiddenConnectLayer)).isRequired,
  viewAlbum: PropTypes.shape(getModalData(LightBox)).isRequired,
  profilePhotoUpload: PropTypes.shape(getModalData(ProfilePhotoUpload)).isRequired,
  deletePhotoConfirmation: PropTypes.shape(getModalData(DeletePhotoConfirmation)).isRequired,
  simpleMessage: PropTypes.shape(getModalData(SimpleMessage)).isRequired,
  thankYouPage: PropTypes.shape(getModalData(ThankYouPage)).isRequired,
  fbPhotoUpload: PropTypes.shape(getModalData(FBPhotoUpload)).isRequired,
  acceptMatch: PropTypes.shape(getModalData(AcceptMatch)).isRequired,
  acceptPremium: PropTypes.shape(getModalData(AcceptPremium)).isRequired,
  searchType: PropTypes.object, //eslint-disable-line
  request: PropTypes.shape({
    evtRef: PropTypes.string,
    item: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
    name: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default Modal;
