import api from '../../../api';
import errors from '../../lib/errors';
import { createCookie } from '../../../api/helpers';

export default ({ source, self, type, args }) => (dispatch, getState) =>
  api
    .post('/phoneSettings', args)
    .then(response => {
      if (response.statusText === 'OK') {
        createCookie('isPhoneSettingShown', true, 60 * 60 * 24);
      }
    })
    .catch(error => {
      const message = errors.clean(error);
      if (message.error && message.error.message === 'phone_settings_already_submitted') {
        createCookie('isPhoneSettingShown', true, 60 * 60 * 24);
      }
      console.log(`%c Execution of PhoneSettings API error.`, 'color: orange; font-weight: bold;', message, error.response);
    });
