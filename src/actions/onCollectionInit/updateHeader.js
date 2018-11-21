import types from '../../action_types';

export default (scroll, hideNav) => (dispatch, getState) => {
  // alert('upgrade'+ scroll+ hideNav);
  dispatch({ type: types.NAV_HIDDEN, payload: { scroll, hideNav } });
};
