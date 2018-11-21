export default contact => {
  if (contact) {
    switch (contact.contact_details_status) {
      case 'same_gender':
        return 'sameGender';
      case 'tobescreened_member_status':
        return 'currentlyUnderScreening';
      case 'member_hidden':
        return 'hidden';
      case 'profile_cancelled':
        return 'theyCancelled';
      case 'profile_declined':
        return 'theyDeclined';
      case 'filtered':
        return 'theyFiltered';
      case 'add_member_contact_details':
        return 'notVerified';
      case 'when_i_contact_member_declined':
      case 'when_i_contact_member_contacted':
      case 'when_i_contact_member_cancelled':
      case 'when_i_contact':
        return 'availableOnRequest';
      case 'hide_my_number':
      case 'hide_my_number_member_accepted':
        return 'numberHiddenByMember';
      case 'show_all':
        return 'available';
      case 'contact_detail_not_verified_requested':
        return 'contactDetailNotVerifiedRequested';
      case 'contact_detail_not_verified_request':
        return 'contactDetailNotVerifiedRequest';
      case 'membership_contact_limit_exceeded':
        return 'membershipContactLimitExceeded';
      case 'max_contact_limit_exceeded':
        return 'maxContactLimitExceeded';
      case 'profile_contact_details_under_screening':
        return 'theyCurrentlyUnderScreening';
      case 'member_blocked':
        return 'blocked';
      case 'member_cancelled':
        return 'cancelled';
      case 'member_declined':
        return 'declined';
      case 'profile_blocked':
        return 'theyBlocked';
      case 'profile_hidden':
        return 'theyHidden';
      case 'invalid_profile':
        return 'disabled';
      case 'profile_accepted':
        return 'theyAccepted';
      case 'profile_filtered_contacted':
      case 'profile_contacted':
        return 'theyContacted';
      case 'member_accepted':
        return 'accepted';
      case 'member_contacted_today':
      case 'member_reminder_sent':
      case 'member_contacted':
        return 'contacted';
      case 'member_filtered_contacted':
        return 'filteredContacted';
      default:
        return 'none';
    }
  }
  return null;
};
