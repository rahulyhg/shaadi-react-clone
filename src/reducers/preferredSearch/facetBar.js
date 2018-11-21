import types from '../../action_types';

const shorten = str => {
  if (!str || str.length === 0 || str === 'null' || str === 'undefined') {
    return 'NA';
  }
  if (str.length <= 14) {
    return str;
  }
  return `${str.substring(0, 14)}...`;
};

const parameterize = str => {
  if (!str || str.length === 0 || str === 'null' || str === 'undefined') {
    return 'NA';
  }
  return `${str}`;
};

const inititalRecentlyViewedState = {
  id: 'recentlyViewed',
  isMulti: false,
  title: 'Recently Viewed',
  options: [
    {
      id: 'Unviewed Matches',
      label: 'Unviewed Matches',
      title: 'Unviewed Matches',
      name: 'viewed',
      value: 'N',
      count: null,
      isSelected: true,
    },
    {
      id: 'Viewed Matches',
      label: 'Viewed Matches',
      title: 'Viewed Matches',
      name: 'viewed',
      value: 'Y',
      count: null,
      isSelected: false,
    },
  ],
};

const recentlyViewed = (state = inititalRecentlyViewedState, action) => {
  switch (action.type) {
    case types.PREFERRED_FACET_UPDATE: {
      if (action.payload.cluster !== state.id) {
        return state;
      }
      const newState = {
        ...state,
        options: state.options.map(o => ({
          ...o,
          isSelected: action.payload.values.includes(o.value),
        })),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const newState = {
        ...state,
        options: state.options.map(o => ({
          ...o,
          isSelected: action.payload.meta.viewed === o.value,
        })),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const initialMatchesState = {
  id: 'matches',
  isMulti: false,
  title: 'Matches',
  options: [
    {
      id: 'All',
      label: 'All',
      name: 'All',
      title: 'All',
      value: 'preferred',
      count: null,
      isSelected: true,
    },
    {
      id: '2-way Matches',
      label: '2-way Matches',
      title: '2-way Matches',
      name: '2-way Matches',
      value: '2-way',
      count: null,
      isSelected: false,
    },
  ],
};

const matches = (state = initialMatchesState, action) => {
  switch (action.type) {
    case types.PREFERRED_FACET_UPDATE: {
      if (action.payload.cluster !== state.id) {
        return state;
      }
      const newState = {
        ...state,
        options: state.options.map(o => ({
          ...o,
          isSelected: action.payload.values.includes(o.value),
        })),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const newState = {
        ...state,
        options: state.options.map(o => ({
          ...o,
          isSelected: (action.payload.meta.type || 'preferred').endsWith(o.value),
        })),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const initialOptionState = {
  isSelected: false,
};

const option = (state = initialOptionState, action) => {
  switch (action.type) {
    case types.PREFERRED_FACET_UPDATE: {
      const newState = {
        ...state,
        isSelected: action.payload.includes(state.value),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const newState = {
        ...state,
        id: action.payload.religion ? `${action.payload.religion}-${action.payload.id}` : action.payload.id,
        isSelected: action.payload.isSelected,
        count: `${action.payload.count}`,
        name: parameterize(action.payload.label),
        label: shorten(action.payload.label),
        title: action.payload.religion ? `${action.payload.religion} - ${action.payload.label}` : action.payload.label,
        value: action.payload.religion ? `${action.payload.religion}:${action.payload.id}` : action.payload.id,
        vOrder: action.payload.vOrder || 0,
        vGroup: action.payload.vGroup || null,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const initialFacetState = {
  id: '',
  label: '',
  title: '...',
  count: null,
  options: [],
};

const facet = (state = initialFacetState, action) => {
  switch (action.type) {
    case types.PREFERRED_FACET_UPDATE: {
      if (action.payload.cluster !== state.id) {
        return state;
      }
      const newState = {
        ...state,
        options: state.options.map(o => option(o, { ...action, payload: action.payload.values })),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const newState = {
        ...state,
        id: action.payload.id,
        title: action.payload.label,
        isMulti: action.payload.isMulti,
        hasAllOption: true,
        options: action.payload.options.map(o => option(undefined, { ...action, payload: o })),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const initialState = [recentlyViewed(undefined, {}), matches(undefined, {})];

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PREFERRED_FACET_UPDATE: {
      const newState = [recentlyViewed(state[0], action), matches(state[1], action)].concat(
        state.slice(2, 1000).map(f => facet(f, action)),
      );
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const newState = [recentlyViewed(state[0], action), matches(state[1], action)]
        .concat(action.payload.facets.map(f => facet(undefined, { ...action, payload: f })))
        .filter(f => f.options && f.options.length);
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
}
