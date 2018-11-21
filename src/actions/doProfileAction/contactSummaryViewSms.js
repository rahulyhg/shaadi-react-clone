import types from '../../action_types';

export default (uid, args, { dispatch, getState, type, source, self }) => {
  const { items } = getState().contactSummary;
  dispatch({
    type: types.CONTACT_SUMMARY_VIEW_SMS_SHOW_SUCCESS,
    payload: { items, uid },
  });
};
