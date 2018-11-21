import types from '../../action_types';

const initialState = {
  drAction: '',
};

export default (state = initialState, action) => {
  const connectionType = { skip: 'no', connect: 'yes', shortlist: 'maybe' };
  switch (action.type) {
    case types.DR_PROFILES_SUCCESS: {
      return {
        ...state,
        drAction: (action.payload.recommendation && action.payload.recommendation.action) || state.drAction,
      };
    }
    case types.PROFILE_SUCCESS: {
      return {
        ...state,
        drAction: (action.payload.recommendation && action.payload.recommendation.action) || state.drAction,
      };
    }
    case types.EOI_SUCCESS: {
      return {
        ...state,
        drAction: connectionType[action.payload.type] || '',
      };
    }
    default: {
      return {
        ...state,
        drAction: state.drAction,
      };
    }
  }
};
