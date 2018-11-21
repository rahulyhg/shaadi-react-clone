import React from 'react';
import { mount } from 'enzyme';
import OptionsListing from './OptionsListing';

describe('OptionsListing when field on focus with no value having no options with no result found', () => {
  const mountedComponent = mount(<OptionsListing isFocused canShowNoResultFound={() => false} />);
  it("shouldn't show no result found", () => {
    expect(mountedComponent.find('.no-result-found')).toHaveLength(0);
  });
});

describe('OptionsListing when field on focus with value and options from API', () => {
  const sampleOptions = [{ label: 'Mumbai' }, { label: 'Udaipur' }, { label: 'Akola' }];
  const mountedComponent = mount(<OptionsListing isFocused filteredOptions={sampleOptions} canShowNoResultFound={() => true} />);
  it('should show no result found', () => {
    expect(mountedComponent.find('.no-result-found')).toHaveLength(1);
  });
});
