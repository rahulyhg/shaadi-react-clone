import cookie from 'cookie';
import withAuth from '../withAuth';
import apiGetSurveyData from './apiGetSurveyData';
import apiPostSurveyData from './apiPostSurveyData';
import types from '../../action_types';

const getPlatform = {
  desktop: 'web',
  mobile: 'mobile',
};

export default (source, uid, type, args) => (dispatch, getState) => {
  withAuth(({ auth }, history) => {
    const params = { source, self: auth.uid, type, args: { ...args, platform: getPlatform[getState().view.layout] } };
    const cookies = cookie.parse(document.cookie);
    const isSurveyGiven = cookies.isSurveyGiven || false;
    const { wwwBaseUrl } = getState().config.app;

    if (isSurveyGiven) {
      dispatch({ type: types.CSAT_DATA_REQUEST, payload: {} });
      window.location.href = `${wwwBaseUrl}/my-shaadi`;
    } else {
      switch (type) {
        case 'getSurveyData':
          apiGetSurveyData(params)(dispatch, getState);
          break;
        case 'postSurveyData':
          apiPostSurveyData(params)(dispatch, getState);
          break;
        default:
          console.log('%c TO DO in doCsatSurveyAction', 'font-size: 16px; color: blue;', params);
      }
    }
  });
};
