import React from 'react';
import { mount } from 'enzyme';
import MultiLingual from '../index';

describe('Select language page', () => {
  const props = {
    doMemberAction() {},
    goBack() {},
    appLanguage: '',
  };
  const component = mount(<MultiLingual {...props} />);
  xit('should mount the component', () => {
    expect(component.exists()).toBeTruthy();
  });
});
