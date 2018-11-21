/* eslint camelcase: 0 */
import flags from './flags';
import base from './base';
import presence from './presence';
import summary from './summary';
import detailed from './detailed';
import albumPhotos from '../albumPhotos';
import contactSummary from './contactSummary';
import { asFullDate, extractKeys } from '../utils';

const baseValue = {
  se: null,
  uid: null,
  name: null,
  slug: null,
  thumbnail: null,
  photo: null,
  fullPhoto: null,
  thumbnailBlur: null,
  photoBlur: null,
  photoMedium: null,
  fullPhotoBlur: null,
  userHandle: null,
  gender: null,
  marital_status: null,
  matchTag: null,
  connectMessages: [],
  contact: {},
  horoscopeScore: {},
  flags: flags(undefined, {}),
  base: base(undefined, {}),
  presence: presence(undefined, {}),
  summary: summary(undefined, {}),
  detailed: detailed(undefined, {}),
  isAstroStatusError: false,
  tempId: '',
  contactSummary: contactSummary(undefined, {}),
};

const defaultThumbs = {
  Male: '/assets/bw-m.gif',
  Female: '/assets/bw-f.gif',
};

const defaultPhotos = {
  Male: '/assets/60-add-ph-male-v2.gif',
  Female: '/assets/60-add-ph-female-v2.gif',
};

const img = (photo, size, suffix) => {
  let prefSize = size;

  switch (size) {
    case 'small': {
      prefSize = '120X120';
      break;
    }
    case 'medium': {
      prefSize = '450X600';
      break;
    }
    case 'semilarge': {
      prefSize = '250X310';
      break;
    }
    case 'large': {
      prefSize = '750X1333';
      break;
    }
    // no default
  }
  const path = photo[`${prefSize}${suffix}`] || photo[`${size}${suffix}`];
  const domain = photo[`domain_name${suffix}`] || photo.domain_name;

  return path ? `${domain}${path}` : null;
};

const connectMessage = m => {
  const { deleted_time, message, message_id, media_url, type, record_date, sent_received, hide_message = false } = m;
  if (deleted_time) return null;
  return { message_id, message, type, media_url, fullDate: asFullDate(record_date), category: sent_received, hide_message };
};

export default (baseline = baseValue, payload = {}, extra = {}) => {
  const {
    profileBrief,
    account,
    astro,
    basic = {},
    other,
    photo_details,
    location,
    messages,
    contact,
    request = {},
    derived_text = {},
    views = {},
    intents = {},
    recommendation = {},
    verification = {},
    rankdata,
  } = payload;

  const { privacy } = extra;
  const connectMsg =
    messages ||
    (payload.request &&
      payload.request.connect &&
      payload.request.connect &&
      payload.request.connect.message_id && [payload.request.connect]) ||
    [];
  const uid = account.memberlogin;
  const photos = (photo_details || {}).photos || [];
  const photo = photos.filter(ph => ph.profilePhoto)[0] || photos.filter(ph => ph.photo_order === 0)[0] || photos[0] || {};
  const horoscopeScore = derived_text.horoscope_details || {};
  const isAstroStatusError = astro && astro.details && astro.details.astro_status === 'Astro Error';
  const photoPayload = {
    data: {
      [uid]: {
        ...photo_details,
      },
    },
  };
  const decoratedPhoto = albumPhotos(photoPayload);
  const { Name, id, gender = basic.gender, country, city } = extractKeys(['Name', 'id', 'gender', 'country', 'city'], profileBrief);
  const { lName, fName, displayName } = extractKeys(['lName', 'fName', 'displayName'], Name);
  const fullName = Name ? `${fName} ${lName}` : `${basic.first_name} ${basic.last_name}`;
  const firstName = fName || basic.first_name;
  const lastName = lName || basic.last_name;
  const userHandle = id || basic.username;
  const profileLocation = city && country ? `${city} ${country}` : false || location ? `${location.city}, ${location.country}` : false;

  return {
    ...baseline,
    se: other ? other.se : null,
    uid: account.memberlogin,
    name: displayName || basic.display_name || baseValue.name,
    fullName,
    firstName,
    lastName,
    score: rankdata,
    slug: account.memberlogin,
    thumbnail: (profileBrief && img(photo, 'small', '')) || img(photo, 'small', '_nb') || defaultThumbs[gender],
    photo: img(photo, 'medium', '_nb') || defaultPhotos[gender],
    fullPhoto: img(photo, 'semilarge', '_nb') || defaultPhotos[gender],
    thumbnailBlur: img(photo, 'small', '') || defaultThumbs[gender],
    photoBlur: img(photo, 'medium', '') || defaultPhotos[gender],
    photoMedium: profileBrief && (img(photo, 'medium', '') || defaultPhotos[gender]),
    fullPhotoBlur: img(photo, 'semilarge', '') || defaultPhotos[gender],
    largePhotoBlur: img(photo, 'large', '') || defaultPhotos[basic.gender],
    largePhoto: img(photo, 'large', '_nb') || defaultPhotos[basic.gender],
    userHandle,
    gender,
    connectMessages: (messages || connectMsg || []).map(cm => connectMessage(cm)).filter(m => m),
    contact: contact || {},
    matchTag: other ? other.match_tag : null,
    location: profileLocation,
    marital_status: basic ? basic.marital_status : baseValue.marital_status,
    horoscopeScore: horoscopeScore.score || {},
    flags: flags(undefined, payload, extra),
    base: base(undefined, payload, extra),
    presence: presence(undefined, payload, extra),
    summary: summary(undefined, payload, extra),
    detailed: detailed(undefined, payload, extra),
    photos: decoratedPhoto && decoratedPhoto.data && decoratedPhoto.data[uid],
    isAstroStatusError,
    request,
    privacy,
    tempId: views.temp || intents.temp || '',
    recommendation: recommendation || {},
    contactSummary: contactSummary(undefined, payload, extra),
    verification: verification || {},
  };
};
