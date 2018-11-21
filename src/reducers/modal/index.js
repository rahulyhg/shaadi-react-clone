import { combineReducers } from 'redux';

import template from './template';
import watermark from './watermark';
import sendRequest from './sendRequest';
import sendDecline from './sendDecline';
import contactDetails from './contactDetails';
import pendingExitIntent from './pendingExitIntent';
import blockMember from './blockMember';
import reportMisuse from './reportMisuse';
import firstStep from './firstStep';
import dailyRecommendations from './dailyRecommendations';
import inviteDailyLimit from './inviteDailyLimit';
import history from './history';
import interests from './interests';
import firstPhotoUpload from './firstPhotoUpload';
import mostMatchesTour from './mostMatchesTour';
import request from './request';
import campaignLayer from './campaignLayer';
import viewAlbum from './viewAlbum';
import hiddenConnectLayer from './hiddenConnectLayer';
import callConsultant from './callConsultant';
import saveSearchBox from './saveSearchBox';
import premiumProposition from './premiumProposition';
import profilePhotoUpload from './profilePhotoUpload';
import fbPhotoUpload from './fbPhotoUpload';
import photoGuidelines from './photoGuidelines';
import deletePhotoConfirmation from './deletePhotoConfirmation';
import simpleMessage from './simpleMessage';
import reportPhoneNo from './reportPhoneNo';
import thankYouPage from './thankYouPage';
import acceptMatch from './acceptMatch';
import acceptPremium from './acceptPremium';

export default combineReducers({
  template,
  watermark,
  sendRequest,
  sendDecline,
  contactDetails,
  pendingExitIntent,
  blockMember,
  reportMisuse,
  firstStep,
  dailyRecommendations,
  inviteDailyLimit,
  history,
  request,
  interests,
  firstPhotoUpload,
  mostMatchesTour,
  campaignLayer,
  viewAlbum,
  hiddenConnectLayer,
  callConsultant,
  saveSearchBox,
  premiumProposition,
  profilePhotoUpload,
  fbPhotoUpload,
  photoGuidelines,
  deletePhotoConfirmation,
  simpleMessage,
  reportPhoneNo,
  thankYouPage,
  acceptMatch,
  acceptPremium,
});
