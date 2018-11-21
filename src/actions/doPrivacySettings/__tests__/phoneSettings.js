import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types from '../../../action_types';

const creatMockStore = configureMockStore([thunk]);
const store = creatMockStore({ payload: { memberShip: 'Diamond Plus Member' } });

const mockResponse = {
  phoneSettings: {
    list: [
      {
        id: 'Show To Free And Premium',
        text: 'I am ok with getting calls from all my matches',
        tooltip: 'Available only for Platinum Plus & Diamond Plus Members.',
      },
      {
        id: 'Show All',
        text: 'I want only paid members of Shaadi to contact me',
        tooltip: '',
      },
      {
        id: 'When I Contact',
        text: 'I would like to be contacted only by matches I like',
        tooltip: '',
      },
    ],
    loading: false,
    preference: 'Hide My Number',
    memberShipPlan: 'Diamond Plus Member',
    isNative: false,
  },
};

function fetchPhoneSettingsRequest() {
  return {
    type: types.PHONE_SETTING_DATA_REQUEST,
    payload: { memberShip: 'Diamond Plus Member', isNative: false },
  };
}

function fetchPhoneSettingsSuccess(resp) {
  return {
    type: types.PHONE_SETTING_DATA_SUCCESS,
    payload: resp,
  };
}

function doPrivacySettings() {
  const promise = Promise.resolve({ data: mockResponse });
  return dispatch => {
    dispatch(fetchPhoneSettingsRequest());
    return promise.then(resp => dispatch(fetchPhoneSettingsSuccess(resp.data)));
  };
}

it('should execute fetch data', () => {
  // Return the promise
  const expectedOnRequest = { type: 'PHONE_SETTING_DATA_REQUEST', payload: { memberShip: 'Diamond Plus Member', isNative: false } };
  return store.dispatch(doPrivacySettings()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedOnRequest);
    expect(actions[1]).toEqual(fetchPhoneSettingsSuccess(mockResponse));
  });
});
