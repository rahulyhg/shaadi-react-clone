import React from 'react';
import { shallow } from 'enzyme';
import BasicsFieldSet from './BasicsFieldSet';
import LocationFields from './LocationFields';
import ResidencyFields from './ResidencyFields';
import MaritalFields from './MaritalFields';
import CommunityFields from './CommunityFields';
import EthnicityField from './EthnicityField';
import RegionalSiteField from './RegionalSiteField';

describe('Profile Creation', () => {
  const component = shallow(<BasicsFieldSet />);
  it('should have Location fields', () => {
    expect(component.find(LocationFields)).toHaveLength(1);
  });
  it('should have Residency fields', () => {
    expect(component.find(ResidencyFields)).toHaveLength(1);
  });
  it('should have Marital fields', () => {
    expect(component.find(MaritalFields)).toHaveLength(1);
  });
  it('should have Community fields', () => {
    expect(component.find(CommunityFields)).toHaveLength(1);
  });
  it('should have Ethnicity fields', () => {
    expect(component.find(EthnicityField)).toHaveLength(1);
  });
  it('should have RegionalSite fields', () => {
    expect(component.find(RegionalSiteField)).toHaveLength(1);
  });
});
