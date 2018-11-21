import constants from '../../../constants/constants';

export default function(options, { getState } = {}) {
  if (!options) {
    return null;
  }
  const {
    getOnlyProfilePhoto = false,
    excludeProfilePhoto = false,
    getOnlyCount = false,
    getOnlyPhotos = false,
    canShowBlurPhoto = true,
    photoSizes = [],
    thumbPrefix = '',
  } = options;

  // Array of Valid Photo Sizes Only Filtered Out
  const size = photoSizes.filter(val => constants.validPhotoSizes.indexOf(val) > -1);

  const fieldset = [];

  if (getOnlyCount) {
    fieldset.push('count');
  } else if (getOnlyPhotos) {
    fieldset.push('photos');
  } else {
    fieldset.push('count');
    fieldset.push('photos');
  }

  let photo = { fieldset };

  if (!getOnlyCount) {
    photo = {
      ...photo,
      size,
      blur: canShowBlurPhoto,
      thumb_param: thumbPrefix,
    };

    if (getOnlyProfilePhoto) {
      photo = {
        ...photo,
        profile_photo: true,
      };
    } else if (excludeProfilePhoto) {
      photo = {
        ...photo,
        profile_photo: false,
      };
    }

    const { config: { app: { hasWebpSupport } = {} } = {} } = (getState && getState()) || {};
    if (hasWebpSupport) {
      photo = {
        ...photo,
        file_extension: 'webp',
      };
    }
  }

  return photo;
}
