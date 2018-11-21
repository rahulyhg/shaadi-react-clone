import React from 'react';
import { mount } from 'enzyme';
import DeletePhotoConfirmation from '../deletePhotoConfirmation';

describe('Modal DeletePhotoConfirmation', () => {
  const onModalClose = jest.fn();
  const photo = {};
  const index = 0;
  const onDelete = jest.fn();
  const data = {
    photo,
    index,
    onDelete,
  };
  const props = {
    onModalClose,
    data,
  };

  it('delete DeletePhotoConfirmation modal', () => {
    const wrapper = mount(<DeletePhotoConfirmation {...props} />);
    expect(wrapper.find('#delete-photo').at(0)).toHaveLength(1);
    wrapper
      .find('#delete-photo')
      .at(0)
      .simulate('click');
  });

  it('close DeletePhotoConfirmation modal', () => {
    const wrapper = mount(<DeletePhotoConfirmation {...props} />);
    expect(wrapper.find('#close-delete-photo-confirmation-modal').at(0)).toHaveLength(1);
    wrapper
      .find('#close-delete-photo-confirmation-modal')
      .at(0)
      .simulate('click');
  });
});
