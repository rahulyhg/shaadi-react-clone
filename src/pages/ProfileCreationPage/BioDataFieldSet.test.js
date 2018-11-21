import React from 'react';
import { shallow } from 'enzyme';
import BioDataFieldSet from './BioDataFieldSet';
import EducationFields from './EducationFields';
import OccupationFields from './OccupationFields';

describe('Profile Creation', () => {
  const component = shallow(<BioDataFieldSet />);
  it('should have location field set', () => {
    expect(component.find(EducationFields)).toHaveLength(1);
  });
  it('should have location field set', () => {
    expect(component.find(OccupationFields)).toHaveLength(1);
  });
});
