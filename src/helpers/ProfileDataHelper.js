import albumPhotos from '../api/decorators/albumPhotos';

class ProfileDataHelper {
  uid = '';
  outputReducerData = { hasPhotoDetails: false };
  constructor(uid, data) {
    this.ui = uid;
    this.outputReducerData = {
      ...this.outputReducerData,
      ...data,
    };
    const { photo_details, basic: { gender = '' } = {} } = data || {};
    this.outputReducerData.hasPhotoDetails = data && !!data.photo_details;
    this.outputReducerData.uid = uid;
    this.outputReducerData.gender = gender.toLowerCase();
    if (this.outputReducerData.hasPhotoDetails) {
      const photoPayload = {
        data: {
          [uid]: {
            ...photo_details,
          },
        },
      };
      const decoratedPhoto = albumPhotos(photoPayload);
      const decoratedPhotos = decoratedPhoto && decoratedPhoto.data && decoratedPhoto.data[uid];
      if (decoratedPhotos) {
        this.outputReducerData = {
          ...this.outputReducerData,
          hasApprovedProfilePhotos: decoratedPhotos.hasApprovedProfilePhotos,
          photos: decoratedPhotos,
        };
      }
    }
  }

  getOutput() {
    return this.outputReducerData;
  }
}

export default ProfileDataHelper;
