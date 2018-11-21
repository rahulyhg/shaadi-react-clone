import React from 'react';
import { mount } from 'enzyme';
import BoldListing from '../../BoldListing';
import factory from './factory';

describe('Bold Listing cases', () => {
  it('should render bold listing color', () => {
    factory.MembershipColors.forEach(items => {
      mount(<BoldListing membershipTags={items.membershipTags} membershipLevel={items.membershipLevel} />);
    });
  });
});
