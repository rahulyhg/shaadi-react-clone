import items from './items';
import meta from './meta';

const itemsState = {
  items: {
    items: [],
    tooltip: {
      key: 'none',
      page: 'none',
      position: 'none',
      title: null,
      body: [],
      loading: false,
    },
  },
};

const dataSuccess = {
  items: {
    items: [
      {
        uid: 'ESH69905149',
        justNow: false,
        photoLoading: false,
        changeCursorStatus: true,
        displayStatusMessage: '',
        viewSmsShowStatus: false,
      },
    ],
    tooltip: {
      key: 'none',
      page: 'none',
      position: 'none',
      title: null,
      body: [],
      loading: false,
    },
  },
};

const showHideViewSms = {
  items: {
    items: [
      {
        changeCursorStatus: true,
        displayStatusMessage: '',
        justNow: false,
        photoLoading: false,
        uid: 'ESH69905149',
        viewSmsShowStatus: true,
      },
    ],
    tooltip: {
      body: [],
      key: 'none',
      loading: false,
      page: 'none',
      position: 'none',
      title: null,
    },
    uid: 'ESH69905149',
  },
};

const metaDataRequest = {
  file_extension: 'webp',
  loading: true,
  page: '2',
  pages: 0,
  request_id: 'eyJ0IjoxNTE5NDE3NTIzOTExfQ==',
  results_id: 'contacts:9d347dde80ed5c27569f7d50163d3e1d',
  t: 1519417523911,
  total: 0,
  meta: {},
};

const metaDataSuccess = {
  loading: false,
  page: '2',
  pages: 12,
  permaLink: '/inbox/contact-summary?pg_searchresults_id=contacts%3A9d347dde80ed5c27569f7d50163d3e1d&page=2',
  results_id: 'contacts:9d347dde80ed5c27569f7d50163d3e1d',
  total: 113,
  meta: {},
};

const metaDataRequestWithoutPayload = {
  file_extension: '',
  loading: true,
  meta: {},
  page: '0',
  pages: 0,
  request_id: '',
  results_id: '',
  t: 0,
  total: 0,
};
const factory = {
  itemsState,
  items,
  dataSuccess,
  showHideViewSms,
  meta,
  metaDataRequest,
  metaDataSuccess,
  metaDataRequestWithoutPayload,
};

it('should export contactSummary factory state and action', () => {
  expect(Object.keys(factory).length).toEqual(8);
});

export default factory;
