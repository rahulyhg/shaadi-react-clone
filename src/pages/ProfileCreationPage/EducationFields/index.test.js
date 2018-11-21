import React from 'react';
import { shallow } from 'enzyme';
import EducationFields from './index';
import EducationLevelField from './EducationLevelField';
import EducationField from './EducationField';
import HighestCollegeField from './HighestCollegeField';
import AnotherCollegeField from './AnotherCollegeField';

describe('Residency Fields', () => {
  const component = shallow(<EducationFields />);
  it('should have Education Level Field', () => {
    expect(component.find(EducationLevelField)).toHaveLength(1);
  });
  it('should have Education Field', () => {
    expect(component.find(EducationField)).toHaveLength(1);
  });
  it('should have Highest College Field', () => {
    expect(component.find(HighestCollegeField)).toHaveLength(1);
  });
  it('should have Another College Field', () => {
    expect(component.find(AnotherCollegeField)).toHaveLength(1);
  });
});
