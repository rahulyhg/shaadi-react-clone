/* eslint camelcase: 0 */
import api from '../../../api';

export default (uid, args, params) => {
  api
    .get('/serve/get-consultation', { params: { uid } })
    .then(response => {})
    .catch(error => {});
};
