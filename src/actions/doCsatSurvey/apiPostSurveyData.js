import api from '../../api';
import errors from '../lib/errors';
import { createCookie } from '../../api/helpers';

export default ({ source, self, type, args }) => (dispatch, getState) =>
  api
    .post('/csatSurvey', args)
    .then(response => {
      if (response.data === 'success') {
        createCookie('isSurveyGiven', true, 60 * 60 * 24);
      }
    })
    .catch(error => {
      const message = errors.clean(error);
      if (message.error && message.error.message === 'survey_already_submitted') {
        createCookie('isSurveyGiven', true, 60 * 60 * 24);
      }
      console.log(`%c Execution of CSAT survey  API error.`, 'color: orange; font-weight: bold;', message, error.response);
    });
