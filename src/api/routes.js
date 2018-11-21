import AuthController from './controllers/AuthController';
import SessionsController from './controllers/SessionsController';
import CountsController from './controllers/CountsController';
import SuccessStoriesController from './controllers/SuccessStoriesController';
import PreferredMatchesController from './controllers/PreferredMatchesController';
import WidgetMatchesController from './controllers/WidgetMatchesController';
import SearchPhotosController from './controllers/SearchPhotosController';
import ProfileActionsController from './controllers/ProfileActionsController';
import ChatsController from './controllers/ChatsController';
import ChatWindowsController from './controllers/ChatWindowsController';
import LayersController from './controllers/LayersController';
import ChatAuthorizationsController from './controllers/ChatAuthorizationsController';
import NotificationsController from './controllers/NotificationsController';
import ChatHistoriesController from './controllers/ChatHistoriesController';
import ShortlistsController from './controllers/ShortlistsController';
import DraftsController from './controllers/DraftsController';
import ContactLookupsController from './controllers/ContactLookupsController';
import SendSmsController from './controllers/SendSmsController';
import ProfilesController from './controllers/ProfilesController';
import ProfileQueuesController from './controllers/ProfileQueuesController';
import TickersController from './controllers/TickersController';
import PreferencesController from './controllers/PreferencesController';
import PresenceController from './controllers/PresenceController';
import OtherSearchController from './controllers/OtherSearchController';
import MessagesController from './controllers/MessagesController';
import VerificationRequestController from './controllers/VerificationRequestController';
import AttachmentsController from './controllers/AttachmentsController';
import ConsultationController from './controllers/ConsultationController';
import SearchBannerController from './controllers/SearchBannerController';
import DiscoverMatchesController from './controllers/DiscoverMatchesController';
import IntentsController from './controllers/IntentsController';
import ProfilePhotosController from './controllers/ProfilePhotosController';
import SavedSearchController from './controllers/SavedSearchController';
import DailyRecommendationController from './controllers/DailyRecommendationController';
import ProfilePhotoController from './controllers/ProfilePhotoController';
import ContactSummaryController from './controllers/ContactSummaryController';
import InboxController from './controllers/InboxController';
import PaymentController from './controllers/PaymentController';
import ReportPhoneController from './controllers/ReportPhoneController';
import CsatSurveyController from './controllers/CsatSurveyController';
import LookUpController from './controllers/LookUpController';
import PhoneSettingsController from './controllers/PhoneSettingsController';
import DashBoardWidgetsController from './controllers/DashBoardWidgetsController';

const routes = {
  get: {},
  post: {},
  put: {},
  patch: {},
  delete: {},
};

// GET
routes.get['/auth/me'] = AuthController.show;
routes.get['/sessions/me'] = SessionsController.show;
routes.get['/counts/me'] = CountsController.show;
routes.get['/success-stories'] = SuccessStoriesController.index;
routes.get['/preferred_matches'] = PreferredMatchesController.index;
routes.get['/other_search'] = OtherSearchController.index;
routes.get['/widgets/:widget/matches'] = WidgetMatchesController.index;
routes.get['/search/photos'] = SearchPhotosController.index;
routes.get['/chats/me'] = ChatsController.index;
routes.get['/layers/me'] = LayersController.index;
routes.get['/discoverMatches'] = DiscoverMatchesController.index;
routes.get['/intentsGroup'] = IntentsController.index;
routes.get['/chat-authorizations/me'] = ChatAuthorizationsController.show;
routes.get['/notifications/me'] = NotificationsController.index;
routes.get['/chat-histories'] = ChatHistoriesController.show;
routes.get['/drafts'] = DraftsController.index;
routes.get['/drafts/default'] = DraftsController.show;
routes.get['/profiles/:id'] = ProfilesController.show;
routes.get['/profiles/list'] = ProfilesController.showMultiple;
routes.get['/txtprofiles/:id'] = ProfilesController.showTxt;
routes.get['/profiles/blocked-count'] = ProfilesController.getBlockedCount;
routes.get['/profile-queues/me'] = ProfileQueuesController.show;
routes.get['/profile-queues/bulk'] = ProfileQueuesController.index;
routes.get['/shortlists/me/list_ids'] = ShortlistsController.show;
routes.get['/tickers/me'] = TickersController.show;
routes.get['/serve/get-vip-consulant-detail'] = ConsultationController.index;
routes.get['/serve/get-consultation'] = ConsultationController.track;
routes.get['/profiles/photos:id'] = ProfilePhotosController.index;
routes.get['/search/banner'] = SearchBannerController.index;
routes.get['/save-search'] = SavedSearchController.index;
routes.get['/drProfiles'] = DailyRecommendationController.index;
routes.get['/:id/astro'] = ProfilesController.getAstro;
routes.get['/reg-photo-page-profile'] = ProfilesController.getConsentStoppageData;

routes.get['/:id/photos'] = ProfilePhotoController.getAllAlbumPhotos;
routes.get['/:id/profile-photo'] = ProfilePhotoController.getProfilePhoto;
routes.get['/:id/album-photos'] = ProfilePhotoController.getProfileAndAlbumPhotos;
routes.get['/:id/photos/rejected'] = ProfilePhotoController.getRejectedPhotos;
routes.get['/profiles/:id/photos'] = ProfilePhotoController.getOtherProfilePhotos;

