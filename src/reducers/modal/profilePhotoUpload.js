import types from '../../action_types';

const initialState = {
  uid: null,
  source: null,
  attachments: {},
  redirectToAlbums: false,
  isModalClosed: false,
  isUploadFailed: false,
  uploadingPhotoCount: 0,
};

const badgeUpdateStatus = {
  [types.UPDATE_TRUST_BADGE_REQUEST]: 'P',
  [types.UPDATE_TRUST_BADGE_SUCCESS]: 'Y',
  [types.UPDATE_TRUST_BADGE_FAIL]: 'N',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { uid, source, modal } = action.payload;
      if (modal !== 'profilePhotoUpload') {
        return state;
      }
      return {
        ...state,
        uid,
        source,
      };
    }

    case types.ATTACHMENT_UPLOAD_REQUEST: {
      const { uid, type, source, attachmentName } = action.payload;

      if (['profilePhotoUpload', 'documentUpload'].includes(type)) {
        const attachments = { ...state.attachments };
        attachments[attachmentName] = {
          attachmentName,
          progressPercent: 0,
          showProgress: true,
          isAttachmentUploaded: false,
          isInvalidAttachment: false,
        };

        return {
          ...state,
          uid,
          source,
          attachments,
          uploadingPhotoCount: state.uploadingPhotoCount + 1,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_PROGRESS: {
      const { uid, type, source, attachmentName, attachmentProgress } = action.payload;

      if (['profilePhotoUpload', 'documentUpload'].includes(type)) {
        const attachments = { ...state.attachments };
        attachments[attachmentName] = {
          attachmentName,
          progressPercent: attachmentProgress,
          showProgress: true,
          isAttachmentUploaded: false,
          isInvalidAttachment: false,
        };

        return {
          ...state,
          uid,
          source,
          attachments,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_SUCCESS: {
      const { uid, type, source, attachmentName, attachmentPath } = action.payload;

      if (['profilePhotoUpload', 'documentUpload'].includes(type)) {
        const attachments = { ...state.attachments };
        attachments[attachmentName] = {
          attachmentName,
          progressPercent: 100,
          showProgress: false,
          isAttachmentUploaded: true,
          isInvalidAttachment: false,
          attachmentPath,
        };

        return {
          ...state,
          uid,
          source,
          attachments,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_ERROR: {
      const { uid, type, source, attachmentName } = action.payload;

      if (['profilePhotoUpload', 'documentUpload'].includes(type)) {
        const attachments = { ...state.attachments };
        attachments[attachmentName] = {
          attachmentName,
          progressPercent: 0,
          showProgress: false,
          isAttachmentUploaded: false,
          isInvalidAttachment: true,
        };

        return {
          ...state,
          uid,
          source,
          attachments,
          uploadingPhotoCount: state.uploadingPhotoCount - 1,
        };
      }

      return state;
    }

    case types.UPDATE_TRUST_BADGE_REQUEST:
    case types.UPDATE_TRUST_BADGE_SUCCESS:
    case types.UPDATE_TRUST_BADGE_FAIL: {
      const { attachmentName } = action.payload;
      const attachments = state.attachments;
      attachments[attachmentName] = {
        ...attachments[attachmentName],
        trustBadgeStatus: badgeUpdateStatus[action.type],
      };

      return {
        ...state,
        attachments,
      };
    }

    case types.PROFILE_PHOTO_UPLOAD_SUCCESS: {
      const { type } = action.payload;
      if (type === 'profilePhotoUpload') {
        return {
          ...state,
          redirectToAlbums: true,
          isUploadFailed: false,
          uploadingPhotoCount: state.uploadingPhotoCount - 1,
        };
      }
      return state;
    }

    case types.PROFILE_PHOTO_UPLOAD_FAILED: {
      if (action.payload && action.payload.type === 'profilePhotoUpload') {
        const { uid, source, attachmentName, error } = action.payload;
        const { response } = error || {};
        const status = response && response.status;
        if (status && attachmentName) {
          /* switch(status) {
            case 422: {
              
            }
          } */
          const apiErrorMsg = response.data.message;
          const attachments = { ...state.attachments };
          attachments[attachmentName] = {
            attachmentName,
            progressPercent: 0,
            showProgress: false,
            isAttachmentUploaded: false,
            apiError: true,
            apiErrorMsg,
          };
          return {
            ...state,
            uid,
            source,
            attachments,
            uploadingPhotoCount: state.uploadingPhotoCount - 1,
          };
        }

        return {
          ...state,
          redirectToAlbums: false,
          isUploadFailed: true,
          uploadingPhotoCount: state.uploadingPhotoCount - 1,
        };
      }
      return state;
    }

    case types.PROFILE_PHOTO_UPLOAD_MODAL_CLOSE: {
      return {
        ...state,
        isModalClosed: true,
      };
    }

    case types.MODAL_HIDE: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
