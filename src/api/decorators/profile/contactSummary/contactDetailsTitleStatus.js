export default contact => {
  if (contact) {
    switch (contact.contact_details_title_status) {
      case 'profile_hidden_by_member':
        return 'selfHidden';
      case 'profile_hidden_by_system':
        return 'systemHidden';
      case 'profile_deactivated_by_member':
        return 'selfDeleted';
      case 'profile_deactivated_by_system':
        return 'systemDeleted';
      case 'deactivation_default_reason':
        return 'defaultDeleted';
      case 'show_all':
        return 'available';
      case 'when_i_contact':
        return 'visibleOnUpgrade';
      case 'hide_my_number':
        return 'locked';
      case 'contact_detail_not_verified_requested':
        return 'contactDetailNotVerifiedRequested';
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
      case 'hide_my_number_member_accepted':
        return 'numberHiddenByMember';
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
      case 'none':
        return 'none';
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
        return 'unknown';
    }
  }
  return null;
};
