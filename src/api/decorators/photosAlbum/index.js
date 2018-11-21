export default (profileId, payload = {}, imgSuffix = '') => {
  const largePhoto = [];
  const smallPhoto = [];
  payload.photos.forEach(imgsObj => {
    const largeimg = imgsObj[`750X1333${imgSuffix}`] || imgsObj[`large${imgSuffix}`];
    const smallImg = imgsObj[`120X120${imgSuffix}`] || imgsObj[`small${imgSuffix}`];
    largePhoto.push(`${imgsObj.domain_name}${largeimg}`);
    smallPhoto.push(`${imgsObj.domain_name}${smallImg}`);
  });

  const photoAlbumData = {
    profileId,
    photosCount: payload.count || 0,
    photos: {
      largePhoto,
      smallPhoto,
    },
  };
  return photoAlbumData;
};
