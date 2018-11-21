import graph from 'fb-react-sdk';

export const setFacebookAccessToken = accessToken => {
  graph.setAccessToken(accessToken);
};

export function getFacebookAlbums(onSuccess, onError) {
  graph.get('me/albums?fields=count,name', (error, response) => {
    if (response && response.data) {
      onSuccess(response);
    } else {
      onError(error);
    }
  });
}

export function getPhotosByAlbum(albumID, limit = 1, onSuccess, onError) {
  graph.get(`${albumID}/photos?limit=${limit}&fields=images`, (error, response) => {
    if (response && response.data) {
      onSuccess(response);
    } else {
      onError(error);
    }
  });
}

export function getProfilePhotosAlbum(albums, onSuccess, onError) {
  for (const album of albums) {
    if (album.name === 'Profile Pictures') {
      getPhotosByAlbum(album.id, 100, onSuccess, onError);
    }
  }
}

export function getAlbums(data) {
  const albums = [];
  for (const album of data) {
    albums.push({
      id: album.id,
      name: album.name,
      count: album.count,
      selected: album.name === 'Profile Pictures',
    });
  }

  return albums;
}

export function getAlbumImageURLs(photoArray) {
  const imageURLs = [];
  for (const photo of photoArray) {
    let maxWidth = 0;
    let imageURL = '';
    for (const image of photo.images) {
      if (maxWidth < image.width) {
        maxWidth = image.width;
        imageURL = image.source;
      }
    }
    imageURLs.push(imageURL);
  }

  return imageURLs;
}
