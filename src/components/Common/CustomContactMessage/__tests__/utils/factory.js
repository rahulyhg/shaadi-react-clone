const customContactMessage = {
  isHovered: false,
  isPaidUser: false,
  isVip: false,
  message: 'Connect Now',
  mode: 'enabled',
  onClick: null,
  title: 'Connect Now',
  type: 'Connect',
};

const factory = { customContactMessage };

it('Should export Custom Message props', () => {
  expect(factory.customContactMessage).not.toBeFalsy();
});

export default factory;
