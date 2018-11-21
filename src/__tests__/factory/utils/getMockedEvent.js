const defaultParams = {
  value: '',
  keyCode: 0,
  preventDefault: () => {},
  stopPropagation: () => {},
};

const getMockedEvent = (args = defaultParams) => {
  const params = { ...defaultParams, ...args };
  return {
    target: { value: params.value },
    currentTarget: {},
    keyCode: params.keyCode,
    preventDefault: params.preventDefault,
    stopPropagation: params.stopPropagation,
  };
};

it('should export mocked event', () => {
  expect(getMockedEvent()).not.toBeFalsy();
});

export default getMockedEvent;
