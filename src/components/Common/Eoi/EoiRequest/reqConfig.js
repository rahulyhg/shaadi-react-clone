const inboxReqMap = {
  photo: {
    NavUrl: '/my-shaadi/photo',
    Title: 'Add Photo',
    vip: {
      Icon: '/assets/prem/add-photo-vip.svg',
      hover: '/assets/prem/add-photo-vip-hover-hover.svg',
      cardHover: '/assets/prem/add-photo-vip-hover.svg',
    },
    otherUser: {
      Icon: '/assets/prem/add-photo.svg',
      hover: '/assets/prem/add-photo-hover-hover.svg',
      cardHover: '/assets/prem/add-photo-hover.svg',
    },
  },
  contact: {
    NavUrl: '/my-shaadi/contact-details',
    Title: 'Verify Phone No.',
    vip: {
      Icon: '/assets/prem/verify-phone-vip.svg',
      hover: '/assets/prem/verify-phone-vip-hover-hover.svg',
      cardHover: '/assets/prem/verify-phone-vip-hover.svg',
    },
    otherUser: {
      Icon: '/assets/prem/verify-phone.svg',
      hover: '/assets/prem/verify-phone-hover-hover.svg',
      cardHover: '/assets/prem/verify-phone-hover.svg',
    },
  },
};

const reqConfig = {
  inboxReqMap,
};

export default reqConfig;
