import requestService from '../services/requestService';
import constants from '../../constants/constants';

const create = (logger, data, query, auth, config) => {
  const uploadURL = config.uploadType === 'id_proof' ? constants.UPLOAD_FILE_URL : constants.NODE_API_ENDPOINT;
  const request = {
    method: 'post',
    data,
  };

  return requestService(logger, query, auth, request, d => d, undefined, {
    cancelToken: config.cancelToken,
    onUploadProgress: config.onUploadProgress,
    url: `${uploadURL}files/${auth.uid}/uploads?_debug=attachments`,
  });
};

export default {
  create,
};
