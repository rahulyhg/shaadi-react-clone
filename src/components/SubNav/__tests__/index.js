/* eslint camelcase: 0 */
import React from 'react';
import { mount } from 'enzyme';
import factory from './factory';
import SubNav from '../../SubNav';

describe('Sub Navigation', () => {
  const SubNavProps = factory;
  const subNav = mount(<SubNav {...SubNavProps} />);
  it(`count of sub nav items should be ${SubNavProps.navList.length}`, () => {
    expect(subNav.find('li').length).toBe(SubNavProps.navList.length);
  });
});
