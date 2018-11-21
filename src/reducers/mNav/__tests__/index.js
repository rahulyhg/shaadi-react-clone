import { Reducer } from 'redux-testkit';
import nav from '../../nav';

describe('reducer nav', () => {
  it('should have 4 top level menus', () => {
    const state = nav(undefined, []);
    expect(state.length).toEqual(4);
  });

  describe('should have matches menu', () => {
    const state = Reducer(nav).execute({})[1];
    const matchesNav = state.nav[1];
    const expectedState = {
      count: 0,
      isActive: false,
      isExternal: false,
      key: 'recommendations',
      label: 'Recommendations',
      path: '/profile/daily-recommendations',
      url: '/profile/daily-recommendations?loc=top-nav&from=menu',
    };
    it('should have recommendations sub-menu', () => {
      expect(matchesNav).toMatchObject(expectedState);
    });
  });

  describe('should have my-shaadi menu', () => {
    const state = Reducer(nav).execute({})[0];
    const myPhotosNav = state.nav[2];
    const expectedState = {
      key: 'myPhotos',
      label: 'My Photos',
      path: '/my-shaadi/photo',
      url: '/my-shaadi/photo',
      otherPaths: ['/my-shaadi/photo'],
      isExternal: false,
      isActive: false,
      count: 0,
    };
    it('should have my photos sub-menu', () => {
      expect(myPhotosNav).toMatchObject(expectedState);
    });
  });
});
