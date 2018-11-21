import React from 'react';
import { mount } from 'enzyme';
import PhotoGuidelines from '../photoGuidelines';

describe('Modal PhotoGuidelines', () => {
  const onAction = jest.fn();

  it('of male', () => {
    const wrapper = mount(<PhotoGuidelines onModalClose={onAction} gender="male" />);
    expect(wrapper.find(PhotoGuidelines)).toHaveLength(1);
  });

  it('of female', () => {
    const wrapper = mount(<PhotoGuidelines onModalClose={onAction} gender="female" />);
    expect(wrapper.find(PhotoGuidelines)).toHaveLength(1);
  });

  it('close', () => {
    const wrapper = mount(<PhotoGuidelines onModalClose={onAction} gender="female" />);
    expect(wrapper.find('#close-photo-guidelines-modal').at(0)).toHaveLength(1);
    wrapper
      .find('#close-photo-guidelines-modal')
      .at(0)
      .simulate('click');
  });
});
