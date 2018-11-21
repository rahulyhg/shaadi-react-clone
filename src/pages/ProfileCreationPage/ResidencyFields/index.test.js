import React from 'react';
import { shallow } from 'enzyme';
import ResidencyFields from './index';
import LivingSinceField from './LivingSinceField';
import GrewUpInField from './GrewUpInField';
import ResidencyStatusField from './ResidencyStatusField';

describe('Residency Fields', () => {
  const component = shallow(<ResidencyFields />);
  it('should have Living Since Field', () => {
    expect(component.find(LivingSinceField)).toHaveLength(1);
  });
  it('should have Grew Up In Field', () => {
    expect(component.find(GrewUpInField)).toHaveLength(1);
  });
  it('should have Residency Status Field', () => {
    expect(component.find(ResidencyStatusField)).toHaveLength(1);
  });
});
