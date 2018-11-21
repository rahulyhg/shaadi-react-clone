const mutateRejectedPhotos = (photos, photo, index) => {
  photos[index] = {
    ...photo,
    ...{
      '250X310': photo.photo,
      status: 'n',
      rejectedMsg: photo.reason,
    },
  };
  return photos;
};

export default (responseData = {}) => {
  const rejectedAlbumPhotos = responseData;
  const hasRejectedPhotos = rejectedAlbumPhotos instanceof Array;
  if (!hasRejectedPhotos || rejectedAlbumPhotos.length === 0) {
    return {
      data: {
        rejectedAlbumPhotos,
      },
    };
  }
  const mutatedRejectedAlbumPhotos = rejectedAlbumPhotos.map(mutateRejectedPhotos.bind(null, []))[0];
  return {
    data: {
      rejectedAlbumPhotos,
      mutatedRejectedAlbumPhotos,
    },
  };
};
