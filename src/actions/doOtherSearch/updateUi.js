import types from '../../action_types';

export default (target, dispatch) => {
  const { changes, searchList_type } = target;
  if (changes.cluster) {
    dispatch({ type: types.OTHERSEARCH_FACET_UPDATE, payload: { ...changes, searchList_type } });
  } else {
    // Update url
  }
};
