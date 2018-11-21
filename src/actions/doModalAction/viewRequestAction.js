import types from '../../action_types';

export default () => (uid, dispatch, getState) => {
  const currState = getState();
  dispatch({
    type: types.REQUEST_MODAL_SHOW,
    payload: {
      modal: 'request',
      profileid: uid,
      display_name: currState.profiles[uid].name,
    },
  });
};
