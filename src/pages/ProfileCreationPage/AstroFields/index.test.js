import React from 'react';
import { shallow } from 'enzyme';
import AstroFields from './index';
import GotraField from './GotraField';
import NakshatraField from './NakshatraField';
import RashiField from './RashiField';
import SuddhaJadhagamField from './SuddhaJadhagamField';
import DoshamField from './DoshamField';
import DoshamTypesField from './DoshamTypesField';

describe('Astro Fields', () => {
  const component = shallow(<AstroFields />);
  it('should have Gotra Field', () => {
    expect(component.find(GotraField)).toHaveLength(1);
  });
  it('should have Nakshatra Field', () => {
    expect(component.find(NakshatraField)).toHaveLength(1);
  });
  it('should have Rashi Field', () => {
    expect(component.find(RashiField)).toHaveLength(1);
  });
  it('should have Sudh Jagdham Field', () => {
    expect(component.find(SuddhaJadhagamField)).toHaveLength(1);
  });
  it('should have Dosham Field', () => {
    expect(component.find(DoshamField)).toHaveLength(1);
  });
  it('should have Dosham Types Field', () => {
    expect(component.find(DoshamTypesField)).toHaveLength(1);
  });
});
