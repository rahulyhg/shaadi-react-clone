import types from '../../action_types';

const oppositeVal = {
  him: 'her',
  he: 'she',
  her: 'him',
  she: 'he',
  male: 'female',
  female: 'male',
};

const processStates = (state, action) => {
  switch (action.type) {
    case types.INBOX_DATA_SUCCESS: {
      const newState = {
        ...state,
        options: state.options.map(o => ({
          ...o,
          isSelected: action.payload.customFilter.length ? action.payload.customFilter.includes(o.value) : o.value === 'all',
        })),
      };

      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default:
      return state;
  }
};

const pendingInvites = (action, memberInfo) => {
  const state = {
    id: 'custom',
    isMulti: true,
    title: '',
    options: [
      {
        id: 'All',
        label: 'All',
        title: 'All',
        name: 'custom',
        value: 'all',
        count: null,
        isSelected: true,
      },
      {
        id: 'Premium Invitations',
        label: 'Premium Invitations',
        title: 'Premium Invitations',
        name: 'custom',
        value: 'premium',
        count: null,
        isSelected: false,
      },
      {
        id: 'Matching Preferences',
        label: 'Matching Preferences',
        title: 'Matching Preferences',
        name: 'custom',
        value: 'most_preferred',
        count: null,
        isSelected: false,
      },
      {
        id: 'Expiring Soon',
        label: 'Expiring Soon',
        title: 'Expiring Soon',
        name: 'custom',
        value: 'pending_interest_expiring',
        count: null,
        isSelected: false,
      },
    ],
  };
  return processStates(state, action);
};

const acceptedInvites = (action, memberInfo) => {
  const himHer = memberInfo.himHer.toLowerCase();
  const state = {
    id: 'custom',
    isMulti: true,
    title: '',
    options: [
      {
        id: 'All',
        label: 'All',
        title: 'All',
        name: 'custom',
        value: 'all',
        count: null,
        isSelected: true,
      },
      {
        id: 'Accepted by me',
        label: 'Accepted by me',
        title: 'Accepted by me',
        name: 'custom',
        value: 'memberlogin',
        count: null,
        isSelected: false,
      },
      {
        id: `Accepted by ${oppositeVal[himHer]}`,
        label: `Accepted by ${oppositeVal[himHer]}`,
        title: `Accepted by ${oppositeVal[himHer]}`,
        name: 'custom',
        value: 'profileid',
        count: null,
        isSelected: false,
      },
    ],
  };
  return processStates(state, action);
};
const awaitingInvites = (action, memberInfo) => {
  const himHer = memberInfo.himHer.toLowerCase();
  const state = {
    id: 'custom',
    isMulti: true,
    title: '',
    options: [
      {
        id: 'All',
        label: 'All',
        title: 'All',
        name: 'custom',
        value: 'all',
        count: null,
        isSelected: true,
      },
      {
        id: `Viewed by ${oppositeVal[himHer]}`,
        label: `Viewed by ${oppositeVal[himHer]}`,
        title: `Viewed by ${oppositeVal[himHer]}`,
        name: 'custom',
        value: 'viewed',
        count: null,
        isSelected: false,
      },
      {
        id: `Not Viewed by ${oppositeVal[himHer]}`,
        label: `Not Viewed by ${oppositeVal[himHer]}`,
        title: `Not Viewed by ${oppositeVal[himHer]}`,
        name: 'custom',
        value: 'unviewed',
        count: null,
        isSelected: false,
      },
    ],
  };
  return processStates(state, action);
};
const deletedInvites = (action, memberInfo) => {
  const himHer = memberInfo.himHer.toLowerCase();
  const state = {
    id: 'custom',
    isMulti: true,
    title: '',
    options: [
      {
        id: 'All',
        label: 'All',
        title: 'All',
        name: 'custom',
        value: 'all',
        count: null,
        isSelected: true,
      },
      {
        id: 'Cancelled by me',
        label: 'Cancelled by me',
        title: 'Cancelled by me',
        name: 'custom',
        value: 'memberlogin',
        count: null,
        isSelected: false,
      },
      {
        id: `Cancelled by ${oppositeVal[himHer]}`,
        label: `Cancelled by ${oppositeVal[himHer]}`,
        title: `Cancelled by ${oppositeVal[himHer]}`,
        name: 'custom',
        value: 'profileid',
        count: null,
        isSelected: false,
      },
    ],
  };
  return processStates(state, action);
};
const acceptedRequests = (action, memberInfo) => {
  const state = {
    id: 'custom',
    isMulti: true,
    title: '',
    options: [
      {
        id: 'All',
        label: 'All',
        title: 'All',
        name: 'custom',
        value: 'all',
        count: null,
        isSelected: true,
      },
      {
        id: 'Photo Requests',
        label: 'Photo Requests',
        title: 'Photo Requests',
        name: 'custom',
        value: 'photo',
        count: null,
        isSelected: false,
      },
      {
        id: `Phone Requests`,
        label: `Phone Requests`,
        title: `Phone Requests`,
        name: 'custom',
        value: 'phone',
        count: null,
        isSelected: false,
      },
    ],
  };
  return processStates(state, action);
};
const requests = (action, memberInfo) => {
  const state = {
    id: 'custom',
    isMulti: true,
    title: '',
    options: [
      {
        id: 'All',
        label: 'All',
        title: 'All',
        name: 'custom',
        value: 'all',
        count: null,
        isSelected: true,
      },
      {
        id: 'Photo Requests',
        label: 'Photo Requests',
        title: 'Photo Requests',
        name: 'custom',
        value: 'photo',
        count: null,
        isSelected: false,
      },
      {
        id: `Phone Requests`,
        label: `Phone Requests`,
        title: `Phone Requests`,
        name: 'custom',
        value: 'phone',
        count: null,
        isSelected: false,
      },
    ],
  };
  return processStates(state, action);
};
const defaultFn = () => ({});

const customFilters = {
  connect_pending: pendingInvites,
  connect_accepted: acceptedInvites,
  connect_awaiting: awaitingInvites,
  connect_deleted: deletedInvites,
  request_pending: requests,
  request_accepted: acceptedRequests,
  request_awaiting: requests,
  defaultFn,
};

export default customFilters;
