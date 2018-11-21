import { Reducer } from 'redux-testkit';
import profileReducer from '../profile';
import factory from './utils/factory';
import types from '../../../action_types';

describe('reducer profile', () => {
  describe('photos', () => {
    it('return default state no action', () => {
      const state = Reducer(profileReducer).execute({});
      expect(factory.profile.initialState).toMatchObject(state);
    });

    describe('on session cache', () => {
      it('having no payload', () => {
        const state = Reducer(profileReducer).execute({
          type: types.SESSION_CACHE,
        });
        expect(factory.profile.initialState).toMatchObject(state);
      });
      it('having photos payload', () => {
        const state = Reducer(profileReducer).execute({
          type: types.SESSION_CACHE,
          payload: {
            data: {
              phots: [],
              count: 0,
            },
          },
        });
        expect(state).toMatchObject(state);
      });
    });

    describe('on session success', () => {
      it('having no payload', () => {
        const state = Reducer(profileReducer).execute({
          type: types.SESSION_SUCCESS,
        });
        expect(factory.profile.initialState).toMatchObject(state);
      });
      it('having photos payload', () => {
        const state = Reducer(profileReducer).execute({
          type: types.SESSION_CACHE,
          payload: {
            data: {
              phots: [],
              count: 0,
            },
          },
        });
        expect(state).toMatchObject(state);
      });
    });

    /* it('return correct state on successfull api call having no photos', () => {
      const action = factory.getPhotoAction({
        count: 1,
        photos: [
          {
            domain_name: 'https://img2.shaadi.com',
            small: '/imgs/my-shaadi/ver2/60-add-ph-female-v2.gif',
            medium: '/imgs/profile/photoclicktoupload.gif',
            semilarge: '/imgs/my-shaadi/ver2/250-photo-not-added-f.gif',
            '40X40': '',
            '60X60': '/imgs/my-shaadi/ver2/60-add-ph-female-v2.gif',
            '120X120': '',
            '150X200': '/imgs/profile/photoclicktoupload.gif',
            '250X310': '/imgs/my-shaadi/ver2/250-photo-not-added-f.gif',
          },
        ],
        status: 'add_photo',
      });
      const state = Reducer(photosReducer).execute(action);
      expect(state).toMatchObject(factory.photoState.hasNoPhotos);
      expect(factory.photoState.hasNoPhotos).toMatchObject(state);
    });

    it('return correct state on successfull api call having one photo which is under screening', () => {
      const action = factory.getPhotoAction({
        count: 1,
        photos: [
          {
            domain_name: 'https://img2.shaadi.com',
            small: '/imgs/profiles/60-photo-coming-soon-m.gif',
            medium: '/imgs/profiles/150-photo-coming-soon-m.gif',
            semilarge: '/imgs/profiles/250-photo-coming-soon-m.gif',
            large: '/imgs/profiles/photo-400-coming-soon-m.jpg',
            status: 'P',
            photo_order: 0,
            profile_photo: true,
            '40X40': '',
            '60X60': '/imgs/profiles/60-photo-coming-soon-m.gif',
            '120X120': '',
            '150X200': '/imgs/profiles/150-photo-coming-soon-m.gif',
            '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
            '400X500': '/imgs/profiles/photo-400-coming-soon-m.jpg',
            '450X600': '',
            '750X1333': '',
          },
        ],
        status: 'coming_soon',
      });
      const state = Reducer(photosReducer).execute(action);
      expect(state).toMatchObject(factory.photoState.hasNoScreenedPhotos);
      expect(factory.photoState.hasNoScreenedPhotos).toMatchObject(state);
    });

    it('return correct state on successfull api call having one photo which is screened and approved', () => {
      const action = factory.getPhotoAction({
        count: 1,
        photos: [
          {
            domain_name: 'https://img1.shaadi.com',
            small: '/2018/01/03/7SH52689034-d6600d-male.jpg',
            medium: '/2018/01/03/7SH52689034-263593-Male.jpg',
            semilarge: '/2018/01/03/7SH52689034-71303b-male.jpg',
            large: '/2018/01/03/7SH52689034-529562-male.jpg',
            status: 'Y',
            photo_order: 0,
            profile_photo: true,
            '40X40': '/2018/01/03/7SH52689034-bb4e8c-male.webp',
            '60X60': '/2018/01/03/7SH52689034-d6600d-male.webp',
            '120X120': '/2018/01/03/7SH52689034-d820d4-male.webp',
            '150X200': '/2018/01/03/7SH52689034-263593-Male.webp',
            '250X310': '/2018/01/03/7SH52689034-71303b-male.webp',
            '400X500': '/2018/01/03/7SH52689034-529562-male.webp',
            '450X600': '/2018/01/03/7SH52689034-d8ce35-male.webp',
            '720X1006': null,
            '750X1333': '/2018/01/03/7SH52689034-e45af8-male.webp',
          },
        ],
        status: 'show_photo',
      });
      const state = Reducer(photosReducer).execute(action);
      expect(state).toMatchObject(factory.photoState.hasPhotos);
      expect(factory.photoState.hasPhotos).toMatchObject(state);
    }); */
  });
});
