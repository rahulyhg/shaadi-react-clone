const initialState = {
  albums: [],
  imageURLs: [],
  redirectToAlbums: false,
  showLoader: true,
  source: 'PhotoDocking',
  uid: null,
};

const modalShow = {
  ...initialState,
  ...{
    source: 'modal/fbPhotoUpload',
    uid: '',
  },
};

const photoUploadFailed = {
  attachments: {},
  isModalClosed: false,
  isUploadFailed: false,
  redirectToAlbums: false,
  source: 'PhotoDocking',
  uid: null,
  uploadingPhotoCount: 0,
};

const modalClose = {
  attachments: {},
  isModalClosed: true,
  isUploadFailed: false,
  redirectToAlbums: false,
  source: 'PhotoDocking',
  uid: null,
  uploadingPhotoCount: 0,
};

const fileUploadRequest = {
  attachments: {
    'test.png': {
      attachmentName: 'test.png',
      isAttachmentUploaded: false,
      isInvalidAttachment: false,
      progressPercent: 0,
      showProgress: true,
    },
  },
  isModalClosed: false,
  isUploadFailed: false,
  redirectToAlbums: false,
  source: 'modal/profilePhotoUpload',
  uid: '',
  uploadingPhotoCount: 1,
};

const fileUploadInProgress = {
  attachments: {
    'test.png': {
      attachmentName: 'test.png',
      isAttachmentUploaded: false,
      isInvalidAttachment: false,
      progressPercent: undefined,
      showProgress: true,
    },
  },
  isModalClosed: false,
  isUploadFailed: false,
  redirectToAlbums: false,
  source: 'modal/profilePhotoUpload',
  uid: '',
  uploadingPhotoCount: 0,
};

const fileUploadSuccess = {
  attachments: {
    'test.png': {
      attachmentName: 'test.png',
      isAttachmentUploaded: true,
      isInvalidAttachment: false,
      progressPercent: 100,
      showProgress: false,
    },
  },
  isModalClosed: false,
  isUploadFailed: false,
  redirectToAlbums: false,
  source: 'modal/profilePhotoUpload',
  uid: '',
  uploadingPhotoCount: 0,
};

const fileUploadFailed = {
  attachments: {
    'test.png': {
      attachmentName: 'test.png',
      isAttachmentUploaded: false,
      isInvalidAttachment: true,
      progressPercent: 0,
      showProgress: false,
    },
  },
  isModalClosed: false,
  isUploadFailed: false,
  redirectToAlbums: false,
  source: 'modal/profilePhotoUpload',
  uid: '',
  uploadingPhotoCount: -1,
};

const photoSavedSuccessfully = {
  ...initialState,
  ...{
    redirectToAlbums: true,
    uploadingPhotoCount: -1,
  },
};

const photoSaveFailed = {
  ...initialState,
  ...{
    attachments: {
      'test.png': {
        apiError: true,
        apiErrorMsg: 'Something went wrong!',
        attachmentName: 'test.png',
        isAttachmentUploaded: false,
        progressPercent: 0,
        showProgress: false,
      },
    },
    isUploadFailed: false,
    uploadingPhotoCount: -1,
    uid: '',
    source: 'modal/profilePhotoUpload',
  },
};

const factory = {
  initialState,
  modalShow,
  modalClose,
  photoUploadFailed,
  fileUploadRequest,
  fileUploadInProgress,
  fileUploadSuccess,
  fileUploadFailed,
  photoSavedSuccessfully,
  photoSaveFailed,
};

it('export states', () => {
  expect(Object.keys(factory).length).toEqual(10);
});

export default factory;
