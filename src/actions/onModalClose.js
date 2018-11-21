import types from '../action_types';

export default () => dispatch => {
  dispatch({
    type: types.MODAL_HIDE,
  });
};
