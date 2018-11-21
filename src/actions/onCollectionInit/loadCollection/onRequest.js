/* eslint camelcase: 0 */
import types from '../../../action_types';

const onRequest = (payload, { dispatch }) => {
  dispatch({ type: types.COLLECTION_REQUEST, payload });
};

export default onRequest;
