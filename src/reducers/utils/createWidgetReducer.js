import types from '../../action_types';

const initialItemState = {
  uid: null,
};

const itemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.WIDGET_MATCHES_CACHE:
    case types.WIDGET_MATCHES_SUCCESS:
      return {
        ...state,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};

const initialState = {
  uid: null,
  loading: false,
  flash: null,
  count: 0,
  results_id: '',
  items: [],
};

export default widgetName => (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return {
        ...initialState,
        uid: action.payload.uid,
      };
    case types.PROFILE_FAIL:
      return initialState;
    case types.WIDGET_MATCHES_REQUEST: {
      const { widget } = action.payload;
      if (widget !== widgetName) {
        return state;
      }
      return {
        ...state,
        loading: true,
        flash: null,
      };
    }
    case types.ROUTE_CHANGE: {
      return {
        ...initialState,
      };
    }
    case types.WIDGET_MATCHES_CACHE:
    case types.WIDGET_MATCHES_SUCCESS: {
      const { widget } = action.payload;
      if (widget !== widgetName) {
        return state;
      }
      return {
        ...state,
        items: action.payload.profiles.map(profile => itemReducer(undefined, { ...action, payload: profile })),
        count: action.payload.meta.max,
        results_id: action.payload.meta.results_id,
        loading: false,
        flash: null,
      };
    }
    case types.WIDGET_MATCHES_FAIL: {
      const { widget } = action.payload;
      if (widget !== widgetName) {
        return state;
      }
      return {
        ...state,
        loading: false,
        flash: action.payload.error.message,
      };
    }
    default:
      return state;
  }
};
