const displayAmountProps = {
  amount: 0,
  currency: '',
  fractionAllowed: 0,
  product_code: '',
  postFix: '',
};
const factory = {
  displayAmountProps,
};
it('should export payment', () => {
  expect(factory.displayAmountProps).not.toBeFalsy();
});

export default factory;
