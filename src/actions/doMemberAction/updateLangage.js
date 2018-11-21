import api from '../../api';

export default (uid, args, { dispatch, getState, type, source, data, history }) => {
  api
    .put('/member/update-language', { data: { display_settings: { language: args[0] } } })
    .then(response => {})
    .catch(error => {});
};
