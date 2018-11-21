const timerProps = {
  time: 2,
  loader: {},
  response: {},
};

const factory = {
  timerProps,
};
it('should export payment', () => {
  expect(factory.timerProps).not.toBeFalsy();
});
export default factory;
