import React from 'react';
import s from './styles';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));

const getTelephone = ({ telephone, telephone_verified, tel_std, tel_isd }) => {
  let phone = tel_isd ? `${tel_isd}-` : '';
  phone = tel_std ? `${phone}${tel_std}-` : '';
  return telephone_verified === 'Y' && telephone ? `${phone}${telephone}` : false;
};

const getMobile = ({ mobile, mobile_verified, mob_isd, mob_std, mobile_country }) => {
  const phone = mob_isd ? `${mob_isd}-` : mob_std ? (['usa', 'canada'].includes(mobile_country.toLowerCase()) ? `${mob_std}-` : '') : '';
  return mobile_verified === 'Y' && mobile ? `${phone}${mobile}` : false;
};

const fetchCallTimings = ({ from_time_hours, to_time_hours }) => {
  const fromTimeHours = from_time_hours ? (from_time_hours > 12 ? from_time_hours - 12 : from_time_hours) : false;
  const toTimeHrous = to_time_hours ? (to_time_hours > 12 ? to_time_hours - 12 : to_time_hours) : false;
  const fromTimeHoursMeridiem = from_time_hours < 12 ? 'AM' : from_time_hours > 12 && from_time_hours === 24 ? 'AM' : 'PM';
  const toTimeHoursMeridiem = to_time_hours && to_time_hours < 12 ? 'AM' : to_time_hours > 12 && to_time_hours === 24 ? 'AM' : 'PM';
  return fromTimeHours && toTimeHrous ? `${fromTimeHours}:00 ${fromTimeHoursMeridiem} - ${toTimeHrous}:00 ${toTimeHoursMeridiem}` : false;
};

const getNumbersToDisplay = (landline, mobile) =>
  landline && mobile ? (
    <s.noCss>
      <s.contactHidden>{mobile}</s.contactHidden> and <s.contactHidden>{landline}</s.contactHidden>
    </s.noCss>
  ) : mobile ? (
    <s.contactHidden>{mobile}</s.contactHidden>
  ) : (
    <s.contactHidden>{landline}</s.contactHidden>
  );

const contactInformationToCall = contactSummary => {
  const { contact, dnd } = contactSummary;
  const nameOfContact = contact.name ? contact.name : 'This Member';
  const landline = getTelephone(contact) && dnd === 'Y' ? `**********` : getTelephone(contact);
  const mobile = getMobile(contact) && dnd === 'Y' ? `**********` : getMobile(contact);

  const relationshipWithMember = contact.relation ? `(${contact.relation}) ` : '';
  const convenientTimeToCall = fetchCallTimings(contact) ? ` from ${fetchCallTimings(contact)}` : '';
  const numbersToDisplay = getNumbersToDisplay(landline, mobile);
  const phone = !!(landline || mobile);

  return nameOfContact && phone ? (
    <s.unifiedMinProfile>
      {nameOfContact} {relationshipWithMember}can be contacted on {numbersToDisplay}
      {convenientTimeToCall}
    </s.unifiedMinProfile>
  ) : (
    ''
  );
};

const photoCursorCondition = {
  show_photo: true,
  photo_request: true,
  photo_request_sent: false,
  add_photo: false,
  only_when_i_contact: false,
  when_i_contact: false,
  coming_soon: false,
  enter_password: false,
  password_request_sent: false,
};

