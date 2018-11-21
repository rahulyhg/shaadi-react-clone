import types from '../../action_types';
import customFilters from './customFilters';

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

const initialOptionState = {
  isSelected: false,
};

const option = (state = initialOptionState, action) => {
  switch (action.type) {
    case types.INBOX_DATA_SUCCESS: {
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
    case types.INBOX_DATA_SUCCESS: {
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

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case types.INBOX_DATA_SUCCESS: {
      const { listType } = action.payload.meta;
      const { userInfo } = action.payload;
      const filterFn = customFilters[listType] || customFilters.defaultFn;
      const newState = [filterFn(action, userInfo)]
        .concat(action.payload.facets.map(f => facet(undefined, { ...action, payload: f })))
        .filter(f => f.options && f.options.length);
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
}
