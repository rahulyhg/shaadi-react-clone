import React from 'react';
import { mount } from 'enzyme';
import SimpleMessage from '../simpleMessage';

describe('Modal PhotoGuidelines', () => {
  const onAction = jest.fn();
  const wrapper = mount(
    <SimpleMessage
      onModalClose={onAction}
      data={{
        content: 'Some Content',
        title: 'Some Tile',
      }}
    />,
  );

  it('renders', () => {
    expect(wrapper.find(SimpleMessage)).toHaveLength(1);
  });

  it('has close button', () => {
    expect(wrapper.find('#close-simple-message-modal').at(0)).toHaveLength(1);
  });

  it('close', () => {
    expect(wrapper.find('#close-simple-message-modal').at(0)).toHaveLength(1);
    wrapper
      .find('#close-simple-message-modal')
      .at(0)
      .simulate('click');
  });
});
