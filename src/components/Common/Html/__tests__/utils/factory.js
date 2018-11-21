const allData = {
  chat: {
    settings: {
      status: 'offline',
      page: 'on',
      isOpen: false,
      activeTab: 'online',
      profileCardDisplay: false,
    },
  },
  config: {
    app: {
      wwwBaseUrl: 'https://www.shaadi.com',
      webp: '1',
    },
  },
  session: {
    isLoggedOut: false,
  },
  selfProfile: {
    photos: {
      count: 0,
      items: [],
      status: '',
      hasPhotos: false,
      canAddPhotos: true,
      isDefault: true,
    },
    gender: 'Male',
  },
  view: {
    width: 1106,
    topSpace: 0,
  },
  location: {
    path: '/my-shaadi/photos',
    pathname: 'My Photos',
    search: '',
  },
  doProfileAction() {},
  doModalAction() {},
  wwwBaseUrl: 'https://www.shaadi.com',
  isLoggedOut: false,
  isChatOpen: true,
  topSpace: 0,
  windowWidth: 1000,
  webp: '1',
};

const profileWithPhotos = {
  photos: {
    count: 4,
    items: [
      {
        domain_name: 'https://img2.shaadi.com',
        small: '/imgs/profiles/60-photo-coming-soon-m.gif',
        medium: '/imgs/profiles/150-photo-coming-soon-m.gif',
        semilarge: '/imgs/profiles/250-photo-coming-soon-m.gif',
        large: '/imgs/profiles/photo-400-coming-soon-m.jpg',
        status: 'P',
        photo_order: 0,
        profile_photo: true,
        '40X40': '',
        '60X60': '/imgs/profiles/60-photo-coming-soon-m.gif',
        '120X120': '',
        '150X200': '/imgs/profiles/150-photo-coming-soon-m.gif',
        '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
        '400X500': '/imgs/profiles/photo-400-coming-soon-m.jpg',
        '450X600': '',
        '750X1333': '',
      },
      {
        domain_name: 'https://img2.shaadi.com',
        small: '/imgs/profiles/60-photo-coming-soon-m.gif',
        medium: '/imgs/profiles/150-photo-coming-soon-m.gif',
        semilarge: '/imgs/profiles/250-photo-coming-soon-m.gif',
        large: '/imgs/profiles/photo-400-coming-soon-m.jpg',
        status: 'P',
        photo_order: 1,
        profile_photo: false,
        '40X40': '',
        '60X60': '/imgs/profiles/60-photo-coming-soon-m.gif',
        '120X120': '',
        '150X200': '/imgs/profiles/150-photo-coming-soon-m.gif',
        '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
        '400X500': '/imgs/profiles/photo-400-coming-soon-m.jpg',
        '450X600': '',
        '750X1333': '',
      },
      {
        domain_name: 'https://img2.shaadi.com',
        small: '/imgs/profiles/60-photo-coming-soon-m.gif',
        medium: '/imgs/profiles/150-photo-coming-soon-m.gif',
        semilarge: '/imgs/profiles/250-photo-coming-soon-m.gif',
        large: '/imgs/profiles/photo-400-coming-soon-m.jpg',
        status: 'P',
        photo_order: 2,
        profile_photo: false,
        '40X40': '',
        '60X60': '/imgs/profiles/60-photo-coming-soon-m.gif',
        '120X120': '',
        '150X200': '/imgs/profiles/150-photo-coming-soon-m.gif',
        '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
        '400X500': '/imgs/profiles/photo-400-coming-soon-m.jpg',
        '450X600': '',
        '750X1333': '',
      },
      {
        domain_name: 'https://img2.shaadi.com',
        small: '/imgs/profiles/60-photo-coming-soon-m.gif',
        medium: '/imgs/profiles/150-photo-coming-soon-m.gif',
        semilarge: '/imgs/profiles/250-photo-coming-soon-m.gif',
        large: '/imgs/profiles/photo-400-coming-soon-m.jpg',
        status: 'P',
        photo_order: 3,
        profile_photo: false,
        '40X40': '',
        '60X60': '/imgs/profiles/60-photo-coming-soon-m.gif',
        '120X120': '',
        '150X200': '/imgs/profiles/150-photo-coming-soon-m.gif',
        '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
        '400X500': '/imgs/profiles/photo-400-coming-soon-m.jpg',
        '450X600': '',
        '750X1333': '',
      },
    ],
    status: 'coming_soon',
    hasPhotos: true,
    canAddPhotos: true,
    isDefault: false,
  },
  gender: 'Male',
};

const factory = { allData, profileWithPhotos };

it('should export profiles and props', () => {
  expect(factory.allData).not.toBeFalsy();
});

export default factory;
