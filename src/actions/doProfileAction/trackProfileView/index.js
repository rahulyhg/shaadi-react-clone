/* eslint camelcase: 0 */
import api from '../../../api';

export default (uid, args, params) => {
  const data = {
    memberlogin: params.self,
    uid,
    ...params.metadata,
  };

  api
    .post('/profile/track', data)
    .then(response => {})
    .catch(error => {});
};
