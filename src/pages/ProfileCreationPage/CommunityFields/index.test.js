import React from 'react';
import { shallow } from 'enzyme';
import CommunityFields from './index';
import CasteField from './CasteField';
import SubCasteField from './SubCasteField';
import CasteNoBarField from './CasteNoBarField';
import AstroFields from '../AstroFields';

describe('Residency Fields', () => {
  const component = shallow(<CommunityFields />);
  it('should have Caste Field', () => {
    expect(component.find(CasteField)).toHaveLength(1);
  });
  it('should have Sub Caste Field', () => {
    expect(component.find(SubCasteField)).toHaveLength(1);
  });
  it('should have Caste No Bar Field', () => {
    expect(component.find(CasteNoBarField)).toHaveLength(1);
  });
  it('should have Astro Fields', () => {
    expect(component.find(AstroFields)).toHaveLength(1);
  });
});
