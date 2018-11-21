import types from '../../action_types';

const initialState = {
  uid: null,
  source: null,
  name: null,
  helpdeskid: null,
  attachmentURL: '',
  attachmentProgress: 0,
  attachmentName: '',
  onUploadCancel: null,
  isUploaderInputVisible: true,
  isUploaderProgressVisible: false,
  isUploaderDeleteVisible: false,
  isInvalidAttachment: false,
  isReasonVisible: true,
  isLoaderVisible: false,
  isUploaderVisible: false,
  isThanksVisible: false,
  isModalClosed: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { uid, source, modal, name } = action.payload;
      if (modal !== 'reportMisuse') {
        return state;
      }
      return {
        ...state,
        uid,
        source,
        name,
      };
    }

    case types.REPORT_MODAL_REQUEST: {
      const { uid, type, source, name } = action.payload;

      if (type === 'reportMisuse_confirm') {
        return {
          ...state,
          uid,
          source,
          name,
          isReasonVisible: false,
          isLoaderVisible: true,
        };
      }

      if (type === 'reportMisuse_upload') {
        return {
          ...state,
          uid,
          source,
          name,
          isUploaderVisible: false,
          isLoaderVisible: true,
        };
      }

      return state;
    }

    case types.REPORT_MODAL_SUCCESS: {
      const { uid, type, source, helpdeskid } = action.payload;

      if (type === 'reportMisuse_confirm') {
        return {
          ...state,
          uid,
          source,
          isLoaderVisible: false,
          isUploaderVisible: true,
          helpdeskid,
        };
      }

      if (type === 'reportMisuse_upload') {
        return {
          ...state,
          uid,
          source,
          isLoaderVisible: false,
          isUploaderVisible: false,
          isThanksVisible: true,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_REQUEST: {
      const { uid, type, source, cancelFn } = action.payload;

      if (type === 'reportMisuse_uploadAttachment') {
        return {
          ...state,
          uid,
          source,
          onUploadCancel: cancelFn,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_PROGRESS: {
      const { uid, type, source, attachmentProgress, attachmentName } = action.payload;
      if (type === 'reportMisuse_uploadAttachment') {
        return {
          ...state,
          uid,
          source,
          attachmentProgress,
          attachmentName,
          isUploaderInputVisible: false,
          isUploaderProgressVisible: true,
          isUploaderDeleteVisible: false,
          isInvalidAttachment: false,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_SUCCESS: {
      const { uid, type, source, attachmentPath } = action.payload;
      const attachmentURL = `http://member-attachments.s3.amazonaws.com/${attachmentPath}`;

      if (type === 'reportMisuse_uploadAttachment') {
        return {
          ...state,
          uid,
          source,
          attachmentURL,
          isUploaderInputVisible: false,
          isUploaderProgressVisible: false,
          isUploaderDeleteVisible: true,
          isInvalidAttachment: false,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_ERROR: {
      const { uid, type, source } = action.payload;

      if (type === 'reportMisuse_uploadAttachment') {
        return {
          ...state,
          uid,
          source,
          isUploaderInputVisible: false,
          isUploaderProgressVisible: false,
          isUploaderDeleteVisible: false,
          isInvalidAttachment: true,
        };
      }

      return state;
    }

    case types.ATTACHMENT_UPLOAD_RESET: {
      const { uid, type, source } = action.payload;

      if (type === 'reportMisuse_uploadReset') {
        return {
          ...state,
          uid,
          source,
          attachmentURL: '',
          attachmentProgress: 0,
          attachmentName: '',
          isUploaderInputVisible: true,
          isUploaderProgressVisible: false,
          isUploaderDeleteVisible: false,
          isInvalidAttachment: false,
        };
      }

      return state;
    }

    case types.REPORT_MODAL_CLOSE: {
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
