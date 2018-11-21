const paymentTickerProps = {
  target_time: 1520080660,
};

const factory = {
  paymentTickerProps,
};

it('should export payment ticker', () => {
  expect(factory.paymentTickerProps).not.toBeFalsy();
});
export default factory;
