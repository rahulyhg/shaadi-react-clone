import discoverMatchesGroup from '../../discoverMatchesGroup';
import factory from './utils/factory';

describe('Discover and intents groups decorator', () => {
  const decoratorData = discoverMatchesGroup(undefined, factory.searchResult);
  it('expect profiles and search types never undefined ', () => {
    expect(decoratorData.profiles).not.toBeFalsy();
    expect(decoratorData.discoverSearchType).not.toBeFalsy();
  });
});
