import types from '../../action_types';

const initialState = {
  loading: false,
  name: '...',
  category: 'template1',
  src: null,
  alt: '',
  url: '/404',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LAYER_SUCCESS:
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'campaignLayer') return state;
      const { name, category, src, alt, url, loading } = action.payload;
      return {
        loading: !!loading,
        name: name || 'Shaadi.com',
        category: category || 'template1',
        src: src || null,
        alt: alt || '',
        url: url || '/404',
      };
    }
    default:
      return state;
  }
}
