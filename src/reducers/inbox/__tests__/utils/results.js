import { createAlertReducer } from '../../../utils';

const tooltipReducer = createAlertReducer(['inbox'], ['eoi', 'photo', 'horoscope', 'bulk', 'format']);

const defaultState = {
  results_id: '',
  permalink: '/inbox/pending/recent-interests',
  evt: '',
  evt_ref: '',
  items: [],
  tooltip: tooltipReducer(undefined, {}),
  source: 'unified',
  listInfo: {},
  listType: 'connect_pending',
};

const state = {
  default: {
    ...defaultState,
  },
  success: {
    ...defaultState,
    results_id: 'results_id',
    evt: 'inbox-interests',
    evt_ref: 'aW5ib3gtaW50ZXJlc3Rz',
    tooltip: {
      body: [],
      key: 'none',
      loading: false,
      page: 'none',
      position: 'none',
      title: null,
    },
    merged: true,
    listType: 'connect_accepted',
    displayed_request_id: 'request_id',
    permalink: 'permalink',
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
  },
};

const payload = {
  success: {
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
