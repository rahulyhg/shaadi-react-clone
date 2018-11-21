import React from 'react';
import { shallow } from 'enzyme';
import LocationFields from './index';
import ZipField from './ZipField';
import DontKnowZipField from './DontKnowZipField';
import StateField from './StateField';
import CityField from './CityField';
import DistrictField from './DistrictField';

describe('Location Fields', () => {
  const component = shallow(<LocationFields />);
  it('should have Zip Field', () => {
    expect(component.find(ZipField)).toHaveLength(1);
  });
  it("should have I don't know Zip Field", () => {
    expect(component.find(DontKnowZipField)).toHaveLength(1);
  });
  it('should have State Field', () => {
    expect(component.find(StateField)).toHaveLength(1);
  });
  it('should have City Field', () => {
    expect(component.find(CityField)).toHaveLength(1);
  });
  it('should have District Field', () => {
    expect(component.find(DistrictField)).toHaveLength(1);
  });
});
