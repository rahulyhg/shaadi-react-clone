import React from 'react';
import { mount } from 'enzyme';
import FbPhotoUpload from '../fbPhotoUpload';

describe('Modal FbPhotoUpload', () => {
  const data = {
    existingPhotoCount: 0,
    showLoader: true,
    redirectToAlbums: false,
    uid: '',
    name: '',
    imageURLs: [''],
    albums: [
      {
        count: 1,
        id: 'profile-photo',
        name: 'Profile Photo',
        selected: true,
      },
      {
        count: 1,
        id: 'album-1',
        name: '',
        selected: false,
      },
    ],
  };
  const props = {
    onModalClose: () => {},
    headerAction: () => {},
    data,
  };
  const FbPhotoUploadComponent = mount(<FbPhotoUpload {...props} />);

  it('render test with componentWillReceiveProps having no albums', () => {
    FbPhotoUploadComponent.setProps(props);
    expect(FbPhotoUploadComponent.find(FbPhotoUpload)).toHaveLength(1);
  });

  it('close', () => {
    expect(FbPhotoUploadComponent.find('#close-import-from-facebook-modal').at(0)).toHaveLength(1);
    FbPhotoUploadComponent.find('#close-import-from-facebook-modal')
      .at(0)
      .simulate('click');
  });

  it('render test with componentWillReceiveProps having albums', () => {
    const albums = [
      {
        count: 1,
        id: 'profile-photo',
        name: 'Profile Photo',
        selected: true,
      },
    ];
    FbPhotoUploadComponent.setProps({
      data: {
        ...data,
        ...{
          albums,
        },
      },
    });
    expect(FbPhotoUploadComponent.find('.fb-albums').at(0)).toHaveLength(1);
    FbPhotoUploadComponent.find('.fb-albums')
      .at(0)
      .simulate('click');
  });

  describe('having album images urls', () => {
    const imageURLs = ['http://facebook.com/image-1', 'http://facebook.com/image-2'];
    const showLoader = false;
    FbPhotoUploadComponent.setProps({
      data: {
        ...data,
        ...{
          showLoader,
          imageURLs,
        },
      },
    });

    it('render test with componentWillReceiveProps having image urls', () => {
      expect(FbPhotoUploadComponent.find(FbPhotoUpload)).toHaveLength(1);
    });

    it('select image 1 when 19 images are already present', () => {
      FbPhotoUploadComponent.setProps({
        data: {
          ...data,
          ...{
            showLoader,
            imageURLs,
          },
        },
      });
      expect(FbPhotoUploadComponent.find('.fb-img-wrap').at(0)).toHaveLength(1);
      FbPhotoUploadComponent.find('.fb-img-wrap')
        .at(0)
        .simulate('click');
    });

    it('select image 2 when 19 images are already present', () => {
      FbPhotoUploadComponent.setState({
        selectedImagesCount: 1,
      });
      FbPhotoUploadComponent.setProps({
        data: {
          ...data,
          ...{
            showLoader,
            imageURLs,
            existingPhotoCount: 19,
          },
        },
      });
      expect(FbPhotoUploadComponent.find('.fb-img-wrap').at(1)).toHaveLength(1);
      FbPhotoUploadComponent.find('.fb-img-wrap')
        .at(1)
        .simulate('click');
    });

    it('import photos from facebook with image selection', () => {
      FbPhotoUploadComponent.setState({
        images: [
          {
            selected: true,
            url: 'https://www.facebook.com/image-1',
          },
        ],
      });
      expect(FbPhotoUploadComponent.find('#import-photos-from-facebook').at(0)).toHaveLength(1);
      FbPhotoUploadComponent.find('#import-photos-from-facebook')
        .at(0)
        .simulate('click');
    });

    it('unselect image 1', () => {
      expect(FbPhotoUploadComponent.find('.fb-img-wrap').at(0)).toHaveLength(1);
      FbPhotoUploadComponent.find('.fb-img-wrap')
        .at(0)
        .simulate('click');
    });
  });

  it('render test with componentWillReceiveProps redirectToAlbums', () => {
    const redirectToAlbums = true;
    FbPhotoUploadComponent.setProps({
      data: {
        ...data,
        ...{
          redirectToAlbums,
        },
      },
    });
    expect(FbPhotoUploadComponent.find(FbPhotoUpload)).toHaveLength(1);
  });

  it('import photos from facebook with no image selection', () => {
    expect(FbPhotoUploadComponent.find('#import-photos-from-facebook').at(0)).toHaveLength(1);
    FbPhotoUploadComponent.find('#import-photos-from-facebook')
      .at(0)
      .simulate('click');
  });
});
