import React from 'react';
import { mount } from 'enzyme';
import CrownBadge from '../../CrownBadge';
import factory from '../utils/factory';

describe('CrownBadge', () => {
  describe('should render', () => {
    const props = { ...factory.crownBadgeProps };

    describe('Product : Gold Plus', () => {
      const tagProps = { ...props };
      it('should render CrownBadge Component with Gold Plus', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="PremiumPlus"]').exists()).toBe(true);
      });
    });

    describe('Product : Diamond Plus', () => {
      const tagProps = { ...props, membershipTags: 'diamond_plus' };
      it('should render CrownBadge Component with Diamond Plus', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="PremiumPlus"]').exists()).toBe(true);
      });
    });

    describe('Product : Platinum Plus', () => {
      const tagProps = { ...props, membershipTags: 'platinum_plus' };
      it('should render CrownBadge Component with Platinum Plus', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="PremiumPlus"]').exists()).toBe(true);
      });
    });

    describe('Product : Select', () => {
      const tagProps = { ...props, membershipTags: 'select', membershipLevel: 'Select' };
      it('should render CrownBadge Component with Select', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="select"]').exists()).toBe(true);
      });
    });
  });
});
