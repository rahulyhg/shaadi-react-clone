const theDefaultState = {
  savedSearchList: [],
  savedSuccess: false,
};

const factory = {
  theDefaultState,
};

it('should export theDefaultState', () => {
  expect(Object.keys(factory).length).toEqual(1);
});

export default factory;
