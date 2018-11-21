import types from '../../action_types';

const initialState = {
  disabled: true,
  message: null,
  hisHer: '...',
  himHer: 'Them',
  name: '',
  isLoadingDrafts: true,
  draftItems: [],
  flashIcon: 'none',
  flash: null,
  draftsLoadedAt: 0,
  history: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.HIDE_DRAFT_FLASH:
      return {
        ...state,
        flash: null,
        flashIcon: 'none',
      };
    case types.NEW_DRAFT_REQUEST:
    case types.MODIFY_DRAFT_REQUEST:
      return {
        ...state,
        flash: '',
        flashIcon: 'loading',
        message: action.payload.message || state.message,
      };
    case types.MODAL_SHOW: {
      const { modal, name, himHer, profilePhoto, type, source, uid, presence, disabled, message } = action.payload;
      if (modal !== 'acceptPremium') {
        return state;
      }
      return {
        ...state,
        name,
        profilePhoto,
        himHer,
        type,
        source,
        uid,
        presence,
        disabled,
        message,
      };
    }
    case types.FETCH_DEFAULT_DRAFT_SUCCESS: {
      return {
        ...state,
        disabled: false,
        message: action.payload.draft,
      };
    }
    case types.NEW_DRAFT_SUCCESS: {
      const id = `new-draft-${new Date() / 1}`;
      return {
        ...state,
        flash: 'Saved as a new draft.',
        flashIcon: 'success',
        draftItems: [
          ...state.draftItems,
          {
            key: id,
            id,
            message: action.payload.draft.message || '',
            order: 10,
          },
        ],
        draftsLoadedAt: 0,
      };
    }
    case types.MODIFY_DRAFT_SUCCESS: {
      const { draft } = action.payload;
      return {
        ...state,
        flash: 'Draft overwritten',
        flashIcon: 'success',
        draftItems: state.draftItems.map(d => {
          if (draft.id !== d.id) {
            return d;
          }
          return {
            ...d,
            message: draft.message,
          };
        }),
        draftsLoadedAt: new Date() / 1,
      };
    }
    case types.FETCH_DRAFTS_SUCCESS:
      return {
        ...state,
        isLoadingDrafts: false,
        draftItems: action.payload.drafts.map((d, i) => ({
          key: `draft-${d.draft_id}`,
          id: `${d.draft_id}`,
          message: d.message,
          order: i + 1,
        })),
        draftsLoadedAt: new Date() / 1,
        flashIcon: 'none',
        flash: null,
      };
    case types.NEW_DRAFT_FAIL:
    case types.MODIFY_DRAFT_FAIL:
    case types.FETCH_DEFAULT_DRAFT_FAIL:
    case types.FETCH_DRAFTS_FAIL: {
      const { error, prefix } = action.payload;
      return {
        ...state,
        isLoadingDrafts: false,
        flashIcon: 'error',
        flash: `${prefix || ''}${error.message || error}`,
      };
    }
    case types.FETCH_DRAFTS_REQUEST:
      return {
        ...state,
        isLoadingDrafts: true,
        flashIcon: 'none',
        flash: null,
      };
    case types.CONNECT_MESSAGE_SUCCESS: {
      return {
        ...state,
        history: action.payload.messages || [],
      };
    }
    default:
      return state;
  }
}
