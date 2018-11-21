import profile from './factories/profile';

const albumStatuses = [
  'default',
  'noPhoto',
  'requestPassword',
  'visibleOnAccept',
  'passwordRequested',
  'photoComingSoon',
  'photoRequestSent',
  'photoUnderScreening',
  'visibleOnUpgrade',
];

const props = {
  gender: 'male',
  photo: profile().fullPhoto,
  photoCount: profile().detailed.album.length,
};

const statusProps = {
  visibleOnAccept: {
    photo: 'http://img1.shaadi.com//2017/11/27/XSH52160341-85a61b-female.jpg',
  },
  visibleOnUpgrade: {
    photo: 'http://img1.shaadi.com//2017/11/27/XSH52160341-85a61b-female.jpg',
  },
  requestPassword: {
    photo: 'http://img1.shaadi.com//2017/11/27/XSH52160341-85a61b-female.jpg',
  },
  passwordRequested: {
    photo: 'http://img1.shaadi.com//2017/11/27/XSH52160341-85a61b-female.jpg',
  },
};

export { albumStatuses, statusProps };
export default props;
