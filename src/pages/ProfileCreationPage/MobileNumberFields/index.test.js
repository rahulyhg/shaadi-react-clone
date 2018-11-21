import React from 'react';
import { shallow } from 'enzyme';
import MobileNumberFields from './index';
import CountryCodeField from './CountryCodeField';
import MobileNumberField from './MobileNumberField';

describe('Habbit Fields', () => {
  const component = shallow(<MobileNumberFields />);
  it('should have ISD Field', () => {
    expect(component.find(CountryCodeField)).toHaveLength(1);
  });
  it('should have Mobile Number Field', () => {
    expect(component.find(MobileNumberField)).toHaveLength(1);
  });
});
