// @author: Anush Shukla
import { Reducer } from 'redux-testkit';
import nav from '../../nav';
import types from '../../../action_types';

describe('reducer nav', () => {
  it('should have 4 top level menus', () => {
    const state = nav(undefined, []);
    expect(state.length).toEqual(4);
  });

  describe('matches', () => {
    const state = Reducer(nav).execute({})[1];
    const expectedState = {
      count: 0,
      isActive: false,
      isExternal: false,
      key: 'matches',
      label: 'Matches',
      path: '/profile/daily-recommendations',
      url: '/profile/daily-recommendations?loc=top-nav&cltrk=y',
    };
    expect(state).toMatchObject(expectedState);
  });

  describe('My Shaadi Menu', () => {
    describe('Other SubMenus', () => {
      let state = Reducer(nav).execute();
      it('check state', () => {
        state = Reducer(nav).execute({
          type: types.ROUTE_CHANGE,
        })[0];
        // console.log('===========', state);
        expect(state).toMatchObject(state);
      });
      it('check state', () => {
        state = Reducer(nav).execute({
          type: types.EVT_REF,
        })[0];
        // console.log('===========', state);
        expect(state).toMatchObject(state);
      });
      it('check state', () => {
        state = Reducer(nav).execute({
          type: types.COUNTS_CACHE,
        })[0];
        // console.log('===========', state);
        expect(state).toMatchObject(state);
      });
      it('check state', () => {
        state = Reducer(nav).execute({
          type: types.COUNTS_SUCCESS,
        })[0];
        // console.log('===========', state);
        expect(state).toMatchObject(state);
      });
      it('check state', () => {
        expect(state).toMatchObject(state);
      });
    });
    describe('My Photos SubMenu', () => {
      const expectedMyPhotosSubNavState = {
        key: 'myPhotos',
        label: 'My Photos',
        path: '/my-shaadi/photo',
        url: '/my-shaadi/photo',
        otherPaths: ['/my-shaadi/photo'],
        isExternal: false,
        isActive: false,
        count: 0,
      };
      it('initial state', () => {
        const myShaadiMenuState = Reducer(nav).execute({})[0];
        const myPhotosSubNavState = myShaadiMenuState.nav[2];
        expect(myPhotosSubNavState).toMatchObject(expectedMyPhotosSubNavState);
      });

      describe('get photos api response', () => {
        it('incorrect', () => {
          const myShaadiMenuState = Reducer(nav).execute({
            type: types.GET_PROFILE_PHOTOS_SUCCESS,
          })[0];
          const myPhotosSubNavState = myShaadiMenuState.nav[2];
          expect(myPhotosSubNavState).toMatchObject({ ...expectedMyPhotosSubNavState, label: 'Add Photos' });
        });
        describe('correct', () => {
          it('has no photos', () => {
            const myShaadiMenuState = Reducer(nav).execute({
              type: types.GET_PROFILE_PHOTOS_SUCCESS,
              payload: {
                data: {
                  count: 0,
                },
              },
            })[0];
            const myPhotosSubNavState = myShaadiMenuState.nav[2];
            expect(myPhotosSubNavState).toMatchObject({ ...expectedMyPhotosSubNavState, label: 'Add Photos' });
          });
          it('has no photos', () => {
            const myShaadiMenuState = Reducer(nav).execute({
              type: types.GET_PROFILE_PHOTOS_SUCCESS,
              payload: {
                data: {
                  count: 1,
                },
              },
            })[0];
            const myPhotosSubNavState = myShaadiMenuState.nav[2];
            expect(myPhotosSubNavState).toMatchObject(expectedMyPhotosSubNavState);
          });
        });
      });
    });

    describe('My Photos SubMenu', () => {
      const expectedMyAstroSubNavState = {
        key: 'astroDetails',
        label: 'Edit Horoscope Details',
        path: '/my-shaadi/astro',
        url: '/my-shaadi/astro',
        otherPaths: [],
        isExternal: true,
        isActive: false,
        count: 0,
      };
      it('initial state', () => {
        const myShaadiMenuState = Reducer(nav).execute({})[0];
        const myAstroSubNavState = myShaadiMenuState.nav[6];
        expect(myAstroSubNavState).toMatchObject(expectedMyAstroSubNavState);
      });
      describe('get astros api response', () => {
        it('incorrect', () => {
          const myShaadiMenuState = Reducer(nav).execute({
            type: types.GET_PROFILE_ASTRO_SUCCESS,
          })[0];
          const myAstroSubNavState = myShaadiMenuState.nav[6];
          expect(myAstroSubNavState).toMatchObject({ ...expectedMyAstroSubNavState, label: 'Add Horoscope Details' });
        });
        describe('correct', () => {
          it('has no astro chart', () => {
            const myShaadiMenuState = Reducer(nav).execute({
              type: types.GET_PROFILE_ASTRO_SUCCESS,
              payload: {
                data: {
                  chart: null,
                },
              },
            })[0];
            const myAstroSubNavState = myShaadiMenuState.nav[6];
            expect(myAstroSubNavState).toMatchObject({ ...expectedMyAstroSubNavState, label: 'Add Horoscope Details' });
          });
          it('has astro chart', () => {
            const myShaadiMenuState = Reducer(nav).execute({
              type: types.GET_PROFILE_ASTRO_SUCCESS,
              payload: {
                data: {
                  chart: 'something',
                },
              },
            })[0];
            const myAstroSubNavState = myShaadiMenuState.nav[6];
            expect(myAstroSubNavState).toMatchObject(expectedMyAstroSubNavState);
          });
        });
      });
    });
  });
});
