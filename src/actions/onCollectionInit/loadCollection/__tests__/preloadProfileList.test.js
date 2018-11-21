/* eslint-disable prettier/prettier */

import merge from 'lodash/merge';

import { stubRoute } from '../../../../helpers/testHelpers';
import types from '../../../../action_types';
import preloadProfileList, { shouldPrefetch, prefetchProfiles } from '../preloadProfileList';

const newProfile = () => ({
  uid: `${Math.random() > .5 ? 'w': 'M'}SH${`${Math.random()}`.slice(2, 10)}`,
});

const generateProfiles = n =>
  Array(n).fill(null)
    .map(newProfile)
    .reduce((acc, p) => ({ ...acc, [p.uid]: p }), {});

const getState = (extend = {}) => () => merge({
  config: { app: { webp: '' } },
  metadata: {},
  profiles: {
    self: { uid: 'selfid', gender: 'M' },
    hello_world: { uid: 'hello_world', detailed: { ready: true } },
    hello_world1: { uid: 'hello_world1', detailed: { ready: true } },
    hello_world2: { uid: 'hello_world2' },
    hello_world3: { uid: 'hello_world3' },
    hello_world4: { uid: 'hello_world4' },
    hello_world5: { uid: 'hello_world5' },
  },
  profilePage: {
    collection: {
      uids: [ 'hello_world', 'hello_world1', 'hello_world2', 'hello_world3' ],
    },
  },
}, extend);

describe('action:preloadProfileList', () => {

  describe('shouldPrefetch', () => {

    let uids = [];
    const getUid = index => uids[index];

    it('should return true for third last index', () => {
      uids = Object.keys(generateProfiles(10));
      expect(shouldPrefetch(getUid(6), uids)).toBe(true);

      uids = Object.keys(generateProfiles(26));
      expect(shouldPrefetch(getUid(22), uids)).toBe(true);
    });

    it('should return false for last profile', () => {
      uids = Object.keys(generateProfiles(10));
      expect(shouldPrefetch(getUid(9), uids)).toBe(false);

      uids = Object.keys(generateProfiles(26));
      expect(shouldPrefetch(getUid(25), uids)).toBe(false);
    });

    it('should return true for last profile if render options was passed', () => {
      uids = Object.keys(generateProfiles(10));
      expect(shouldPrefetch(getUid(9), uids, { render: true })).toBe(true);

      uids = Object.keys(generateProfiles(26));
      expect(shouldPrefetch(getUid(25), uids, { render: true })).toBe(true);
    });

    it('should return false for any other profile', () => {
      uids = Object.keys(generateProfiles(5));
      expect(shouldPrefetch(getUid(0), uids)).toBe(false);
      expect(shouldPrefetch(getUid(2), uids)).toBe(false);
      expect(shouldPrefetch(getUid(3), uids)).toBe(false);
    });
  });

  describe('prefetchProfiles', () => {

    let route = null;

    beforeEach(() => {
      route = stubRoute('/profiles/list');
    });

    it('should call call the controller to fetch the required profiles', done => {

      route.onRequest(() => Promise.resolve({ data: { profiles: [] } }));

      const profileids = [ '2rqws', 'ewesrfsds', 'q3rwfscx' ];

      const dispatch = ({ type, payload }) => {
        switch(type) {
          case types.PROFILES_BACKGROUND_REQUEST:
            return expect(payload.profileids).toEqual(profileids);
          case types.PROFILES_BACKGROUND_SUCCESS:
            return done();
          default:
            return undefined;
        }
      };

      prefetchProfiles(profileids, { dispatch, getState: getState() });
    });
  });

  describe('preloadProfileList', () => {

    let route = null;

    beforeEach(() => {
      route = stubRoute('/profiles/list');
    });

    it('should only fetch the profiles that are not ready for display', done => {

      route.onRequest(() => Promise.resolve({ data: { profiles: [] } }));

      const uid = 'hello_world2';

      const dispatch = ({ type, payload }) => {
        switch(type) {
          case types.PROFILES_BACKGROUND_REQUEST:
            return expect(payload.profileids).toEqual([ 'hello_world2', 'hello_world3' ]);
          case types.PROFILES_BACKGROUND_SUCCESS:
            return done();
          default:
            return undefined;
        }
      };

      preloadProfileList(uid, { dispatch, getState: getState({
        profilePage: {
          collection: {
            uids: [ 'hello_world4', 'hello_world5' ],
          },
        },
      }) });
    });

    it('should fetch the profiles and render them only if render flag is set', done => {

      route.onRequest(() => Promise.resolve({ data: { profiles: [] } }));

      const uid = 'hello_world5';

      const dispatch = ({ type, payload }) => {
        switch(type) {
          case types.PROFILE_LIST_REQUEST:
            return expect(payload.profileids).toEqual([ 'hello_world2', 'hello_world3' ]);
          case types.PROFILE_LIST_SUCCESS:
            return done();
          default:
            return undefined;
        }
      };

      preloadProfileList(uid, {
        render: true,
        dispatch,
        getState: getState({
          profilePage: {
            collection: {
              uids: [ 'hello_world4', 'hello_world5' ],
            },
          },
        })
      });
    });

    it('should only fetch the profiles that are not ready for display', done => {

      route.onRequest(() => Promise.resolve({ data: { profiles: [] } }));

      const uid = 'hello_world';
      const myGetState = getState({
        profiles: {
          hello_world2: { detailed: { ready: true } },
        },
      });

      const dispatch = () => done('Dispatch shouldnt have been called');

      preloadProfileList(uid, { dispatch, getState: myGetState });
      done();
    });
  });
});
