import phoneSettings from '../phoneSettings';
import types from '../../../action_types';

describe('Phone Setting Reducer', () => {
  const initialState = {
    loading: true,
    memberShipPlan: '',
    isNative: false,
  };

  const data = {
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

  it('Show Loader when initialstate', () => {
    expect(phoneSettings({}, { type: types.PHONE_SETTING_DATA_REQUEST, payload: { memberShip: '', isNative: false } })).toEqual(
      initialState,
    );
  });

  it('Hide Loader and show radio list option when success', () => {
    expect(
      phoneSettings(
        {},
        { type: types.PHONE_SETTING_DATA_SUCCESS, payload: { ...data, memberShip: 'Diamond Plus Member', isNative: false } },
      ),
    ).toEqual(data.phoneSettings);
  });
});