const phoneIcon = (contactDetailsTitleStatus, contactDetailsStatus, profileContactStatus, isProfileHidden) => {
  let phoneIconValue = '';
  let phoneIconTitleStatus = '';

  if (contactDetailsTitleStatus && contactDetailsStatus) {
    phoneIconTitleStatus = contactDetailsTitleStatus;
    if (['theyCancelled', 'theyDeclined', 'availableOnRequest', 'theyBlocked'].includes(contactDetailsStatus)) {
      return phoneIconValue;
    }

    if (['cancelled', 'declined', 'blocked'].includes(profileContactStatus)) {
      return phoneIconValue;
    }

    if (contactDetailsStatus === 'contactDetailNotVerifiedRequested') {
      phoneIconTitleStatus = 'contactDetailNotVerifiedRequested';
    }

    if (contactDetailsTitleStatus === 'none' || contactDetailsStatus === 'contact_detail_not_verified_request') {
      return phoneIconValue;
    }
    if (contactDetailsTitleStatus === 'none' || contactDetailsStatus === 'invalid_profile') {
      return phoneIconValue;
    }

    switch (phoneIconTitleStatus) {
      case 'available':
        phoneIconValue = <s.contactSummaryEnabled title="Contact number available" />;
        break;

      case 'visibleOnUpgrade':
        phoneIconValue = <s.contactSummaryDisabled title="Contact number available on Request" />;
        break;

      case 'locked':
        phoneIconValue = <s.hideNumberDisabledNew title="Contact number hidden" />;
        break;

      case 'contactDetailNotVerifiedRequested':
        phoneIconValue = <s.contactSummaryVerifying title="Contact number Requested" />;
        break;

      default:
        phoneIconValue = '';
        break;
    }
    if (isProfileHidden === 'Y') {
      phoneIconValue = '';
    }
  }

  return phoneIconValue;
};

const imageTitleConditionFn = ({ photoStatus, photoCount }) =>
  photoCursorCondition[photoStatus] ? (photoCount > 1 ? 'View Album Photos' : photoCount === 1 ? 'View Large Photo' : '') : '';

const getHiddenStatusReasonFn = (status, profileHisHer, wwwBaseUrl) => {
  let text = '';
  const url = `${wwwBaseUrl}/shaadi-info/index/terms`;
  if (status) {
    switch (status) {
      case 'selfHidden':
        text = `Member has decided to keep ${profileHisHer} profile hidden. Please check again after a few days.`;
        break;
      case 'systemHidden':
        text = (
          <s.noCss>
            Profile is temporarily hidden because of possible{' '}
            <s.termsLink target="_blank" to={url}>
              Terms of Use
            </s.termsLink>{' '}
            violation. Please check again after a few days.
          </s.noCss>
        );
        break;
      case 'selfDeleted':
        text = `Member has deleted ${profileHisHer} profile.`;
        break;
      case 'systemDeleted':
        text = (
          <s.noCss>
            Profile has been deleted due to the{' '}
            <s.termsLink target="_blank" to={url}>
              {' '}
              Terms of Use
            </s.termsLink>{' '}
            violation.
          </s.noCss>
        );
        break;
      case 'defaultDeleted':
        text = `Sorry, this Member has chosen to hide ${profileHisHer} Profile recently.`;
        break;
      default:
        text = '';
        break;
    }
  }
  return text;
};

const getImageForInvalidProfile = (loggerGender, wwwBaseUrl) => {
  let imgSrc = '';
  switch (loggerGender) {
    case 'Female':
      imgSrc = `/assets/60-add-ph-male-v2.gif`;
      break;
    case 'Male':
      imgSrc = `/assets/60-add-ph-female-v2.gif`;
      break;
    default:
      imgSrc = '';
      break;
  }
  return imgSrc;
};

