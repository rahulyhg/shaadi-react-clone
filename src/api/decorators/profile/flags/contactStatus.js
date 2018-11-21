export default contact => {
  if (contact) {
    switch (contact.contact_details_title_status) {
      case 'show_all':
        return 'available';
      case 'contact_detail_not_verified_request':
        return 'availableOnVerification';
      case 'when_i_contact_member_declined':
      case 'when_i_contact_member_contacted':
      case 'when_i_contact_member_cancelled':
      case 'when_i_contact':
        return 'availableOnRequest';
      case 'hide_my_number_member_accepted':
      case 'hide_my_number':
        return 'locked';
      case 'show_to_free_and_premium':
        return 'showToFreeAndPremium';
      default:
        return 'none';
    }
  }
  return null;
};
