const factory = {
  onVisibilityChange() {},
  isOpen: true,
  isPaymentPage: false,
};

it('should export props for Help dropdown', () => {
  expect(factory).not.toBeFalsy();
});

export default factory;
