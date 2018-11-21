const PHOTO_STATUS_SCREENED = 'y';
const PHOTO_STATUS_UNDER_SCREENING = 'p';
const PHOTO_STATUS_REJECTED = 'n';
const ADD_PHOTO = 'add_photo';
let isProfilePhotoScreened;
let cantDeleteProfilePhotoReason;
let hasApprovedSoloAlbumPhoto;
let hasRejectedPhotos;
let rejectedPhotosCount;
let screeningPhotosCount;
let approvedPhotoCount;
let nonRejectedPhotosCnt;

const mutatePhotos = (photos, photo, index) => {
  const photoStatus = photo.status && photo.status.toLowerCase();
  const isProfilePhoto = photo.profile_photo === true;
  const isPhotoScreened = photoStatus === PHOTO_STATUS_SCREENED;
  if (isProfilePhoto) {
    isProfilePhotoScreened = isPhotoScreened;
  }
  const isPhotoUnderScreening = photoStatus === PHOTO_STATUS_UNDER_SCREENING;
  const isPhotoRejected = photoStatus === PHOTO_STATUS_REJECTED;
  // const rejectedMsg = photo.rejectedMsg;
  const rejectedMsg = 'Please refer to Photo Guidelines';
  const isGroupPhoto = photo.photo_tag === 'group';
  const isPhotoOptsOpen = false;
  const screenedPhotoUri = photo['150X200'] || photo.medium;
  const getUrlForAlbumPage = photo.domain_name + (isPhotoScreened && isProfilePhotoScreened ? screenedPhotoUri : photo['250X310']); // change after API fix
  const isImgComingSoonSilhouette = typeof getUrlForAlbumPage === 'string' && getUrlForAlbumPage.includes('photo-coming-soon');
  const isScaledDownImage = (isPhotoUnderScreening && !isImgComingSoonSilhouette) || isPhotoRejected;
  let getCaption;
  const canShowMakeProfilePhotoOpt = !isProfilePhoto;
  const isPhotoSceenedButSilhouette = !isProfilePhoto && isPhotoScreened;
  isProfilePhotoScreened = (isProfilePhoto && isPhotoScreened) || isProfilePhotoScreened;
  const canShowPhotoOpts = isProfilePhotoScreened && isPhotoScreened; // change after API fix
  const cantMakeProfilePhotoReason = isGroupPhoto && 'Group photo can not be profile photo!';
  if (index === 0) {
    hasApprovedSoloAlbumPhoto = false;
  }
  if (!hasApprovedSoloAlbumPhoto && isPhotoSceenedButSilhouette && !isGroupPhoto) {
    hasApprovedSoloAlbumPhoto = true;
  }
  if (isPhotoRejected) {
    hasRejectedPhotos = true;
    rejectedPhotosCount += 1;
    getCaption = 'Photo not accepted';
  } else if (isPhotoUnderScreening) {
    screeningPhotosCount += 1;
    nonRejectedPhotosCnt += 1;
    getCaption = 'Awaiting Approval';
  } else {
    approvedPhotoCount += 1;
    nonRejectedPhotosCnt += 1;
    getCaption = isProfilePhoto ? 'Profile Photo' : `Album Photo ${photo.photo_order}`;
  }
  if (isPhotoSceenedButSilhouette) {
    cantDeleteProfilePhotoReason = hasApprovedSoloAlbumPhoto
      ? 'Please select a profile photo from your album!'
      : 'Please upload at least one individual photo to be shown as profile photo!';
  } else if (isProfilePhoto) {
    cantDeleteProfilePhotoReason = '';
  }
  photos[index] = {
    ...photo,
    ...{
      isProfilePhoto,
      isPhotoScreened,
      isPhotoUnderScreening,
      isPhotoRejected,
      canShowMakeProfilePhotoOpt,
      canShowPhotoOpts,
      cantMakeProfilePhotoReason,
      isGroupPhoto,
      isPhotoOptsOpen,
      isImgComingSoonSilhouette,
      getCaption,
      getUrlForAlbumPage,
      rejectedMsg,
      isScaledDownImage,
    },
  };
  return photos;
};

export default responseData => {
  if (!responseData || !responseData.data) {
    return responseData;
  }

  const memberlogin = Object.keys(responseData.data)[0];
  if (!memberlogin || !responseData.data[memberlogin].photos) {
    return responseData;
  }

  isProfilePhotoScreened = false;
  cantDeleteProfilePhotoReason = '';
  hasApprovedSoloAlbumPhoto = false;
  hasRejectedPhotos = false;
  rejectedPhotosCount = 0;
  screeningPhotosCount = 0;
  nonRejectedPhotosCnt = 0;
  approvedPhotoCount = 0;

  const photos = responseData.data[memberlogin].photos.map(mutatePhotos.bind(null, []))[0];

  const profilePhoto = photos && photos[0];
  if (cantDeleteProfilePhotoReason && profilePhoto) {
    photos[0].cantDeletePhotoReason = cantDeleteProfilePhotoReason;
  }

  return {
    data: {
      ...responseData.data,
      ...{
        [memberlogin]: {
          ...responseData.data[memberlogin],
          ...{
            hasPhotos: photos && photos[0] && String(photos[0].status).toLowerCase() !== ADD_PHOTO,
            hasApprovedProfilePhotos: profilePhoto && profilePhoto.isPhotoScreened,
            isProfilePhotoScreened,
            cantDeleteProfilePhotoReason,
            hasApprovedSoloAlbumPhoto,
            rejectedPhotosCount,
            nonRejectedPhotosCnt,
            screeningPhotosCount,
            approvedPhotoCount,
            hasRejectedPhotos,
            photos,
            profilePhoto,
          },
        },
      },
    },
  };
};
