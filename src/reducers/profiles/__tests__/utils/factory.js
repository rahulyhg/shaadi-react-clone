import privacy from './privacy';
import profile from './profile';

const photoState = {
  default: {
    count: 0,
    items: [],
    status: '',
    hasPhotos: false,
    canAddPhotos: false,
    isDefault: true,
    isRejectedPhotosFetched: false,
  },
  getPhotoApiIssue: {
    count: 0,
    items: [],
    status: '',
    hasPhotos: true,
    canAddPhotos: true,
    isDefault: false,
    isRejectedPhotosFetched: true,
  },
  hasNoPhotos: {
    count: 0,
    items: [],
    status: 'add_photo',
    hasPhotos: false,
    canAddPhotos: true,
    isDefault: false,
    isRejectedPhotosFetched: true,
  },
  hasNoScreenedPhotos: {
    count: 1,
    items: [
      {
        status: 'P',
        photo_order: 0,
        profile_photo: true,
        domain_name: 'https://img2.shaadi.com',
        medium: '/imgs/profiles/150-photo-coming-soon-m.gif',
        '150X200': '/imgs/profiles/150-photo-coming-soon-m.gif',
        '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
      },
    ],
    status: 'coming_soon',
    hasPhotos: true,
    canAddPhotos: true,
    isDefault: false,
    isRejectedPhotosFetched: true,
  },
  hasPhotos: {
    count: 1,
    items: [
      {
        status: 'Y',
        photo_order: 0,
        profile_photo: true,
        domain_name: 'https://img1.shaadi.com',
        medium: '/2018/01/03/7SH52689034-263593-Male.jpg',
        '150X200': '/2018/01/03/7SH52689034-263593-Male.webp',
        '250X310': '/2018/01/03/7SH52689034-71303b-male.webp',
      },
    ],
    status: 'show_photo',
    hasPhotos: true,
    canAddPhotos: true,
    isDefault: false,
    isRejectedPhotosFetched: true,
  },
  hasAllKindsOfPhotos: {
    count: 5,
    items: [
      {
        status: 'Y',
        photo_order: 0,
        profile_photo: true,
        domain_name: 'https://img1.shaadi.com',
        medium: '/2018/01/03/7SH52689034-263593-Male.jpg',
        '150X200': '/2018/01/03/7SH52689034-263593-Male.webp',
        '250X310': '/2018/01/03/7SH52689034-71303b-male.webp',
      },
      {
        status: 'Y',
        photo_order: 1,
        domain_name: 'https://img1.shaadi.com',
        medium: '/2018/01/03/7SH52689034-263593-Male.jpg',
        '150X200': '/2018/01/03/7SH52689034-263593-Male.webp',
        '250X310': '/2018/01/03/7SH52689034-71303b-male.webp',
      },
      {
        status: 'Y',
        photo_order: 2,
        photo_tag: 'group',
        domain_name: 'https://img1.shaadi.com',
        medium: '/2018/01/03/7SH52689034-263593-Male.jpg',
        '150X200': '/2018/01/03/7SH52689034-263593-Male.webp',
        '250X310': '/2018/01/03/7SH52689034-71303b-male.webp',
      },
      {
        status: 'Y',
        photo_order: 3,
        domain_name: 'https://img1.shaadi.com',
        medium: '/imgs/profiles/250-photo-coming-soon-m.gif',
        '150X200': '/imgs/profiles/250-photo-coming-soon-m.gif',
        '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
      },
      {
        status: 'N',
        photo_order: 4,
        domain_name: 'https://img1.shaadi.com',
        medium: '/2018/01/03/7SH52689034-263593-Male.jpg',
        '150X200': '/2018/01/03/7SH52689034-263593-Male.webp',
        '250X310': '/2018/01/03/7SH52689034-71303b-male.webp',
      },
    ],
    status: 'show_photo',
    hasPhotos: true,
    canAddPhotos: true,
    isDefault: false,
    isRejectedPhotosFetched: true,
  },
};

const astroState = {
  default: {
    details: {},
    chart: {},
    hasAstro: false,
  },
  hasNoChart: {
    details: {},
    chart: {},
    hasAstro: false,
  },
};

const getPhotoAction = (data = {}) => ({
  type: data.type || 'GET_PROFILE_PHOTOS_SUCCESS',
  payload: {
    data: {
      photos: data.photos || [],
      count: data.count || 0,
      nonRejectedPhotosCnt: data.nonRejectedPhotosCnt || 0,
      hasRejectedPhotos: data.hasRejectedPhotos || false,
      status: data.status || '',
    },
  },
});

const getAstroAction = (data = {}) => ({
  type: 'GET_PROFILE_ASTRO_SUCCESS',
  payload: {
    data: {
      details: data.details || {},
      chart: data.chart || {},
    },
  },
});

const factory = { photoState, getPhotoAction, astroState, getAstroAction, privacy, profile };

it('should export state and action', () => {
  expect(Object.keys(factory).length).toEqual(6);
});

export default factory;
