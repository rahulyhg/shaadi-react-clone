export default (uid, params, onRequest, onSuccess, onFail) => {
  const { getState } = params;

  onRequest({ uid }, params, uid, true);

  if (!uid || uid.length === 0 || uid === 'default') {
    const message = 'Sorry, this Member is not a Shaadi.com member. Please try again.';
    onFail({ uid, error: { message } }, params, true);
    return;
  }

  const { cache } = getState().profilePage.collection;
  onSuccess(cache[uid], params, true);
};
