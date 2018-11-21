import React from 'react';
import { mount } from 'enzyme';
import Comment from '../index';

const props = {
  id: '2',
  title: 'Can you tell us what can we do better?',
  placeHolder: 'Write your feedback here',
  storeAnswers() {},
};

describe('Leave a comment test cases', () => {
  const storeAnswers = jest.fn();
  const newProps = { ...props, storeAnswers };
  const wrapper = mount(<Comment {...newProps} />);

  it('should show questions text to leave a comment', () => {
    expect(
      wrapper
        .find('div')
        .at(0)
        .text(),
    ).toContain('Can you tell us what can we do better?');
  });

  it('should have input to leave a comment', () => {
    expect(wrapper.find('TextField').exists()).toBe(true);
  });

  it('should show input placeholder text', () => {
    expect(
      wrapper
        .find('textarea')
        .at(2)
        .html(),
    ).toContain('Write your feedback here');
  });

  it('intialize `state` with blank comment', () => {
    expect(wrapper.state()).toEqual({ comment: '' });
  });

  describe('Test Comment Box typing ....', () => {
    it('should store `state` with comment when user types in the input', () => {
      const text = 'I would like to receive more near by matches';
      wrapper
        .find('textarea')
        .at(2)
        .simulate('change', { target: { value: text } });
      expect(wrapper.state()).toEqual({ comment: text });
    });
  });
});
