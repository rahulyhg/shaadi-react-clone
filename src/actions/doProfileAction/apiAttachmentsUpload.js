import axios from 'axios';
import types from '../../action_types/index';
import api from '../../api/index';

export default (uid, { dispatch, type, source }, data = {}) => {
  const formData = new FormData();
  formData.append('type', data.type);
  formData.append('files', data.files);

  // TODO: move this to request service or server
  const CancelToken = axios.CancelToken;
  const config = {
    cancelToken: new CancelToken(cancelFn => {
      // An executor function receives a cancel function as a parameter
      const payload = { uid, type, source, cancelFn };
      dispatch({ type: types.ATTACHMENT_UPLOAD_REQUEST, payload });
    }),
    onUploadProgress: progressEvent => {
      const attachmentProgress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
      const attachmentName = data.attachmentName;
      const payload = { uid, type, source, attachmentProgress, attachmentName };
      dispatch({ type: types.ATTACHMENT_UPLOAD_PROGRESS, payload });
    },
  };

  return api
    .post('/attachments', formData, config)
    .then(response => {
      const uploadResponse = response.data.data[0].files;
      if (uploadResponse.status === 'Success') {
        const payload = { uid, type, source, attachmentPath: uploadResponse.path };
        dispatch({ type: types.ATTACHMENT_UPLOAD_SUCCESS, payload });
      } else {
        const payload = { uid, type, source };
        dispatch({ type: types.ATTACHMENT_UPLOAD_ERROR, payload });
      }
    })
    .catch(error => {
      console.log('reportMisuse_uploadAttachment error', error);
    });
};
