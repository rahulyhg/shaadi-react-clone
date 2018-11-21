import React from 'react';
import { shallow } from 'enzyme';
import MaritalFields from './index';
import MaritalStatusField from './MaritalStatusField';
import HaveChildrenField from './HaveChildrenField';
import NoOfChildrenField from './NoOfChildrenField';

describe('Residency Fields', () => {
  const component = shallow(<MaritalFields />);
  it('should have Living Since Field', () => {
    expect(component.find(MaritalStatusField)).toHaveLength(1);
  });
  it('should have Grew Up In Field', () => {
    expect(component.find(HaveChildrenField)).toHaveLength(1);
  });
  it('should have Residency Status Field', () => {
    expect(component.find(NoOfChildrenField)).toHaveLength(1);
  });
});
