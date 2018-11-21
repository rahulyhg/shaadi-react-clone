import React from 'react';
import { mount } from 'enzyme';
import CrownBadge from '../../CrownBadge';
import factory from '../utils/factory';

describe('PremiumBadge', () => {
  describe('should render', () => {
    const props = { ...factory.crownBadgeProps };
    describe('Product : Silver Plus', () => {
      const tagProps = { ...props, membershipTags: 'special_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: A', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="PremiumPlus"]').exists()).toBe(true);
      });
    });
    describe('Product : Gold Plus', () => {
      const tagProps = { ...props, membershipTags: 'gold_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: A', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="PremiumPlus"]').exists()).toBe(true);
      });
    });

    describe('Product : Diamond Plus', () => {
      const tagProps = { ...props, membershipTags: 'diamond_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: A', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="PremiumPlus"]').exists()).toBe(true);
      });
    });

    describe('Product : Platinum Plus', () => {
      const tagProps = { ...props, membershipTags: 'platinum_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: A', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="PremiumPlus"]').exists()).toBe(true);
      });
    });

    describe('Product : Select', () => {
      const tagProps = { ...props, membershipTags: 'select', membershipLevel: 'Select' };
      it('should render PremiumBadge Component with Bucket: A', () => {
        const badge = mount(<CrownBadge {...tagProps} />);
        expect(badge.find('span[data-badge="select"]').exists()).toBe(true);
      });
    });
  });
});
