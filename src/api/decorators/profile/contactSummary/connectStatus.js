export default connect => {
  if (connect) {
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
        return 'theyBlocked';
      case 'profile_hidden':
        return 'theyHidden';
      case 'when_i_contact_member_declined':
      case 'when_i_contact_member_contacted':
      case 'when_i_contact_member_cancelled':
      case 'when_i_contact':
        return 'availableOnRequest';
      case 'member_filtered':
      case 'not_contacted':
      case 'visitor':
      default:
        return 'none';
    }
  }
  return null;
};
