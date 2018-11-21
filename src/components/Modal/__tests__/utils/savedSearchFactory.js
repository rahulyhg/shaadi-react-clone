const noSavedSearch = {
  savedSearchList: [],
  savedSuccess: true,
  loadinglist: false,
};

const lessThanFiveSavedSearch = {
  savedSearchList: [
    {
      id: 3879691,
      name: 'test',
      frequency: 'never',
    },
  ],
  savedSuccess: true,
  loadinglist: false,
};

const fiveSavedSearch = {
  savedSearchList: [
    {
      id: 3879691,
      name: 'test',
      frequency: 'daily',
    },
    {
      id: 3879691,
      name: 'test2',
      frequency: 'daily',
    },
    {
      id: 3879691,
      name: 'test3',
      frequency: 'daily',
    },
    {
      id: 3879691,
      name: 'test4',
      frequency: 'daily',
    },
    {
      id: 3879691,
      name: 'test5',
      frequency: 'never',
    },
  ],
  savedSuccess: true,
  loadinglist: false,
};

const factory = { noSavedSearch, lessThanFiveSavedSearch, fiveSavedSearch };

it('should export profiles and props', () => {
  expect(factory.noSavedSearch).not.toBeFalsy();
  expect(factory.lessThanFiveSavedSearch).not.toBeFalsy();
  expect(factory.fiveSavedSearch).not.toBeFalsy();
});

export default factory;
