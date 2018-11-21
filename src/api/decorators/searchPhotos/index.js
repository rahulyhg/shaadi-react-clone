/* eslint camelcase: 0 */
import meta from './meta';

const profilePhotoBase = {
  order: 0,
  photoBlur: null,
  fullPhotoBlur: null,
  largePhoto: null,
  smallPhoto: null,
};

const albumPhoto = (base = profilePhotoBase, { photo_order, domain_name, medium, semilarge, large, small }) => ({
  ...base,
  order: photo_order,
  photoBlur: medium ? `${domain_name}${medium}` : null,
  fullPhotoBlur: semilarge ? `${domain_name}${semilarge}` : null,
  largePhoto: large ? `${domain_name}${large}` : null,
  smallPhoto: small ? `${domain_name}${small}` : null,
});

const searchProfileBase = {
  uid: '',
  photos: [],
};

const searchProfile = (base = searchProfileBase, payload) => {
  const { account, photo_details } = payload;
  return {
    ...base,
    uid: account.memberlogin,
    photos:
      photo_details.status === 'show_photo'
        ? (photo_details.photos || []).map((photo, i) => {
            photo['450X600'] && (photo.medium = photo['450X600']);
            photo['250X310'] && (photo.semilarge = photo['250X310']);
            photo['750X1333'] && (photo.large = photo['750X1333']);

            return albumPhoto(undefined, photo);
          })
        : [],
  };
};

const baseValue = {
  profiles: [],
  featuredProfiles: [],
  meta: {},
};

export default (base = baseValue, payload = {}, query = {}) => ({
  ...base,
  profiles: payload.data.map(profile => searchProfile(undefined, profile)),
  featuredProfiles: payload.featured.map(profile => searchProfile(undefined, profile)),
  meta: meta(undefined, payload.paginator, query),
});
