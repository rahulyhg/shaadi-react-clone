import withAuth from '../withAuth';
import types from '../../action_types';
import apiVerificationRequestAction from './apiVerificationRequestAction';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }) => {
      switch (type) {
        case 'close': {
          // const modalData = getState().modal;
          const template = source.split('/')[1];

          if (['sendRequest'].includes(template)) {
            dispatch({ type: types.MOBILE_CARD_SET_STATUS, payload: { uid, status: 'unhidden' } });
            dispatch({ type: types.MODAL_HIDE });
            return null;
          }
          return dispatch({ type: types.MODAL_HIDE });
        }
        case 'chatNow': {
          const stateData = getState();
          dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'premiumProposition',
              display_uid: uid,
              display_name: stateData.profiles[uid].name,
              display_photo: stateData.profiles[uid].thumbnail,
              offer_details: stateData.session.settings.offer_details,
            },
          });
          return null;
        }
        case 'commonInterests': {
          const stateData = getState();
          dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'commonInterests',
              himHer: stateData.profiles[uid].himHer,
              items: stateData.profiles[uid].detailed.conversationStarters.items,
            },
          });
          return null;
        }
        case 'sendVerificationRequest': {
          const payload = {
            type: 'contact',
            from: auth.uid,
            to: uid,
          };
          apiVerificationRequestAction(uid, [payload], dispatch, getState, null, null, () => dispatch({ type: types.MODAL_HIDE }));
          return null;
        }
        case 'reportMisuseConfirm': {
          const stateData = getState();
          dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'reportMisuseConfirm',
              uid,
              display_name: stateData.profiles[uid].name,
              reason: args[0],
              reasonText: args[1],
            },
          });
          return null;
        }
        case 'filters': {
          const { facetBar } = getState().inbox;
          dispatch({
            type: types.MODAL_SHOW,
            payload: {
              modal: 'filters',
              memberLogin: auth.uid,
              source,
              facetBar,
            },
          });
          return null;
        }
        default:
          console.log('TO DO doModalAction/mobile', type, { source, uid, args, self: auth.uid });
          return null;
      }
    },
    { caller: 'doModalAction/mobile', allowCache: true, delay: 1 },
  );
};
