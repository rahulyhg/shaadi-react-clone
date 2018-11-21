import getPhotos from './getPhotos';

export default (uid, { size, fieldset }, extras) => {
  const query = { getOnlyProfilePhoto: true, size, fieldset };
  return getPhotos(uid, query, extras);
};
