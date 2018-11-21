const freeConnect = {
  isDark: false,
  isHovered: false,
  isPaidUser: false,
  isVip: false,
  isVisible: true,
  mode: 'enabled',
  onClick: null,
  title: 'Connect Now',
  type: 'Connect',
};

const premiumConnect = {
  isDark: false,
  isHovered: false,
  isPaidUser: true,
  isVip: false,
  isVisible: true,
  mode: 'enabled',
  onClick: null,
  title: 'Connect Now',
  type: 'Connect',
};

const vipConnect = {
  isDark: false,
  isHovered: false,
  isPaidUser: false,
  isVip: true,
  isVisible: true,
  mode: 'enabled',
  onClick: null,
  title: 'Connect Now',
  type: 'Connect',
};

const freePremiumAccept = {
  isAccept: true,
  isDark: false,
  isHovered: true,
  isPaidUser: false,
  isVip: false,
  isVisible: true,
  mode: 'enabled',
  onClick: null,
  title: 'Accept',
  type: 'Accept',
};

const freePremiumDecline = {
  isDark: false,
  isDecline: true,
  isHovered: false,
  isPaidUser: false,
  isVip: false,
  isVisible: true,
  mode: 'enabled',
  onClick: null,
  title: 'Decline',
  type: 'Decline',
};

const writeMessage = {
  isDark: false,
  isHovered: false,
  isPaidUser: false,
  isVip: false,
  isVisible: true,
  mode: 'enabled',
  onClick: null,
  title: 'Write Message',
  type: 'WriteMessage',
};

const factory = { freeConnect, premiumConnect, vipConnect, freePremiumAccept, freePremiumDecline, writeMessage };

it('Should export Round Button props', () => {
  expect(factory.freeConnect).not.toBeFalsy();
  expect(factory.premiumConnect).not.toBeFalsy();
  expect(factory.vipConnect).not.toBeFalsy();
  expect(factory.freePremiumAccept).not.toBeFalsy();
  expect(factory.freePremiumDecline).not.toBeFalsy();
  expect(factory.writeMessage).not.toBeFalsy();
});

export default factory;
