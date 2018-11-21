import { Reducer } from 'redux-testkit';
import fbPhotoUpload from '../../modal/fbPhotoUpload';
import factory from './utils/fbPhotoUploadStates';
import types from '../../../action_types';

describe('reducer fbPhotoUpload', () => {
  const action = {};
  const modal = '';
  action.type = '';
  action.payload = {
    type: 'fbPhotoUpload',
    uid: '',
    source: 'modal/fbPhotoUpload',
    modal: 'fbPhotoUpload',
  };
  it('Should generate default state on no action', () => {
    const state = Reducer(fbPhotoUpload).execute({});
    expect(state).toEqual(factory.initialState);
  });

  it('Should generate default state on MODAL_SHOW action type but wrong modal name', () => {
    const type = types.MODAL_SHOW;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            modal,
          },
        },
      },
    });
    expect(state).toEqual(factory.initialState);
  });

  it('Should generate modalShow state on MODAL_SHOW action type', () => {
    const type = types.MODAL_SHOW;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
      },
    });
    expect(state).toEqual(factory.modalShow);
  });

  describe('facebook alum photo request action', () => {
    it('without payload type', () => {
      const type = types.FACEBOOK_ALBUM_PHOTO_REQUEST;
      const state = Reducer(fbPhotoUpload).execute({
        ...action,
        ...{
          type,
          payload: {
            ...action.payload,
            ...{
              type: '',
            },
          },
        },
      });
      expect(state).toEqual(factory.initialState);
    });

    describe('with payload type', () => {
      it('type fbPhotoUpload', () => {
        const type = types.FACEBOOK_ALBUM_PHOTO_REQUEST;
        const state = Reducer(fbPhotoUpload).execute({
          ...action,
          ...{
            type,
            payload: {
              ...action.payload,
              ...{
                albums: [],
                uid: null,
                type: 'fbPhotoUpload',
              },
            },
          },
        });
        const expectedState = factory.initialState;
        expect(state).toEqual({
          ...expectedState,
          ...{
            source: 'modal/fbPhotoUpload',
          },
        });
      });

      it('type fbPhotoUploadSubmit', () => {
        const type = types.FACEBOOK_ALBUM_PHOTO_REQUEST;
        const state = Reducer(fbPhotoUpload).execute({
          ...action,
          ...{
            type,
            payload: {
              ...action.payload,
              ...{
                type: 'fbPhotoUploadSubmit',
                albums: [],
                uid: null,
              },
            },
          },
        });
        const expectedState = factory.initialState;
        expect(state).toEqual({
          ...expectedState,
          ...{
            source: 'modal/fbPhotoUpload',
          },
        });
      });
    });
  });

  it('Should generate default state on FACEBOOK_ALBUM_PHOTO_SUCCESS action type with wrong payload type', () => {
    const type = types.FACEBOOK_ALBUM_PHOTO_SUCCESS;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            imageURLS: [],
            type: '',
            uid: null,
          },
        },
      },
    });
    const expectedState = factory.initialState;
    expect(state).toEqual({
      ...expectedState,
      ...{
        showLoader: true,
      },
    });
  });

  it('Should generate default state on FACEBOOK_ALBUM_PHOTO_SUCCESS action type', () => {
    const type = types.FACEBOOK_ALBUM_PHOTO_SUCCESS;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            type: 'fbPhotoUploadAlbum',
            uid: null,
          },
        },
      },
    });
    const expectedState = factory.initialState;
    expect(state).toEqual({
      ...expectedState,
      ...{
        imageURLs: undefined,
        uid: null,
        showLoader: false,
        source: 'modal/fbPhotoUpload',
      },
    });
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_SUCCESS action type with wrong payload type', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_SUCCESS;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            type: '',
          },
        },
      },
    });
    expect(state).toEqual(factory.initialState);
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_SUCCESS action type with correct payload type', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_SUCCESS;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            type: 'fbPhotoUploadSubmit',
          },
        },
      },
    });
    const expectedState = factory.initialState;
    expect(state).toEqual({
      ...expectedState,
      ...{
        redirectToAlbums: true,
        source: 'modal/fbPhotoUpload',
      },
    });
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_SUCCESS action type with wrong payload type', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_FAILED;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            type: 'fbPhotoUploadSubmit',
          },
        },
      },
    });
    expect(state).toEqual(factory.initialState);
  });

  it('Should generate default state on MODAL_HIDE action type', () => {
    const type = types.MODAL_HIDE;
    const state = Reducer(fbPhotoUpload).execute({
      ...action,
      ...{
        type,
      },
    });
    expect(state).toEqual(factory.initialState);
  });
});
