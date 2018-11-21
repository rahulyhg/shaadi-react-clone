import getAnyFormatToDateTime from '../../../../helpers/getAnyFormatToDateTime';
import dateTimeFormat from '../../../../constants/formats/dateTime';

export default (account, connect, otherUid, other = {}, extra = {}, intents = {}) => {
  if (account && account.status !== 'Active') {
    return 'disabled'; // Show no cta
  }

  if (connect && connect.connect_status) {
    switch (connect.connect_status) {
      case 'invalid_profile':
        return 'disabled';
      case 'same_gender':
        return 'sameGender';
      case 'invalid_contact':
      case 'member_hidden':
        return 'hidden';
      case 'member_contacted_today':
      case 'member_reminder_sent':
      case 'member_contacted':
        return 'contacted';
      case 'member_filtered_contacted':
        return 'filteredContacted';
      case 'profile_accepted':
        return 'theyAccepted';
      case 'profile_declined':
        return 'theyDeclined';
      case 'member_cancelled':
        return 'cancelled';
      case 'member_blocked':
        return 'blocked';
      case 'profile_filtered_contacted':
      case 'profile_contacted':
        return 'theyContacted';
      case 'member_accepted':
        return 'accepted';
      case 'member_declined':
        return 'declined';
      case 'profile_cancelled':
        return 'theyCancelled';
      case 'profile_blocked':
        return 'blocked';
      case 'member_filtered':
      case 'not_contacted':
      case 'visitor':
      default:
      // Do as below
    }
  }
  if (account && connect && otherUid) {
    if (account.hidden === 'Y' || account.is_hidden === 'Y') {
      return 'hidden';
    }
    if (extra && extra.ignoredCount >= 1) {
      if (!connect.status_updated_date && !connect.record_date) {
        return 'ignored';
      }
      const ignoreDateObj = getAnyFormatToDateTime(`${extra.ignoredDate}`, dateTimeFormat.apiResp);
      const connectDateObj = getAnyFormatToDateTime(`${connect.status_updated_date || connect.record_date}`, dateTimeFormat.apiResp);
      const ignoreDateEpoch = ignoreDateObj.getEpoch();
      const connectDateEpoch = connectDateObj.getEpoch();
      if (ignoreDateEpoch >= connectDateEpoch) {
        return 'ignored';
      }
    }
    if (other.ignored === 'Y' || intents.type === 'ignored') {
      return 'ignored';
    }
    if (connect.from === otherUid) {
      switch (connect.status) {
        case 'Accepted':
          return 'accepted';
        case 'Declined':
          return 'declined';
        case 'Contacted':
          return 'theyContacted';
        case 'Cancelled':
          return 'theyCancelled';
        default:
      }
    }
    switch (connect.status) {
      case 'Blocked':
        return 'blocked';
      case 'Accepted':
        return 'theyAccepted';
      case 'Declined':
        return 'theyDeclined';
      case 'Contacted':
        return 'contacted';
      case 'Cancelled':
        return 'cancelled';

      default:
        if (other.ignored === 'Y') {
          return 'ignored';
        }
        if (other.shortlist_count !== undefined && other.shortlist_count > 0) {
          return 'shortlisted';
        }
        return 'default';
    }
  }
  return null;
};
