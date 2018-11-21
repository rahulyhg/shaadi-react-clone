import types from '../action_types';

export default () => dispatch => {
  dispatch({
    type: types.HIDE_ALL_DROPDOWNS,
  });
};
