import React from 'react';
import { mount } from 'enzyme';
import TopBand from '../../TopBand';
import factory from '../utils/factory';

describe('Top Band', () => {
  describe('should render', () => {
    const props = { ...factory.topBandProps };
    describe('TopBand : Without offer & scent trail', () => {
      const tagProps = {
        ...props,
        loading: false,
        profileId: 'testID',
        profileName: 'Test T',
        photo: 'http://test.com',
        subText: '',
        wwwBaseUrl: 'http://www.shaadi.com',
      };
      it('Top band Message without Offer', () => {
        const topBand = mount(<TopBand {...tagProps} />);
        expect(topBand.find('TopHeader').exists()).toBe(true);
        expect(topBand.find('TopHeader').html()).toContain('Upgrade to any of our Premium Plans and we guarantee you will find a match!');
      });
    });
    describe('TopBand : With Offer Discount', () => {
      const tagProps = { ...props, loading: false, isOfferDetail: true, isScentTrail: false };
      it('Top band Message with offer discount', () => {
        const topBand = mount(<TopBand {...tagProps} />);
        expect(topBand.find('TopHeader').exists()).toBe(true);
        expect(topBand.find('OfferDiscount').exists()).toBe(true);
      });
    });
    describe('TopBand : With Scent Trail', () => {
      const tagProps = { ...props, loading: false, isOfferDetail: false, isScentTrail: true };
      it('Top band Message with scent trail cases', () => {
        const topBand = mount(<TopBand {...tagProps} />);
        expect(topBand.find('TopHeader').exists()).toBe(true);
        expect(topBand.find('ScentTrail').exists()).toBe(true);
      });
    });
  });
});
