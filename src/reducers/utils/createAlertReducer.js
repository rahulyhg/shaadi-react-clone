import types from '../../action_types';

const initialState = {
  key: 'none',
  page: 'none',
  position: 'none',
  title: null,
  body: [],
  loading: false,
};

export default (pages, tartgetPositions) => (state = initialState, action) => {
  switch (action.type) {
    case types.ALERT_HIDE_KEY: {
      const { key } = action.payload;
      if (state.key === key) {
        return initialState;
      }
      return state;
    }
    case types.ALERT_HIDE: {
      const { page, positions } = action.payload;
      if (
        (pages.includes(page) || page === 'any') &&
        (positions.filter(p => tartgetPositions.includes(p)).length > 0 || positions.includes('any'))
      ) {
        return initialState;
      }
      return state;
    }
    case types.ALERT_SHOW: {
      const { page, position, key, params, title, body, loading } = action.payload;
      if (pages.includes(page) && tartgetPositions.includes(position)) {
        return {
          ...state,
          ...params,
          key,
          page,
          position,
          isFreeToast: params === 'isFreeToast',
          title,
          body,
          loading,
        };
      }
      return state;
    }
    default:
      return state;
  }
};
