const theDefaultState = {
  display_uid: '',
  display_name: '',
  display_photo: '',
  offer_details: [],
};

const payloadProps = {
  modal: 'premiumProposition',
  display_uid: 'HSH26273875',
  display_name: 'Pranita T',
  display_photo: 'https://img1.shaadi.com//2017/06/24/HSH26273875-b664ad.jpg',
  offer_details: [
    {
      type: 'perc',
      value: 50,
    },
  ],
};

const expPayloadProps = {
  display_uid: 'HSH26273875',
  display_name: 'Pranita T',
  display_photo: 'https://img1.shaadi.com//2017/06/24/HSH26273875-b664ad.jpg',
  offer_details: [
    {
      type: 'perc',
      value: 50,
    },
  ],
};

const onModalShowAction = payload => ({
  type: 'MODAL_SHOW',
  payload: {
    modal: payload.modal || '',
    display_uid: payload.display_uid || '',
    display_name: payload.display_name || '',
    display_photo: payload.display_photo || '',
    offer_details: payload.offer_details || [],
  },
});

const factory = {
  onModalShowAction,
  theDefaultState,
  payloadProps,
  expPayloadProps,
};

it('should export theDefaultState, payloadProps', () => {
  expect(Object.keys(factory).length).toEqual(4);
});

export default factory;
