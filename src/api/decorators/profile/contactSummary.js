import cookie from 'cookie';
import connectStatus from './contactSummary/connectStatus';
import contactDetailStatus from './contactSummary/contactDetailStatus';
import contactDetailsTitleStatus from './contactSummary/contactDetailsTitleStatus';
import otherReason from './contactSummary/otherReason';

const baseValue = {
  sms: null,
  actionDate: null,
  dnd: null,
  hidden: null,
  hiddenReason: null,
  tempKey: null,
  contactType: null,
  contact: {},
  photoStatus: '',
  photoCount: 0,
  profileContactStatus: '',
  contactDetailsStatusString: '',
  contactDetailsTitleStatusString: '',
};

const isValidPayload = payload => payload.account || payload.contact_summary || payload.contact;

const checkDoNotDisturbForXyzCookie = ({ dnd = 'N' }) => {
  const cookies = cookie.parse(document.cookie);
  const checkCookieForDnd = cookies.xyz_serve ? cookies.xyz_serve : '';
  return checkCookieForDnd !== '' && dnd === 'Y' ? dnd : 'N';
};

export default (baseline = baseValue, payload, getState) => {
  if (isValidPayload(payload)) {
    const { account, sms, other, contact_summary, contact, photo_details, connect } = payload;
    return {
      ...baseline,
      sms,
      actionDate: contact_summary && contact_summary.action_date_text,
      dnd: contact_summary ? checkDoNotDisturbForXyzCookie(contact_summary) : 'N',
      hidden: (account && account.hidden) || null,
      hiddenReason: account && other && account.hidden === 'Y' && otherReason(other),
      tempKey: contact_summary && contact_summary.temp,
      contactType: contact_summary && contact_summary.type,
      contactDetailsStatusString: contact && contactDetailStatus(contact),
      contactDetailsTitleStatusString: contact && contactDetailsTitleStatus(contact),
      contact,
      photoStatus: (photo_details && photo_details.status) || '',
      photoCount: (photo_details && photo_details.count) || 0,
      profileContactStatus: connect && connectStatus(connect),
    };
  }
  return null;
};
