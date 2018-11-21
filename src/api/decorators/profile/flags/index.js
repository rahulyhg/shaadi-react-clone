import membershipLevel from './membershipLevel';
import isDeleted from './isDeleted';
import connectionStatus from './connectionStatus';
import connectionAction from './connectionAction';
import connectionNote from './connectionNote';
import albumStatus from './albumStatus';
import contactStatus from './contactStatus';
import contactAction from './contactAction';
import isWatermarked from './isWatermarked';
import isTwoWayMatch from './isTwoWayMatch';
import horoscopeStatus from './horoscopeStatus';
import horoscopeStyle from './horoscopeStyle';
import isNri from './isNri';
import activeStatus from './activeStatus';
import isBoldListing from './isBoldListing';
import isIndianDiaspora from './isIndianDiaspora';
import canCancelInvite from './canCancelInvite';
import canRemind from './canRemind';
import canUnblock from './canUnblock';
import isFamilyGamified from './isFamilyGamified';
import isAstroReady from './isAstroReady';
import isHidden from './isHidden';
import isBothPartyPayUser from './isBothPartyPayUser';
import showHistory from './showHistory';
import isSameGender from './isSameGender';
import isNameLocked from './isNameLocked';
import membershipTags from './membershipTags';
import canCallSendSMS from './canCallSendSMS';
import canSendEmail from './canSendEmail';
import canSendEmailReminder from './canSendEmailReminder';
import canSendSMS from './canSendSMS';
import canViewPhoneNumber from './canViewPhoneNumber';
import isPhoneNoViewed from './isPhoneNoViewed';
import isSmsAlreadySent from './isSmsAlreadySent';
import showChatNow from './showChatNow';
import showPostOnWall from './showPostOnWall';
import isFiltered from './isFiltered';
import isProfileViewed from './isProfileViewed';
import hiddenReason from './hiddenReason';

const baseValue = {};
const isValidPayload = payload => !!payload.account;
const isDefined = (obj, key) => typeof obj.key !== 'undefined';
const astroReligions = ['hindu', 'jain', 'buddhist', 'sikh'];
const isHoroscopeApplicable = doctrine => astroReligions.includes(doctrine.religion.toLowerCase());

export default (baseline = baseValue, payload, extra) => {
  if (isValidPayload(payload)) {
    const { intents = {}, account: { memberlogin: uid }, photo_details: { photos = {} } = {} } = payload;
    return {
      ...baseline,
      membershipLevel: membershipLevel(payload.account.membership),
      membershipTags: membershipTags(payload.account.membership_tag),
      isBoldListing: isDefined(payload, 'is_bold_listed') ? payload.is_bold_listed : isBoldListing(payload.account.membership),
      isDeleted: isDeleted(payload.connect),
      connectionStatus: connectionStatus(payload.account, payload.connect, uid, payload.other, extra, intents),
      connectionAction: connectionAction(payload.account, payload.connect, uid, payload.other, extra),
      connectionNote: connectionNote(
        payload.account,
        payload.profileBrief ? payload.profileBrief : payload.basic,
        payload.connect,
        uid,
        payload.other,
        extra,
      ),
      contactStatus: contactStatus(payload.contact),
      contactAction: contactAction(payload.contact),
      horoscopeStatus: horoscopeStatus(payload.preferences, payload.astro),
      horoscopeStyle: horoscopeStyle(payload),
      albumStatus: albumStatus(payload, photos),
      isWatermarked: isWatermarked(payload),
      isTwoWayMatch: isTwoWayMatch(payload),
      activeStatus: activeStatus(payload.account),
      isNri: isDefined(payload, 'is_nri_profile') ? payload.is_nri_profile : isNri(payload.location),
      isIndianDiaspora: isIndianDiaspora(payload),
      isHoroscopeApplicable: payload.doctrine ? isHoroscopeApplicable(payload.doctrine) : false,
      isFamilyGamified: payload.family ? isFamilyGamified(payload.family) : false,
      isAstroReady: payload.astro ? isAstroReady(payload.astro) : false,
      isSameGender: isSameGender(payload.connect),
      canCancelInvite: canCancelInvite(payload.connect),
      canRemind: canRemind(payload.connect, { uid }),
      canUnblock: canUnblock(payload.connect),
      isHidden: isHidden(payload.account),
      hiddenReason: isHidden(payload.account) ? hiddenReason(payload.other || { hidden_reason: payload.hidden_reason }) : null,
      isBothPartyPayUser: isBothPartyPayUser(payload.both_party_pay),
      showHistory: payload.other && payload.other.show_history && showHistory(payload.other.show_history),
      isNameLocked: payload.other && payload.other.is_name_lock && isNameLocked(payload.other.is_name_lock),
      canCommunicate: (payload.other && payload.other.can_communicate) || null,
      isMaskedProfile: (payload.other && payload.other.mask_new_profile) || false,
      // relationship actions - instant contacts flags
      canCallSendSMS: payload.relationship_actions && canCallSendSMS(payload.relationship_actions),
      canSendEmail: payload.relationship_actions && canSendEmail(payload.relationship_actions),
      canSendEmailReminder: payload.relationship_actions && canSendEmailReminder(payload.relationship_actions),
      canSendSMS: payload.relationship_actions && canSendSMS(payload.relationship_actions),
      canViewPhoneNo: payload.relationship_actions && canViewPhoneNumber(payload.relationship_actions),
      isPhoneNoViewed: payload.relationship_actions && isPhoneNoViewed(payload.relationship_actions),
      isSmsAlreadySent: payload.relationship_actions && isSmsAlreadySent(payload.relationship_actions),
      showChatNow: payload.relationship_actions && showChatNow(payload.relationship_actions),
      showPostOnWall: payload.relationship_actions && showPostOnWall(payload.relationship_actions),
      isFiltered: payload.connect && payload.connect.filtered && isFiltered(payload.connect.filtered),
      isSkipped: false,
      isProfileViewed: (payload.viewed_profile && isProfileViewed(payload.viewed_profile)) || false,
    };
  }
  return null;
};
