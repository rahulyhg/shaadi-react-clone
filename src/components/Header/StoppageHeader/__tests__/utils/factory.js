const logo = {
  url: 'http://www.shaadi.com',
  isExternal: true,
  img: {
    title: 'shaadi.com',
    src: 'https://img2.shaadi.com/imgs/logos/payment/payment-shaadi-logo.png',
  },
};

const factory = {
  logo,
  nextUrl: 'http://www.shaadi.com',
  isNative: false,
  canShowSkip: false,
  canShowTooltipOnStoppageHeader: true,
  layout: 'desktop',
};

it('should export theDefaultState, payloadProps', () => {
  expect(Object.keys(factory).length).toEqual(6);
});

export default factory;
