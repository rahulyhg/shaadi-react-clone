import axios from 'axios';
import withAuth from '../withAuth';
import types from '../../action_types';
import api from '../../api';
import { setCancel, resetCancel } from '../lib/utils';
import flags from '../../api/decorators/profile/flags';
/*
Dasboard should load following widgets
1) Recent Visitors
2) Premium Matches
3) New Matches
4) Notification Feeds
5) Activity summary
*/
const updateProfileInfo = currentProfile => ({ ...currentProfile, flags: flags(undefined, currentProfile) });
export default () => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      resetCancel(dispatch, getState().cancelApi, ['inbox', 'contactSummary', 'matches']);
      const CancelToken = setCancel(axios, dispatch, 'inbox');
      const params = {};
      getState().config.app.webp !== '0' && (params.file_extension = 'webp');
      dispatch({ type: types.MY_DASHBOARD_WIDGETS_REQUESTS, payload: {} });

      api
        .get('/dashBoardWidgets', { params }, { CancelToken })
        .then(response => {
          const profiles = {};
          const listItems = {};
          Object.keys(response.data).forEach(current => {
            listItems[current] = { ...response.data[current], data: [] };
            response.data[current].data.forEach(currentProfile => {
              listItems[current].data.push({
                uid: currentProfile.account.memberlogin,
                justNow: false,
                eoiLoadingStyle: 'none',
                eoiClose: false,
                actionType: '',
              });
              profiles[currentProfile.account.memberlogin] = updateProfileInfo(currentProfile);
            });
          });
          dispatch({ type: types.MY_DASHBOARD_WIDGETS_SUCCESS, payload: { listItems, profiles } });
        })
        .catch(error => {
          dispatch({ type: types.MY_DASHBOARD_WIDGETS_FAIL, payload: error });
        });
    },
    { caller: 'onDashBoardInit', allowCache: false, delay: 0 },
  );
};
