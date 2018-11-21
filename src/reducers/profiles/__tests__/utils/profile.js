import base from '../../base';
import flags from '../../flags';
import presence from '../../presence';
import summary from '../../summary';
import shortlists from '../../shortlists';
import detailed from '../../detailed';
import requests from '../../requests';
import photos from '../../photos';
import astro from '../../astro';
import privacy from '../../privacy';
import contactSummary from '../../contactSummary';

const initialState = {
  base: base(undefined, {}),
  flags: flags(undefined, {}),
  presence: presence(undefined, {}),
  summary: summary(undefined, {}),
  connectMessages: [],
  detailed: detailed(undefined, {}),
  requests: requests(undefined, {}),
  shortlists: shortlists(undefined, {}),
  photos: photos(undefined, {}),
  astro: astro(undefined, {}),
  privacy: privacy(undefined, {}),
  contactSummary: contactSummary(undefined, {}),
  thumbnailBlur: '/assets/default-thumbnail.png',
  thumbnail: '/assets/default-thumbnail.png',
  photoBlur: '/assets/default-photo.png',
  photoMedium: '/assets/default-photo.png',
  photo: '/assets/default-photo.png',
  fullPhotoBlur: '/assets/default-full-photo.png',
  fullPhoto: '/assets/default-full-photo.png',
  drAction: {},
  heShe: '...',
  himHer: '...',
  hisHer: '...',
  gender: null,
  tempId: '',
  verification: {
    count: 0,
    shield_state: '',
    derived_text: '',
    verified_proofs: [],
  },
  score: 0,
};

const getAction = (type, data = {}) => ({
  type,
  payload: {
    data: {
      privacy: {
        display_name: data.display_name || '',
        horoscope_status: data.horoscope_status || '',
        memberlogin: data.memberlogin || '',
        phone: data.phone || '',
        photo: data.photo || '',
        photo_password: data.photo_password || null,
        profile_privacy: data.profile_privacy || '',
        shortlist_setting: data.shortlist_setting || '',
        sms_alert: data.sms_alert || 0,
        visitors_setting: data.visitors_setting || '',
      },
    },
  },
});

const factory = { initialState, getAction };

it('should export state and action', () => {
  expect(Object.keys(factory).length).toEqual(2);
});

export default factory;
