import getPhotos from './getPhotos';

export default (uid, { size, fieldset }, extras) => {
  const query = { size, fieldset };
  return getPhotos(uid, query, extras);
};
