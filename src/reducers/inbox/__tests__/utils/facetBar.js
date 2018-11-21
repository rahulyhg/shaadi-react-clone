const state = {
  default: [],
  success: [
    {
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
          mobileLabel: 'All Invitations',
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
          id: 'Accepted by him',
          label: 'Accepted by him',
          title: 'Accepted by him',
          name: 'custom',
          value: 'profileid',
          count: null,
          isSelected: false,
        },
      ],
    },
  ],
};

const payload = {
  success: {
    userInfo: {
      himHer: 'Her',
    },
    actionType: 'accepted',
    criteria: [],
    customFilter: [],
    facets: [],
    items: [
      {
        uid: 'SSH42281242',
        justNow: false,
        eoiLoadingStyle: 'none',
        photoLoading: false,
        requests: {
          connect_accepted: {
            type: 'connect',
            action: 'accepted',
            from: 'OSH71455124',
            to: 'SSH42281242',
            isNew: false,
            actionDate: '02 Feb',
            requestKey: '3cbbd5861487797546e1cbad306fd739',
            message_id: '',
            viewed_date: '02 Feb 2018',
            direction: 'out',
          },
        },
      },
    ],
    meta: {
      results_id: 'results_id',
      total: 3,
      page: 1,
      pages: 1,
      requestType: {
        type: 'connect',
        action: 'accepted',
      },
      listType: 'connect_accepted',
      itemPerPage: 10,
      evtRef: 'inbox-interests',
      permalink: 'permalink',
      request_id: 'request_id',
    },
    profiles: [],
  },
};

const results = {
  state,
  payload,
};

it('should export state, payload', () => {
  expect(Object.keys(results).length).toEqual(2);
});

export default results;
