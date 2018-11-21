import React from 'react';
import { mount } from 'enzyme';
import { HtmlInputField } from '../index';

describe('HtML Component', () => {
  describe('Input Field Component', () => {
    const onChange = jest.fn();

    it('render default input field', () => {
      const wrapper = mount(<HtmlInputField type="" tonChange={onChange} />);
      expect(wrapper.find(HtmlInputField)).toHaveLength(1);
    });

    it('render default input field with no subType', () => {
      const wrapper = mount(<HtmlInputField type="input" subType="" tonChange={onChange} />);
      expect(wrapper.find(HtmlInputField)).toHaveLength(1);
    });

    it('render input file field', () => {
      const wrapper = mount(<HtmlInputField type="input" subType="file" onChange={onChange} />);
      const value = 'SH14416845';
      const target = { value };
      const event = { target };
      expect(wrapper.find('input[type="file"]').at(0)).toHaveLength(1);
      wrapper
        .find('input[type="file"]')
        .at(0)
        .simulate('change', event);
      expect(wrapper.find(HtmlInputField)).toHaveLength(1);
    });

    it('render input text field', () => {
      const wrapper = mount(<HtmlInputField type="input" subType="text" onChange={onChange} />);
      expect(wrapper.find(HtmlInputField)).toHaveLength(1);
    });

    it('render select field', () => {
      const wrapper = mount(<HtmlInputField type="select" onChange={onChange} />);
      expect(wrapper.find(HtmlInputField)).toHaveLength(1);
    });
  });
});
