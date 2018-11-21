/* eslint camelcase: 0 */
import React from 'react';
import { mount } from 'enzyme';
import factory from './utils/factory';
import InterestListBanner from '../../InterestListBanner';

jest.mock('../../../Common/Link');

describe('Premium Banner cases', () => {
  describe('Static Premium Banner cases', () => {
    it('should render given text for static banner', () => {
      const staticBannerProps = { ...factory.props, premiumBannner: {} };
      const bannerWrapper = mount(<InterestListBanner {...staticBannerProps} />);
      expect(bannerWrapper.find('div[data-banner="static"]').exists()).toBe(true);
      expect(bannerWrapper.text()).toContain('Get 10 times better response by calling directly!');
    });
    it('should render discount msg when offer details are available', () => {
      const staticBannerProps = { ...factory.props, premiumBannner: {} };
      const bannerWrapper = mount(<InterestListBanner {...staticBannerProps} />);
      expect(bannerWrapper.find('div[data-banner="static"]').exists()).toBe(true);
      expect(staticBannerProps.settings.offer_details.length).toBe(1);
      expect(bannerWrapper.find('DiscountMsg').length).toEqual(1);
      expect(bannerWrapper.text()).toContain(`Save upto ${staticBannerProps.settings.offer_details[0].value}% today!`);
    });
  });

  describe('Dynamic Premium Banner cases', () => {
    it('should render accepted text for banner type accepted', () => {
      const dynamicBannerProps = { ...factory.props, premiumBannner: { ...factory.props.premiumBannner, bannerType: 'accepted' } };
      const bannerWrapper = mount(<InterestListBanner {...dynamicBannerProps} />);
      expect(bannerWrapper.find('div[data-banner="accepted"]').exists()).toBe(true);
      expect(bannerWrapper.text()).toContain(
        `${dynamicBannerProps.premiumBannner.heShe} has accepted your Invitation on ${dynamicBannerProps.premiumBannner.actionDate}`,
      );
    });
    it('should render invitation text for banner type interest_sent', () => {
      const dynamicBannerProps = { ...factory.props, premiumBannner: { ...factory.props.premiumBannner, bannerType: 'interest_sent' } };
      const bannerWrapper = mount(<InterestListBanner {...dynamicBannerProps} />);
      expect(bannerWrapper.find('div[data-banner="interest_sent"]').exists()).toBe(true);
      expect(bannerWrapper.text()).toContain(
        `You have sent ${dynamicBannerProps.premiumBannner.himHer.toLowerCase()} an Invitation on ${
          dynamicBannerProps.premiumBannner.actionDate
        }`,
      );
    });
    it('should render shortlisted text for banner type shortlisted', () => {
      const dynamicBannerProps = { ...factory.props, premiumBannner: { ...factory.props.premiumBannner, bannerType: 'shortlisted' } };
      const bannerWrapper = mount(<InterestListBanner {...dynamicBannerProps} />);
      expect(bannerWrapper.find('div[data-banner="shortlisted"]').exists()).toBe(true);
      expect(bannerWrapper.text()).toContain(
        `You have shortlisted ${dynamicBannerProps.premiumBannner.himHer.toLowerCase()} on ${dynamicBannerProps.premiumBannner.actionDate}`,
      );
    });

    it('should not render discount msg when offer details are not available', () => {
      const dynamicBannerProps = { ...factory.props, settings: { ...factory.props.settings, offer_details: {} } };
      const bannerWrapper = mount(<InterestListBanner {...dynamicBannerProps} />);
      expect(bannerWrapper.find('div[data-banner="accepted"]').exists()).toBe(true);
      expect(bannerWrapper.find('DiscountMsg').length).toEqual(0);
    });

    it('should render profile image', () => {
      const dynamicBannerProps = { ...factory.props };
      const bannerWrapper = mount(<InterestListBanner {...dynamicBannerProps} />);
      expect(bannerWrapper.find('div[data-banner="accepted"]').exists()).toBe(true);
      expect(bannerWrapper.find('img').length).toEqual(1);
    });
  });
});
