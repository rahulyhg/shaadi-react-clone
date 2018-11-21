import React from 'react';
import { mount } from 'enzyme';
import ProfilePhotoUpload from '../profilePhotoUpload';

describe('Modal ProfilePhotoUpload', () => {
  const data = {
    uid: '',
    source: '',
    attachments: {
      attachmentName: '',
      progressPercent: 0,
      showProgress: false,
      isAttachmentUploaded: false,
      isInvalidAttachment: false,
    },
    isUploadFailed: false,
    isModalClosed: false,
    redirectToAlbums: false,
    uploadingPhotoCount: 0,
  };

  const props = {
    onModalClose: () => {},
    headerAction: () => {},
    data,
  };
  const wrapper = mount(<ProfilePhotoUpload {...props} />);

  describe('click continue', () => {
    it('while upload in progress', () => {
      wrapper.setProps({
        data: {
          ...data,
          ...{
            uploadingPhotoCount: 1,
          },
        },
      });
      expect(wrapper.find('#close-photo-upload-modal').at(0)).toHaveLength(1);
      wrapper
        .find('#close-photo-upload-modal')
        .at(0)
        .simulate('click');
    });

    it('when all images upload is complete', () => {
      wrapper.setProps({
        data: {
          ...data,
          ...{
            uploadingPhotoCount: 0,
          },
        },
      });
      expect(wrapper.find('#close-photo-upload-modal').at(0)).toHaveLength(1);
      wrapper
        .find('#close-photo-upload-modal')
        .at(0)
        .simulate('click');
    });
  });

  it('redirect', () => {
    wrapper.setProps({
      data: {
        ...data,
        ...{
          redirectToAlbums: true,
          isModalClosed: true,
        },
      },
    });
    expect(wrapper.find(ProfilePhotoUpload)).toHaveLength(1);
  });
});
