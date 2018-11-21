import React from 'react';
import { mount } from 'enzyme';
import ProfileBoosterBox from '../../OrderSummary/ProfileBoosterBox';
import factory from '../utils/factory';

describe('Profile Booster', () => {
  const doProfileBoosterToggle = jest.fn();

  describe('should render', () => {
    beforeEach(() => {
      doProfileBoosterToggle.mockClear();
    });
    const props = { ...factory.profileBoosterBoxProps, doProfileBoosterToggle };

    describe('Profile Booster : have checkbox checked', () => {
      const profileBoosterProps = { ...props, currency: 'USD', displayAmount: 3, isProfileBoosterChecked: true };
      it('It is checked', () => {
        const profileBoosterBox = mount(<ProfileBoosterBox {...profileBoosterProps} />);
        expect(profileBoosterBox.find('ProfileBoosterBox').exists()).toBe(true);
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('input[type="checkbox"]')
            .exists(),
        ).toBe(true);
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('BoxHtml')
            .exists(),
        ).toBe(true);
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('BoxHtml')
            .text(),
        ).toContain('Add Profile Booster');
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('BoxPrice')
            .text(),
        ).toContain('US $3');
      });
    });
    describe('Profile Booster : have checkbox unchecked', () => {
      const profileBoosterProps = { ...props, currency: 'USD', displayAmount: 3, isProfileBoosterChecked: false };
      it('It is unchecked', () => {
        const profileBoosterBox = mount(<ProfileBoosterBox {...profileBoosterProps} />);
        expect(profileBoosterBox.find('ProfileBoosterBox').exists()).toBe(true);
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('input[type="checkbox"]')
            .exists(),
        ).toBe(true);
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('BoxHtml')
            .exists(),
        ).toBe(true);
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('BoxHtml')
            .text(),
        ).toContain('Add Profile Booster');
        expect(
          profileBoosterBox
            .find('ProfileBoosterBox')
            .find('BoxPrice')
            .text(),
        ).toContain('US $3');
      });
    });
  });
});
