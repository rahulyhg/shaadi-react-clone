import axios from 'axios';
import types from '../action_types/index';
import api from '../api/index';

export default (uid, { dispatch, type, source }, data = {}, onSuccess, onFail) => {
  const formData = new FormData();
  formData.append('type', data.type);
  formData.append('files', data.files);

  const CancelToken = axios.CancelToken;
  const attachmentName = data.attachmentName;
  const config = {
    cancelToken: new CancelToken(cancelFn => {
      // An executor function receives a cancel function as a parameter
      const payload = { uid, type, source, cancelFn, attachmentName };
      dispatch({ type: types.ATTACHMENT_UPLOAD_REQUEST, payload });
    }),
    onUploadProgress: progressEvent => {
      const attachmentProgress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
      const payload = { uid, type, source, attachmentProgress, attachmentName };
      dispatch({ type: types.ATTACHMENT_UPLOAD_PROGRESS, payload });
    },
    uploadType: data.type,
  };

  return api
    .post('/attachments', formData, config)
    .then(response => {
      const uploadResponse = response.data.data[0].files;
      if (uploadResponse.status === 'Success') {
        const payload = { uid, type, source, attachmentName, attachmentPath: uploadResponse.path };
        dispatch({ type: types.ATTACHMENT_UPLOAD_SUCCESS, payload });

        if (onSuccess) {
          onSuccess(payload, uploadResponse);
        }
      } else {
        const payload = { uid, type, source, attachmentName };
        dispatch({ type: types.ATTACHMENT_UPLOAD_ERROR, payload });

        if (onFail) {
          onFail(payload, uploadResponse);
        }
      }
    })
    .catch(error => {
      dispatch({ type: types.PROFILE_PHOTO_UPLOAD_FAILED, payload: { uid, source, type, error, attachmentName } });
    });
};
