import { Reducer } from 'redux-testkit';
import profilePhotoUpload from '../../modal/profilePhotoUpload';
import factory from './utils/profilePhotoUploadStates';
import types from '../../../action_types';

describe('reducer profilePhotoUpload', () => {
  const action = {};
  const modal = '';
  action.type = '';
  action.payload = {
    type: 'profilePhotoUpload',
    uid: '',
    source: 'modal/profilePhotoUpload',
    modal: 'profilePhotoUpload',
  };
  const attachmentName = 'test.png';
  const attachments = {
    attachmentName,
    progressPercent: 100,
    showProgress: false,
    isAttachmentUploaded: true,
    isInvalidAttachment: false,
  };
  const error = {
    response: {
      data: {
        message: 'Something went wrong!',
      },
      status: 400,
    },
  };

  it('Should generate default state on no action', () => {
    const state = Reducer(profilePhotoUpload).execute({});
    expect(state).toEqual(factory.initialState);
  });

  it('Should generate default state on MODAL_SHOW action type but wrong modal name', () => {
    const type = types.MODAL_SHOW;
    const state = Reducer(profilePhotoUpload).execute({
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
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
      },
    });
    expect(state).toEqual(factory.modalShow);
  });

  it('Should generate default state on ATTACHMENT_UPLOAD_REQUEST action type without payload type', () => {
    const type = types.ATTACHMENT_UPLOAD_REQUEST;
    const state = Reducer(profilePhotoUpload).execute({
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

  it('Should generate default state on ATTACHMENT_UPLOAD_REQUEST action type with attachments', () => {
    const type = types.ATTACHMENT_UPLOAD_REQUEST;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            attachmentName,
            attachments,
          },
        },
      },
    });
    expect(state).toEqual(factory.fileUploadRequest);
  });

  it('Should generate default state on ATTACHMENT_UPLOAD_PROGRESS action type with wrong payload type', () => {
    const type = types.ATTACHMENT_UPLOAD_PROGRESS;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          type: '',
        },
      },
    });
    expect(state).toEqual(factory.initialState);
  });

  it('Should generate default state on ATTACHMENT_UPLOAD_PROGRESS action type with attachments', () => {
    const type = types.ATTACHMENT_UPLOAD_PROGRESS;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            attachmentName,
            attachments,
          },
        },
      },
    });
    expect(state).toEqual(factory.fileUploadInProgress);
  });

  it('Should generate default state on ATTACHMENT_UPLOAD_SUCCESS action type with wrong payload type', () => {
    const type = types.ATTACHMENT_UPLOAD_SUCCESS;
    const state = Reducer(profilePhotoUpload).execute({
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

  it('Should generate default state on ATTACHMENT_UPLOAD_SUCCESS action type', () => {
    const type = types.ATTACHMENT_UPLOAD_SUCCESS;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            attachments,
            attachmentName,
          },
        },
      },
    });
    expect(state).toEqual(factory.fileUploadSuccess);
  });

  it('Should generate default state on ATTACHMENT_UPLOAD_ERROR action type with wrong payload type name', () => {
    const type = types.ATTACHMENT_UPLOAD_ERROR;
    const state = Reducer(profilePhotoUpload).execute({
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

  it('Should generate default state on ATTACHMENT_UPLOAD_ERROR action type', () => {
    const type = types.ATTACHMENT_UPLOAD_ERROR;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            error,
            attachments,
            attachmentName,
          },
        },
      },
    });
    expect(state).toEqual(factory.fileUploadFailed);
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_SUCCESS action type with wrong payload type', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_SUCCESS;
    const state = Reducer(profilePhotoUpload).execute({
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

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_SUCCESS action type with correct modal', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_SUCCESS;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
      },
    });
    expect(state).toEqual(factory.photoSavedSuccessfully);
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_FAILED action type with wrong payload type', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_FAILED;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            type: '',
            error,
          },
        },
      },
    });
    expect(state).toEqual(factory.initialState);
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_FAILED action type with no status or no attachmentName', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_FAILED;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            error,
            attachmentName: '',
          },
        },
      },
    });
    const expectedState = factory.initialState;
    expect(state).toEqual({
      ...expectedState,
      ...{
        isUploadFailed: true,
        uploadingPhotoCount: -1,
      },
    });
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_FAILED action type', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_FAILED;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        payload: {
          ...action.payload,
          ...{
            error,
            attachments,
            attachmentName,
          },
        },
      },
    });
    expect(state).toEqual(factory.photoSaveFailed);
  });

  it('Should generate default state on PROFILE_PHOTO_UPLOAD_MODAL_CLOSE action type', () => {
    const type = types.PROFILE_PHOTO_UPLOAD_MODAL_CLOSE;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
        error,
      },
    });
    expect(state).toEqual(factory.modalClose);
  });

  it('Should generate default state on MODAL_HIDE action type', () => {
    const type = types.MODAL_HIDE;
    const state = Reducer(profilePhotoUpload).execute({
      ...action,
      ...{
        type,
      },
    });
    expect(state).toEqual(factory.initialState);
  });
});
