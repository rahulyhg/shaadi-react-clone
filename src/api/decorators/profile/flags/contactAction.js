export default contact => {
  if (contact) {
    switch (contact.contact_details_status) {
      case 'free_member':
        return 'free';
      case 'show_all':
        return 'available';
      case 'contact_detail_not_verified_request':
        return 'availableOnVerification';
      case 'contact_detail_not_verified_requested':
        return 'availableOnVerificationRequested';
      case 'when_i_contact_member_declined':
      case 'when_i_contact_member_contacted':
      case 'when_i_contact_member_cancelled':
      case 'when_i_contact':
        return 'availableOnRequest';
      case 'filtered':
        return 'filtered';
      case 'hide_my_number':
        return 'locked';
      case 'hide_my_number_member_accepted':
        return 'lockedMemberAccepted';
      case 'profile_cancelled':
        return 'profileCancelled';
      case 'show_to_free_and_premium':
        return 'showToFreeAndPremium';
      default:
        return contact.contact_details_status;
    }
  }
  return null;
};
