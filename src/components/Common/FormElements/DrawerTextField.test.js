import React from 'react';
import { shallow } from 'enzyme';
import DrawerTextField from './DrawerTextField';
import TextField from './TextField';

describe('text field', () => {
  const shallowedComponent = shallow(<DrawerTextField />);
  it('should have a text field', () => {
    expect(shallowedComponent.find(TextField).exists()).toBeTruthy();
  });
  it('should not have underline border', () => {
    expect(shallowedComponent.find(TextField).props().InputProps.disableUnderline).toBeTruthy();
  });
  it('should not have label', () => {
    expect(shallowedComponent.find(TextField).props().label).toEqual('');
  });
  it('should not be able to show error state', () => {
    expect(shallowedComponent.find(TextField).props().canShowError).toBeFalsy();
  });
});
