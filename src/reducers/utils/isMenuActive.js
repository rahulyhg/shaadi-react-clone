export default ({ payload, state } = {}) =>
  payload &&
  state &&
  ((state.nav && state.nav.some(item => item.path === payload.pathname || (item.otherPaths || []).includes(payload.pathname))) ||
    state.path === payload.pathname ||
    (state.otherPaths || []).includes(payload.pathname));
