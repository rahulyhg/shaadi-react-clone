import withAuth from '../withAuth';
import apiGetLayer from './apiGetLayer';
import onSuccess from './onSuccess';
import types from '../../action_types';
import guard from '../lib/guard';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  // eslint-disable-next-line
  // window.testCampaignLayer = () => dispatch({ type: types.MODAL_SHOW, payload: { name: 'Introducing Trust Badge', url: '/payment/index', category: 'template1', alt: 'Payment',  src: 'http://img.shaadi.com/imgs/header-badges/shaadipayimg_20170409234141.gif', layerId: 'campaignLayer', modal: 'campaignLayer' }});

  withAuth(
    ({ auth }) => {
      const params = { source, self: auth.uid, type, dispatch, getState };

      switch (type) {
        case 'fetchHeaderBadge':
          return apiGetLayer(['headerBadge'], params, onSuccess);
        case 'campaignLayer': {
          return apiGetLayer(['campaignLayer'], params, onSuccess);
        }
        case 'prefetchExitIntent': {
          return apiGetLayer(['exitIntent'], params, onSuccess);
        }
        case 'exitEvent': {
          if (getState().session.exitIntent) {
            const modal = getState().session.exitIntent;
            const context = `ei_${modal.toLowerCase().slice(0, 2)}`;
            if (guard.canShow(context, auth.uid)) {
              dispatch({ type: types.MODAL_SHOW, payload: { modal } });
              guard.markShown(context, auth.uid, 3600 * 6);
            }
          }
          return null;
        }
        case 'getProfile':
          return apiGetLayer(['profilePageLeftBanner', 'profilePageOverlayLayer', 'profilePageOverlayBanner'], params, onSuccess);
        case 'getAlbumPromoBanner':
          return apiGetLayer(['profilePageOverlayBanner'], params, onSuccess);
        default:
          console.log('TO DO layerAction', type, { source, uid, args, self: auth.uid });
          return null;
      }
    },
    { caller: 'doPreferredAction', allowCache: true, delay: 1 },
  );
};
