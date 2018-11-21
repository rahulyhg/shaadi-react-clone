import { parse } from 'qs';
import cookie from 'cookie';
import types from '../../action_types';
import withAuth from '../withAuth';
import apiGetCounts from './apiGetCounts';
import apiGetSession from './apiGetSession';
import apiGetSuccessStories from './apiGetSuccessStories';
import monitorResize from './monitorResize';
import monitorScroll from './monitorScroll';
import monitorHistory from './monitorHistory';
import { GA } from '../lib/utils';
import doLayerAction from '../doLayerAction';
import doProfileAction from '../doProfileAction';

export default history => (dispatch, getState) => {
  monitorHistory(history, dispatch);
  monitorResize(dispatch);
  monitorScroll(dispatch, getState);
  const cookies = cookie.parse(document.cookie);
  GA.setSessionVar(cookies);
  cookies.webp = cookies.webp || '0';
  dispatch({ type: types.COOKIE_SUCCESS, payload: { ...cookies, ...getState().session } });
  const params = parse(history.location.search.slice(1));
  withAuth(
    ({ auth }) => {
      const { session: { canCallAppInit, isMyShaadiPages, isPaymentThankYouPage, isPaymentPage, isCartPage } } = getState();
      if (!canCallAppInit) {
        return false;
      }
      if (isPaymentPage) {
        apiGetSuccessStories(auth, dispatch);
      }
      apiGetSession(auth, dispatch, getState);
      if (!isPaymentThankYouPage && !isPaymentPage && !isCartPage) {
        apiGetCounts(auth, dispatch);
        apiGetSuccessStories(auth, dispatch);
        doLayerAction('onAppInit', undefined, 'prefetchExitIntent')(dispatch, getState);
        doLayerAction('onAppInit', undefined, 'getAlbumPromoBanner')(dispatch, getState);

        // doLayerAction('onAppInit', undefined, 'campaignLayer')(dispatch, getState);
        // window.testExitLayer = () => doLayerAction('onAppInit', undefined, 'prefetchExitIntent')(dispatch, getState);
        if (isMyShaadiPages) {
          // import('../doProfileAction').then(doProfileAction => {
          doProfileAction('onAppInit', auth.uid, 'getAstro', {
            _debug: 'getAstro',
            profileids: auth.uid,
            fieldset: 'details,chart',
          })(dispatch, getState);
          // });
        }
      }
      return true;
    },
    {
      dispatch,
      getState,
      params,
      cookies,
      history,
      caller: 'onAppInit',
      allowCache: true,
    },
  );
};
