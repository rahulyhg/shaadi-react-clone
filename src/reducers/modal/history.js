import types from '../../action_types';
import getUnixToFormat from '../../helpers/getUnixToFormat';

const initialState = {
  loading: false,
  name: '',
  uid: 'bleh',
  evtRef: 'chat-history',
  items: [
    {
      day: '',
      items: [
        {
          time: '',
          message: '',
          isSelf: false,
        },
        {
          time: '',
          message: '',
          isSelf: false,
        },
      ],
    },
  ],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'history') return state;

      return {
        ...state,
        loading: true,
        name: action.payload.display_name,
      };
    }
    case types.HISTORY_MODAL_SHOW: {
      const { modal } = action.payload;

      if (modal !== 'history') return state;

      const { display_name, data, profileid } = action.payload;

      const messagesTemp = {};

      data.messages.map(m => {
        const epoch = m.t / 1000;
        const date = getUnixToFormat(epoch, 'DD-MMM-YYYY');
        const key = date;
        if (!messagesTemp[key]) {
          messagesTemp[key] = {
            day: key,
            items: [],
          };
        }

        return messagesTemp[key].items.push({
          time: m.time,
          message: m.body,
          isSelf: m.isSelf,
        });
      });
      const newState = {
        ...state,
        uid: profileid,
        loading: false,
        name: display_name,
        items: [Object.keys(messagesTemp).map(e => messagesTemp[e])],
      };

      return newState;
    }
    default:
      return state;
  }
}