routes.get['/inbox'] = InboxController.index;
routes.get['/inbox/requests'] = InboxController.getRequestSummary;
routes.get['/:id/preferences'] = PreferencesController.getPhotoPrivacySettings;
routes.get['/contactSummary'] = ContactSummaryController.show;
routes.get['/payment/get-cart'] = PaymentController.cart;
routes.get['/payment/bank-list'] = PaymentController.bankList;
routes.get['/payment/door-step'] = PaymentController.doorStep;
routes.get['/payment/shaadi-centers'] = PaymentController.shaadiCenters;
routes.get['/payment/uae-cities'] = PaymentController.uaeCities;
routes.get['/payment/member-contact-details'] = PaymentController.memberContactDetails;
routes.get['/config/user/:id'] = SessionsController.getExperiment;
routes.get['/payment/get-products'] = PaymentController.products;
routes.get['/payment/order-success'] = PaymentController.orderSuccess;
routes.get['/payment/bank-list-juspay'] = PaymentController.bankListJusPay;
routes.get['/pages/banners'] = LayersController.getBanner;
routes.get['/profiles/:id/badge'] = ProfilesController.getTrustBadgeData;
routes.get['/csatSurvey'] = CsatSurveyController.show;
routes.get['/phoneSettings'] = PhoneSettingsController.show;
routes.get['/dashBoardWidgets'] = DashBoardWidgetsController.index;

// profile creation pages relatd api
routes.get['/profile/:id/draft'] = ProfilesController.getDraftProfile;
routes.get['/profile/:id/aboutmetemplate'] = ProfilesController.getAboutMeTemplate;

/* lookup api starts */
routes.get['/lookup/country'] = LookUpController.getCountry;
routes.get['/lookup/state'] = LookUpController.getState;
routes.get['/lookup/city-by-zip'] = LookUpController.getCityByZip;
routes.get['/lookup/city'] = LookUpController.getCity;
routes.get['/lookup/district'] = LookUpController.getDistrict;
routes.get['/lookup/caste'] = LookUpController.getCaste;
routes.get['/lookup/subcaste'] = LookUpController.getSubCaste;
routes.get['/lookup/gotra'] = LookUpController.getGotra;
routes.get['/lookup/education'] = LookUpController.getWorkingAs;
routes.get['/lookup/working-as'] = LookUpController.getWorkingAs;
routes.get['/lookup/annual-income'] = LookUpController.getAnnualIncome;
routes.get['/lookup/height'] = LookUpController.getHeight;
routes.get['/lookup/marital'] = LookUpController.getMarital;
routes.get['/lookup/phone-country'] = LookUpController.getPhoneCountry;
routes.get['/lookup/gotra'] = LookUpController.getGotra;
routes.get['/lookup/rashi'] = LookUpController.getRashi;
routes.get['/lookup/nakshatra'] = LookUpController.getNakshatra;
routes.get['/lookup/domain'] = LookUpController.getDomain;
routes.get['/lookup/dosham-types'] = LookUpController.getDoshamTypes;
routes.get['/lookup/ethnicity'] = LookUpController.getEthnicity;
routes.get['/lookup/college'] = LookUpController.getCollege;
routes.get['/lookup/employer'] = LookUpController.getEmployer;
routes.get['/member/get-language'] = PreferencesController.getLanguageSettings;
/* lookup api ends */

// POST
routes.post['/contact-lookups'] = ContactLookupsController.create;
routes.post['/send-sms'] = SendSmsController.create;
routes.post['/drafts'] = DraftsController.create;
routes.post['/profile-actions'] = ProfileActionsController.create;
routes.post['/profile-actions/layerShown'] = ProfileActionsController.updateLayerShown;
routes.post['/shortlists'] = ShortlistsController.create;
routes.post['/sendMessage'] = MessagesController.sendMessage;
routes.post['/sendVerificationRequest'] = VerificationRequestController.send;
routes.post['/serve/enquirynew'] = ConsultationController.send;
routes.post['/attachments'] = AttachmentsController.create;
routes.post['/save-search'] = SavedSearchController.save;
routes.post['/profile-photo-upload'] = ProfilePhotoController.update;
routes.post['/facebook-photo-upload'] = ProfilePhotoController.facebookUpdate;
routes.post['/report-phone'] = ReportPhoneController.save;
routes.post['/consent/:id'] = ProfileActionsController.verificationConsent;
routes.post['/inbox'] = InboxController.send;
routes.post['/get-sms'] = SendSmsController.send;
routes.post['/payment/otp-generation'] = PaymentController.otpGeneration;
routes.post['/profile/track'] = ProfilesController.track;
routes.post['/profile/mark-profile-viewed'] = ProfilesController.trackProfileView;
routes.post['/csatSurvey'] = CsatSurveyController.save;
routes.post['/profile/:id/create'] = ProfilesController.createProfile;
routes.post['/profile/:id/track'] = ProfilesController.trackProfile;
routes.post['/payment/add-to-cart'] = PaymentController.addToCart;
routes.post['/phoneSettings'] = PhoneSettingsController.save;
routes.post['/payment/get-order-id'] = PaymentController.getOrderId;

// PUT
routes.put['/drafts'] = DraftsController.update;
routes.put['/profiles/me'] = ProfilesController.update;
routes.put['/astro/me'] = ProfilesController.updateAstro;
routes.put['/matches-tour-shown'] = PreferencesController.updateMatchesSwitch;
routes.put['/chat-presence/update'] = PresenceController.updateChatPresence;
routes.put['/chat-windows/update'] = ChatWindowsController.update;
routes.put['/:id/photo'] = ProfilePhotoController.updatePhoto;
routes.put['/:id/preferences'] = PreferencesController.updatePhotoPrivacySettings;
routes.put['/payment/otp-verification'] = PaymentController.otpVerification;
routes.put['/profile/:id/draft'] = ProfilesController.updateDraftProfile;
routes.put['/profiles/:id/badge'] = ProfilesController.updateTrustBadge;
routes.put['/member/update-language'] = PreferencesController.updateLanguageSettings;

// DELETE
routes.delete['/:id/photo'] = ProfilePhotoController.deletePhoto;

export default routes;
