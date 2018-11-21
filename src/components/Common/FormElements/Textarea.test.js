import React from 'react';
import { mount } from 'enzyme';
import Textarea from './Textarea';

describe('Textarea', () => {
  const mountedComponent = mount(<Textarea />);
  it('should have an input having typing checkbox', () => {
    expect(mountedComponent.find('textarea')).toHaveLength(1);
  });
});
