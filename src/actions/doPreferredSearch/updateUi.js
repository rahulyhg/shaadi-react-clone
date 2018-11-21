import types from '../../action_types';

export default (target, dispatch) => {
  const { changes } = target;
  if (changes.cluster) {
    dispatch({ type: types.PREFERRED_FACET_UPDATE, payload: changes });
  } else {
    // Update url
  }
};
