import React from 'react';
import { mount } from 'enzyme';
import TextField from './index';

const mockedOnChange = jest.fn();
const mockedOnFocus = jest.fn();
const mockedOnBlur = jest.fn();

const props = {
  isVisible: false,
  canShowError: false,
  onBlur: mockedOnBlur,
  onFocus: mockedOnFocus,
  onChange: mockedOnChange,
  value: '',
  name: 'test',
  isDisabled: false,
};

describe('TextField', () => {
  const component = mount(<TextField {...props} />);
  it('life Style component should be mount', () => {
    expect(component).toHaveLength(1);
  });
  const input = component.find('input[type="text"][name="test"]');
  it('input field on focus', () => {
    input.simulate('focus');
    expect(mockedOnFocus).toHaveBeenCalled();
  });
  it('input field on change', () => {
    input.simulate('change');
    expect(mockedOnChange).toHaveBeenCalled();
  });

  it('input field on blur', () => {
    input.simulate('blur');
    expect(mockedOnBlur).toHaveBeenCalled();
  });
});