const contactDetailStatusInfoFn = ({ heShe, hisHer, name }, contactInfo, wwwBaseUrl) => {
  if (heShe && hisHer && name && contactInfo && wwwBaseUrl) {
    const profileHeShe = heShe.toLowerCase();
    const profileHeSheCapitalCase = heShe;
    const profileHisHer = hisHer.toLowerCase();
    const profileName = name;
    const { hiddenReason, hidden, contactDetailsStatusString, profileContactStatus } = contactInfo;

    const contactDetailStatusInfo = {
      sameGender: `You cannot view phone numbers of Members who belong to the same gender as you`,
      currentlyUnderScreening: `Your profile is currently under screening.`,
      hidden: `Your profile is currently hidden.`,
      theyCancelled: `Phone No. not available as ${profileHeShe} has Cancelled ${profileHisHer} invitation.`,
      theyDeclined: `Phone No. not available as ${profileHeShe} has Declined your invitation.`,
      theyFiltered: `Phone No. not available as ${profileHeShe} has Filtered you out.`,
      notVerified: `Your Phone No. not verified.`,
      availableOnRequest: `Phone No. Visible on Accept.`,
      numberHiddenByMember: `Phone No. Hidden by member`,
      available: contactInformationToCall(contactInfo),
      contactDetailNotVerifiedRequested: `Your request for verifying contact number has been sent to the member.`,
      contactDetailNotVerifiedRequest: `${profileHeSheCapitalCase} has not Verified Phone No..`,
      none: `${profileName} has chosen not to display ${profileHisHer} Phone No. to other Members.`,
      membershipContactLimitExceeded: `You have exceeded the maximum limit of phone numbers .`,
      maxContactLimitExceeded: `You have exceeded your daily limit.`,
      theyCurrentlyUnderScreening: `profile is currently under screening.`,
      blocked: `You have Blocked this member.`,
      cancelled: `You Cancelled your Invitation.`,
      declined: `You Declined ${profileHisHer} Invitation.`,
      theyBlocked: hiddenReason ? getHiddenStatusReasonFn(hiddenReason, profileHisHer, wwwBaseUrl) : `Profile has been deactivated.`,
      theyHidden: getHiddenStatusReasonFn(hiddenReason, profileHisHer, wwwBaseUrl),
      disabled: `Profile has been deactivated due to inactivity.`,
    };
    if (['cancelled', 'declined'].includes(profileContactStatus)) {
      return contactDetailStatusInfo[profileContactStatus];
    }
    if (hidden === 'Y') {
      const hiddenStatus = 'theyHidden';
      return contactDetailStatusInfo[hiddenStatus];
    }
    return contactDetailsStatusString ? contactDetailStatusInfo[contactDetailsStatusString] : '';
  }
  return '';
};

const renderContactCondition = {
  true: `Viewed Phone No. and SMS sent to `,
  false: `SMS sent to `,
};

const getProfileItemDataFn = props => {
  const { profileData } = props;
  const contactInfo = profileData && profileData.contactSummary ? profileData.contactSummary : false;
  const flags = profileData && profileData.flags;
  const profileTempKey = contactInfo && contactInfo.tempKey;
  const profileUid = profileData && profileData.uid;
  const ubt = window.btoa(unescape(encodeURIComponent(`${props.meta.permaLink}|${props.meta.results_id}|${profileTempKey}`)));
  const contactDetailsStatus = contactInfo ? contactInfo.contactDetailsStatusString : '';
  const contactDetailsTitleStatusString = contactInfo ? contactInfo.contactDetailsTitleStatusString : '';
  return {
    isSms: contactInfo && contactInfo.sms,
    contactDetailsStatus,
    contactDetailsTitleStatus: contactDetailsTitleStatusString,
    profileContactStatus: contactInfo && contactInfo.profileContactStatus,
    isProfileHidden: contactInfo && contactInfo.hidden,
    profileName: profileData && profileData.name,
    isSettingsPaidUser: props.settings && props.settings.isPaidUser,
    profileTempKey,
    profileUid,
    loggerGender: props.settings && props.settings.gender,
    ubt,
    profileUrl: `/profile?profileid=${profileUid}&ubt=${ubt}&source=unified&evt_ref=${encode64('inbox-contactsavailed')}`,
    profileThumbnailBlur: profileData && profileData.thumbnailBlur,
    profileDetails:
      profileData && profileData.base && profileData.base.infoMap.reduce((accum, detail) => `${accum}, ${detail.value}`, '').slice(2),
    profileMembershipLevel: flags && flags.membershipLevel,
    inValidProfile: contactDetailsStatus === 'disabled',
    actionDate: contactInfo && contactInfo.actionDate,
  };
};
const getBackgroundColorConditionFn = (contactDetailsStatus, profileContactStatus) => {
  let status = false;
  const profileContactCondition = ['cancelled', 'declined'].includes(profileContactStatus);
  if (contactDetailsStatus === 'available' && !profileContactCondition) {
    status = true;
  }
  return status;
};

export {
  contactInformationToCall,
  photoCursorCondition,
  phoneIcon,
  imageTitleConditionFn,
  getHiddenStatusReasonFn,
  getImageForInvalidProfile,
  contactDetailStatusInfoFn,
  renderContactCondition,
  getProfileItemDataFn,
  getBackgroundColorConditionFn,
};
