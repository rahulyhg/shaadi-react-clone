const noDiscount = {
  display_uid: 'HSH26273875',
  display_name: 'Pranita T',
  display_photo: 'https://img1.shaadi.com//2017/06/24/HSH26273875-b664ad.jpg',
  offer_details: [],
};

const withDiscount = {
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

const factory = { noDiscount, withDiscount };

it('Should export Profile and Discount', () => {
  expect(factory.noDiscount).not.toBeFalsy();
  expect(factory.withDiscount).not.toBeFalsy();
});

export default factory;
