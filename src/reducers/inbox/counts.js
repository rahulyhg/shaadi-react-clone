import types from '../../action_types';

const initialState = {
  total: {
    connect_pending: 0,
    connect_filtered: 0,
  },
  updated: {
    connect_pending: 0,
    connect_filtered: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS: {
      const {
        accepted: connect_accepted = 0,
        invitations: connect_pending = 0,
        filteredOut: connect_filtered = 0,
        invitations_new: connect_pending_new = 0,
        requestsPending: request_pending = 0,
        requestsAccepted: request_accepted = 0,
      } = action.payload.counts;
      return {
        ...initialState,
        total: {
          ...initialState.total,
          connect_pending,
          connect_filtered,
          connect_pending_new,
          request_accepted,
          request_pending,
          connect_accepted,
        },
        updated: {
          connect_pending,
          connect_filtered,
          connect_pending_new,
          request_accepted,
          request_pending,
          connect_accepted,
        },
      };
    }
    case types.INBOX_DATA_SUCCESS: {
      const { listType, total, showTotal } = action.payload.meta;

      const newState =
        listType !== 'request_awaiting' ? (showTotal ? state : { ...state, updated: { ...state.updated, [listType]: total } }) : state;
      return newState;
    }
    default:
      return state;
  }
};
