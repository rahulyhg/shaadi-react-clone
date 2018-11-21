/* eslint camelcase: 0 */
import contactAction from '../profile/flags/contactAction';
import { hourMins } from '../utils';

const baseValue = {
  preferredName: '-',
  preferredTime: '-',
  landline: '-',
  mobileNo: '-',
  status: 'locked',
  email: '-',
  isMisuseReported: false,
};

const isBlank = x => (typeof x === 'string' && x.length === 0) || typeof x === 'undefined';
const clean = h => Object.keys(h).reduce((acc, k) => ({ ...acc, [k]: isBlank(h[k]) ? null : h[k] }), {});

export default (baseline = baseValue, payload = {}) => {
  const { details, other, email, isMisuseReported } = payload;
  const { name, relation, convenient_time, from_time_hours, from_time_mins, to_time_hours, to_time_mins, mob_isd, mob_std, mobile } = clean(
    details,
  );
  const preferredTime = convenient_time
    ? `${convenient_time}`
    : `${hourMins(from_time_hours, from_time_mins || 0)} - ${hourMins(to_time_hours, to_time_mins || 0)}`;

  return {
    ...baseline,
    preferredName: relation ? `${name} (${relation})` : name || '-',
    preferredTime,
    landline: '-',
    mobile: `${mob_isd || ''} ${mob_std || ''} ${mobile || '-'}`,
    eoiSent: other.eoi_sent,
    acceptSent: other.accept_sent,
    contactDeduction: other.contact_deduction,
    status: contactAction({ contact_details_status: other.contact_status }),
    email: email && email.emailid,
    isMisuseReported: isMisuseReported && isMisuseReported.phoneReported,
  };
};
