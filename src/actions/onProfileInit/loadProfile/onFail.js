import doProfileAction from '../../doProfileAction';

export default (action, { dispatch, getState, location }, uid) => {
  const err = action.payload.error.message.toLowerCase();
  if (err.indexOf('hidden') !== -1 || err.indexOf('deleted') !== -1) {
    const source = location.pathname.indexOf('daily-recommendations') !== -1 ? 'daily-recommendations' : 'profile';
    doProfileAction(source, uid, 'auto_move')(dispatch, getState);
    if (source === 'daily-recommendations') {
      doProfileAction('daily-recommendations', uid, 'dr_ignore')(dispatch, getState);
    }
  }
  dispatch(action);
};
