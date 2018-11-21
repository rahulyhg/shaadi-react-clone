import types from '../../action_types';

const initialState = {
  frequentlyUsedCities: [],
  moreCities: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.DOORSTEP_SUCCESS: {
      const data = (action.response && action.response.data && action.response.data.data && action.response.data.data.pickup_cities) || [];
      const usedCities = data.filter(f => f.frequently_use === 1) || [];
      const frequentlyUsedCities = [];
      usedCities.forEach((itemA, i) => {
        let chk = false;
        frequentlyUsedCities.forEach(itemB => {
          if (itemB.city_name === itemA.city_name) {
            chk = true;
          }
        });
        if (chk === false) {
          frequentlyUsedCities[i] = itemA;
        }
      });

      const moreCities = data.filter(f => f.frequently_use === 0) || [];
      return {
        ...state,
        frequentlyUsedCities,
        moreCities,
        loading: false,
      };
    }
    case types.DOORSTEP_REQUEST: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
