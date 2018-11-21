import getPhotos from './getPhotos';

export default (uid, { size, fieldset }, extras) => {
  const query = { getOnlyProfilePhoto: false, size, fieldset };
  return getPhotos(uid, query, extras);
};
