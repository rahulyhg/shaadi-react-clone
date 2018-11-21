import React from 'react';
import { mount } from 'enzyme';
import PremiumBadge from '../../PremiumBadge';
import factory from '../utils/factory';

describe('PremiumBadge', () => {
  describe('should render', () => {
    const props = { ...factory.premiumBadgeBProps };

    describe('Product : Silver', () => {
      const tagProps = { ...props, membershipTags: 'special' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="specialB"]').exists()).toBe(false);
      });
    });

    describe('Product : Gold', () => {
      const tagProps = { ...props, membershipTags: 'gold' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="goldB"]').exists()).toBe(false);
      });
    });

    describe('Product : Diamond', () => {
      const tagProps = { ...props, membershipTags: 'diamond' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="diamondB"]').exists()).toBe(false);
      });
    });

    describe('Product : Platinum', () => {
      const tagProps = { ...props, membershipTags: 'platinum' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="platinumB"]').exists()).toBe(false);
      });
    });

    describe('Product : Silver Plus', () => {
      const tagProps = { ...props, membershipTags: 'special_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="special_plusB"]').exists()).toBe(true);
      });
    });

    describe('Product : Gold Plus', () => {
      const tagProps = { ...props, membershipTags: 'gold_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="gold_plusB"]').exists()).toBe(true);
      });
    });

    describe('Product : Diamond Plus', () => {
      const tagProps = { ...props, membershipTags: 'diamond_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="diamond_plusB"]').exists()).toBe(true);
      });
    });

    describe('Product : Platinum Plus', () => {
      const tagProps = { ...props, membershipTags: 'platinum_plus', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="platinum_plusB"]').exists()).toBe(true);
      });
    });

    describe('Product : Select', () => {
      const tagProps = { ...props, membershipTags: 'select', membershipLevel: 'Select' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="selectB"]').exists()).toBe(true);
      });
    });

    describe('Product : VIP', () => {
      const tagProps = { ...props, membershipTags: 'vip', membershipLevel: 'PremiumPlus' };
      it('should render PremiumBadge Component with Bucket: B', () => {
        const badge = mount(<PremiumBadge {...tagProps} />);
        expect(badge.find('div[data-badge="vipB"]').exists()).toBe(true);
      });
    });
  });
});
