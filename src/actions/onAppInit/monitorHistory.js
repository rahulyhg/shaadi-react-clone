/* eslint camelcase: 0 */
import { parse } from 'qs';
import types from '../../action_types';
import detectLayout from './detectLayout';

export default (history, dispatch) => {
  const onRouteChange = (location, action) => {
    const { pathname, search, hash, state, key } = location;
    const query = parse(search.slice(1));
    const { evt_ref } = query;
    const set_profiles_back = query.set_profiles_back || '';

    dispatch({
      type: types.ROUTE_CHANGE,
      payload: { pathname, search, query, method: action, hash, state, key },
    });

    dispatch({ type: types.SET_LAYOUT, payload: detectLayout(search) });

    dispatch({ type: types.EVT_REF, payload: { evt_ref, set_profiles_back } });
  };
  history.listen(onRouteChange);
  onRouteChange(history.location, 'push');
};
