import albumPhotosDecorator from '../albumPhotos';
import rejectedAlbumPhotosDecorator from '../rejectedAlbumPhotos';

export default (responseData = {}) => {
  const albumPhotos = responseData.photosRequest;
  const rejectedAlbumPhotos = (responseData.photosRejectedRequest && responseData.photosRejectedRequest.data) || [];
  const memberlogin = albumPhotos && albumPhotos.data && Object.keys(albumPhotos.data)[0];
  if (memberlogin && albumPhotos.data[memberlogin].photos instanceof Array) {
    const rejectedAlbumPhotosMutated = rejectedAlbumPhotosDecorator(rejectedAlbumPhotos);
    const rejectedAlbumPhotosArray = (rejectedAlbumPhotosMutated.data && rejectedAlbumPhotosMutated.data.mutatedRejectedAlbumPhotos) || [];
    albumPhotos.data[memberlogin].photos = [...albumPhotos.data[memberlogin].photos, ...rejectedAlbumPhotosArray];
  }
  return albumPhotosDecorator(albumPhotos || {});
};
