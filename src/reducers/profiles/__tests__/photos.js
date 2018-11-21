import { Reducer } from 'redux-testkit';
import photosReducer from '../photos';
import factory from './utils/factory';
import types from '../../../action_types';

describe('photos', () => {
  it('return default state no action', () => {
    const state = Reducer(photosReducer).execute();
    expect(state).toMatchObject(factory.photoState.default);
  });

  /* it('return correct state on SESSION_SUCCESS', () => {
    const action = factory.getPhotoAction({ type: types.SESSION_SUCCESS });
    const state = Reducer(photosReducer).execute({ ...action, payload: { data: null } });
    expect(state).toMatchObject(factory.photoState.default);
  }); */

  it('return correct state on get photos having no payload', () => {
    const action = factory.getPhotoAction();
    const state = Reducer(photosReducer).execute({ type: action.type });
    expect(state).toMatchObject(factory.photoState.default);
  });

  it('return correct state on get photos if photos array is incorrect', () => {
    const action = factory.getPhotoAction();
    const state = Reducer(photosReducer).execute({ ...action, payload: { data: null } });
    expect(state).toMatchObject(factory.photoState.default);
  });

  it('return correct state on get photos if photos array is incorrect', () => {
    const action = factory.getPhotoAction();
    const state = Reducer(photosReducer).execute({ ...action, payload: { photos: null } });
    expect(state).toMatchObject(factory.photoState.default);
  });

  it('return correct state on successfull api call having no photos', () => {
    const action = factory.getPhotoAction({
      photos: [],
      status: 'add_photo',
    });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject(factory.photoState.hasNoPhotos);
  });

  it('return correct state on successfull api call having one photo which is under screening', () => {
    const action = factory.getPhotoAction({
      nonRejectedPhotosCnt: 1,
      count: 1,
      photos: [
        {
          status: 'P',
          photo_order: 0,
          profile_photo: true,
          domain_name: 'https://img2.shaadi.com',
          medium: '/imgs/profiles/150-photo-coming-soon-m.gif',
          '150X200': '/imgs/profiles/150-photo-coming-soon-m.gif',
          '250X310': '/imgs/profiles/250-photo-coming-soon-m.gif',
        },
      ],
      status: 'coming_soon',
    });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject(factory.photoState.hasNoScreenedPhotos);
  });

  it('return correct state on successfull api call having one photo which is screened and approved', () => {
    const action = factory.getPhotoAction({
      nonRejectedPhotosCnt: 1,
      count: 1,
      photos: [
        {
          status: 'Y',
          photo_order: 0,
          profile_photo: true,
          domain_name: 'https://img1.shaadi.com',
          medium: '/2018/01/03/7SH52689034-263593-Male.jpg',
          '150X200': '/2018/01/03/7SH52689034-263593-Male.webp',
          '250X310': '/2018/01/03/7SH52689034-71303b-male.webp',
        },
      ],
      status: 'show_photo',
    });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject(factory.photoState.hasPhotos);
  });

  it('return correct state on successfull api call having under screening, rejected and approved photos', () => {
    const action = factory.getPhotoAction({
      status: 'show_photo',
      count: 5,
      nonRejectedPhotosCnt: 5,
      hasRejectedPhotos: true,
      photos: factory.photoState.hasAllKindsOfPhotos.items,
    });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject(factory.photoState.hasAllKindsOfPhotos);
  });

  it('when data not present in payload', () => {
    const action = factory.getPhotoAction({});
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject(factory.photoState.getPhotoApiIssue);
  });
  it('on action type GET_REJECTED_ALBUM_PHOTOS_SUCCESS having incorrect payload state check', () => {
    const action = factory.getPhotoAction({ type: types.GET_REJECTED_ALBUM_PHOTOS_SUCCESS });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isRejectedPhotosFetched: true });
  });
  it('on action type GET_REJECTED_ALBUM_PHOTOS_SUCCESS having correct payload state check', () => {
    const action = factory.getPhotoAction({ type: types.GET_REJECTED_ALBUM_PHOTOS_SUCCESS });
    const state = Reducer(photosReducer).execute({ ...action, payload: { data: [] } });
    expect(state).toMatchObject({ ...factory.photoState.default, isRejectedPhotosFetched: true });
  });
  it('on action type GET_REJECTED_ALBUM_PHOTOS_FAIL state check', () => {
    const action = factory.getPhotoAction({ type: types.GET_REJECTED_ALBUM_PHOTOS_FAIL });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isRejectedPhotosFetched: true });
  });
  it('on action type DELETE_PHOTO_SUCCESS state check', () => {
    const action = factory.getPhotoAction({ type: types.DELETE_PHOTO_SUCCESS });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type UPDATE_PHOTO_SUCCESS state check', () => {
    const action = factory.getPhotoAction({ type: types.UPDATE_PHOTO_SUCCESS });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type GET_REJECTED_ALBUM_PHOTOS_REQUEST state check', () => {
    const action = factory.getPhotoAction({ type: types.GET_REJECTED_ALBUM_PHOTOS_REQUEST });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type GET_PROFILE_PHOTOS_REQUEST state check', () => {
    const action = factory.getPhotoAction({ type: types.GET_PROFILE_PHOTOS_REQUEST });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type DELETE_PHOTO_REQUEST state check', () => {
    const action = factory.getPhotoAction({ type: types.DELETE_PHOTO_REQUEST });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type UPDATE_PHOTO_REQUEST state check', () => {
    const action = factory.getPhotoAction({ type: types.UPDATE_PHOTO_REQUEST });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type GET_PROFILE_PHOTOS_FAIL state check', () => {
    const action = factory.getPhotoAction({ type: types.GET_PROFILE_PHOTOS_FAIL });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type DELETE_PHOTO_FAIL state check', () => {
    const action = factory.getPhotoAction({ type: types.DELETE_PHOTO_FAIL });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
  it('on action type UPDATE_PHOTO_FAIL state check', () => {
    const action = factory.getPhotoAction({ type: types.UPDATE_PHOTO_FAIL });
    const state = Reducer(photosReducer).execute(action);
    expect(state).toMatchObject({ ...factory.photoState.default, isDefault: false });
  });
});
