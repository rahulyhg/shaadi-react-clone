const props = {
  premiumBannner: {
    actionDate: '06 Dec',
    profileDisplayName: 'Yatnesh G',
    profilePhotoPath: 'https://img1.shaadi.com//2017/11/25/6SH47753400-624863-Male.jpg',
    bannerType: 'accepted',
    contactPartial: '+91 9673XXXXXX',
    heShe: 'He',
    himHer: 'Him',
    hisHer: 'His',
    profileCount: 10,
  },
  settings: {
    offerCode: 'foreversun',
    offer_details: [
      {
        type: 'perc',
        value: 60,
      },
    ],
  },
  type: 'list',
  wwwBaseUrl: 'https://www.shaadi.com',
};

const factory = { props };
it('should export props', () => {
  expect(factory.props).not.toBeFalsy();
});

export default factory;
