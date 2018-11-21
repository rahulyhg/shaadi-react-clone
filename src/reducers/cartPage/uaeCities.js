import types from '../../action_types';

const initialState = {
  cities: [],
  centers: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UAE_EXCHANGE_SUCCESS: {
      const data =
        (action.response && action.response.data && action.response.data.data && action.response.data.data.collection_centres) || [];
      const filteredCities = [];
      data.forEach(obj => {
        if (filteredCities.indexOf(obj.city) === -1) filteredCities.push(obj.city);
      });
      const cities = []
        .concat(filteredCities)
        .sort()
        .map(c => c);
      return {
        ...state,
        cities,
        centers: data,
        loading: false,
      };
    }
    case types.UAE_EXCHANGE_REQUEST: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
