import types from '../../action_types';

export default (uid, args, { dispatch, getState, type, source, self }) => {
  dispatch({ type: types.PROFILE_RESET, payload: { uid, type, source } });
};
