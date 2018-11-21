import React from 'react';
import { shallow } from 'enzyme';
import DetailsFieldSet from './DetailsFieldSet';
import DescriptionField from './DescriptionField';
import PhysicalDisabilityField from './PhysicalDisabilityField';
import MobileNumberFields from './MobileNumberFields';

describe('Profile Creation Step (4) Details ', () => {
  const component = shallow(<DetailsFieldSet />);
  it('should have Description field', () => {
    expect(component.find(DescriptionField)).toHaveLength(1);
  });
  it('should have Physical Disability field', () => {
    expect(component.find(PhysicalDisabilityField)).toHaveLength(1);
  });
  it('should have Mobile Number Fields', () => {
    expect(component.find(MobileNumberFields)).toHaveLength(1);
  });
});
