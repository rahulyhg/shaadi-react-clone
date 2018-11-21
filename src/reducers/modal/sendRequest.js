import types from '../../action_types';

const initialState = {
  disabled: true,
  isLoadingDrafts: false,
  title: null,
  message: null,
  heShe: '...',
  hisHer: '...',
  himHer: 'Them',
  uids: [],
  flashIcon: 'none',
  flash: null,
  draftItems: [],
  draftsLoadedAt: 0,
  canSendPasswordOnConnect: false,
  type: '',
  name: '',
  history: [],
  showMessageLayer: false,
  filtered: false,
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
    case types.MODAL_SHOW: {
      const { modal, uids, uid, heShe, hisHer, himHer, message, title, source, disabled, settings, type, name } = action.payload;
      if (modal !== 'sendRequest') {
        return state;
      }
      return {
        ...state,
        disabled,
        message,
        title,
        heShe,
        hisHer,
        himHer,
        uids,
        uid,
        source,
        name,
        canSendPasswordOnConnect: settings.canSendPasswordOnConnect,
        type,
        showMessageLayer: action.payload.showMessageLayer || state.showMessageLayer,
        filtered: action.payload.filtered || state.filtered,
      };
    }
    case types.FETCH_DRAFTS_REQUEST:
      return {
        ...state,
        isLoadingDrafts: true,
        flashIcon: 'none',
        flash: null,
      };
    case types.FETCH_DEFAULT_DRAFT_SUCCESS: {
      if (['accept', 'remind', 'connect', 'bulkConnect'].includes(action.payload.type)) {
        return {
          ...state,
          disabled: false,
          message: action.payload.draft,
        };
      }
      return state;
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
