const male = {
  uid: 'uid-male',
  name: 'male',
  himHer: 'Him',
  hisHer: 'His',
  heShe: 'He',
  presence: {
    onlineStatus: 'invisible',
    chatIcon: 'none',
  },
};
const female = {
  ...male,
  uid: 'uid-female',
  name: 'female',
  himHer: 'Her',
  hisHer: 'Her',
  heShe: 'She',
};

const profiles = [male, female];

const props = {};

const factory = { props, profiles };

it('should export profiles and props', () => {
  expect(factory.profiles).not.toBeFalsy();
  expect(factory.props).not.toBeFalsy();
});

export default factory;
