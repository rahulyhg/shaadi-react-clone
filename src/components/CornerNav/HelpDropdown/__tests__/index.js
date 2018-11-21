import React from 'react';
import { mount } from 'enzyme';
import HelpDropdown from '../index';
import factory from './factory';

jest.mock('../../../Common/Link');

describe('HelpDropdown Tests', () => {
  it('should have customer care number if experiment bucket is A', () => {
    const HelpDropdownProps = { ...factory };
    document.cookie = 'premium_support_ab=a';

    const HelpDropdownMount = mount(<HelpDropdown {...HelpDropdownProps} />);
    expect(HelpDropdownMount.text()).toContain('1860 200 3456');
  });

  it('should not have customer care number if experiment bucket is B', () => {
    const HelpDropdownProps = { ...factory };
    document.cookie = 'premium_support_ab=b';

    const HelpDropdownMount = mount(<HelpDropdown {...HelpDropdownProps} />);
    expect(HelpDropdownMount.text()).not.toContain('1860 200 3456');
  });

  it('should display instant help text for A bucket', () => {
    const HelpDropdownProps = { ...factory };
    document.cookie = 'premium_support_ab=a';

    const HelpDropdownMount = mount(<HelpDropdown {...HelpDropdownProps} />);
    expect(HelpDropdownMount.text()).toContain('To get instant help');
  });

  it('should display need help text for B bucket', () => {
    const HelpDropdownProps = { ...factory };
    document.cookie = 'premium_support_ab=b';

    const HelpDropdownMount = mount(<HelpDropdown {...HelpDropdownProps} />);
    expect(HelpDropdownMount.text()).toContain('Need help');
  });
});
