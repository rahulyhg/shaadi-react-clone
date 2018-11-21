import types from '../../action_types';
import api from '../../api';
import constants from '../../constants/constants';

export default (source, uid, { args, getState, dispatch }) => {
  const docType = args.docType.replace(' ', '_').toLowerCase();

  const typeOfId = ['other', 'voter_id', 'aadhaar', 'pan'].includes(docType) ? 'others' : docType;

  const id_proof = {
    [typeOfId]: 'P',
  };

  const metadata = {
    file_path: args.filePath,
    id_proof_type: args.docType,
    page: source,
    medium: getState().metadata.platform,
    entry_point_referrer: getState().metadata.entry_point,
    landing_page_url: getState().metadata.event_loc_url,
    posted_url: `${constants.UPLOAD_FILE_URL}files/${uid}/uploads`,
  };

  const requestBody = {
    data: { id_proof },
    metadata,
  };

  dispatch({ type: types.UPDATE_TRUST_BADGE_REQUEST, payload: { attachmentName: args.fileName } });

  api
    .put('/profiles/:id/badge', requestBody)
    .then(response => {
      dispatch({ type: types.UPDATE_TRUST_BADGE_SUCCESS, payload: { attachmentName: args.fileName } });
    })
    .catch(error => {
      dispatch({ type: types.UPDATE_TRUST_BADGE_FAIL, payload: { attachmentName: args.fileName } });
    });
};
