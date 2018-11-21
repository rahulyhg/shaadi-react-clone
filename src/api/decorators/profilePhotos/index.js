/* eslint camelcase: 0 */

const profilePhotoBase = {
  order: 0,
  photoBlur: null,
  fullPhotoBlur: null,
};

const albumPhoto = (base = profilePhotoBase, { photo_order, domain_name, medium, semilarge }) => ({
  ...base,
  order: photo_order,
  photoBlur: medium ? `${domain_name}${medium}` : null,
  fullPhotoBlur: semilarge ? `${domain_name}${semilarge}` : null,
});

export default (base = [], payload) => {
  const uid = Object.keys(payload.data)[0];
  const { photo_details = {} } = payload.data[uid] || {};
  return photo_details.status === 'show_photo'
    ? (photo_details.photos || []).map((photo, i) => {
        photo['450X600'] ? (photo.medium = photo['450X600']) : (photo.medium = photo.large);
        photo['250X310'] && (photo.semilarge = photo['250X310']);
        return albumPhoto(undefined, photo);
      })
    : [];
};
