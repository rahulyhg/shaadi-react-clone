import React from 'react';
import { mount } from 'enzyme';
import OrderSummary from '../../OrderSummary';
import factory from '../utils/factory';

describe('Order Summary', () => {
  const doProfileBoosterToggle = jest.fn();
  const doShaadiCareToggle = jest.fn();

  describe('should render', () => {
    beforeEach(() => {
      doProfileBoosterToggle.mockClear();
      doShaadiCareToggle.mockClear();
    });
    const props = { ...factory.orderSummaryProps, doProfileBoosterToggle, doShaadiCareToggle };

    describe('Order Summary : Product Name & Product Price', () => {
      describe('Order Summary Should have Product Name & Product Price', () => {
        it('Product have one month duration', () => {
          const summaryMonthProps = { ...props, cartInfo: { ...props.cartInfo, duration: 1, product_name: 'Silver' } };
          const summary = mount(<OrderSummary {...summaryMonthProps} />);
          expect(
            summary
              .find('OrderSummery')
              .find('ProductPrice')
              .exists(),
          ).toBe(true);
          expect(
            summary
              .find('OrderSummery')
              .find('PlanName')
              .find('div')
              .text(),
          ).toEqual('Silver (1 Month)');
          expect(
            summary
              .find('OrderSummery')
              .find('ProductPrice')
              .find('span')
              .text(),
          ).toEqual('AED 437');
          expect(
            summary
              .find('TotalSummery')
              .find('TotalPrice')
              .text(),
          ).toEqual('AED 440');
        });
        it('Product have more than one month duration', () => {
          const summaryMonthsProps = {
            ...props,
            cartInfo: { ...props.cartInfo, duration: 6, product_name: 'Select Shaadi Plus' },
          };
          const summary = mount(<OrderSummary {...summaryMonthsProps} />);
          expect(
            summary
              .find('OrderSummery')
              .find('ProductPrice')
              .exists(),
          ).toBe(true);
          expect(
            summary
              .find('OrderSummery')
              .find('PlanName')
              .find('div')
              .text(),
          ).toEqual('Select Shaadi Plus (6 Months)');
          expect(
            summary
              .find('OrderSummery')
              .find('ProductPrice')
              .find('span')
              .text(),
          ).toEqual('AED 437');
          expect(
            summary
              .find('TotalSummery')
              .find('TotalPrice')
              .text(),
          ).toEqual('AED 440');
        });
      });
    });
    describe('Order Summary : Offer Discount', () => {
      describe('Order Summary : No Offer Case', () => {
        const summaryProps = { ...props, settings: { ...props.settings } };
        it('No Offer Case', () => {
          const summary = mount(<OrderSummary {...summaryProps} />);
          expect(
            summary
              .find('OrderSummery')
              .find('OfferPrice')
              .exists(),
          ).toBe(false);
        });
      });
      describe('Order Summary : Percentage Based Discount', () => {
        const summaryProps = {
          ...props,
          settings: { ...props.settings, discountedPrice: 37, yourPrice: 400, offerDiscountAmount: 0, offerDiscountPerc: 20 },
        };
        it('Amount Based Discount', () => {
          const summary = mount(<OrderSummary {...summaryProps} />);
          expect(
            summary
              .find('OrderSummery')
              .find('OfferSummary')
              .exists(),
          ).toBe(true);
          expect(
            summary
              .find('OrderSummery')
              .find('OfferSummary')
              .text(),
          ).toContain('Savings (20% off)');
          expect(
            summary
              .find('OrderSummery')
              .find('OfferSummary')
              .find('span')
              .text(),
          ).toEqual('AED 37');
          expect(
            summary
              .find('TotalSummery')
              .find('TotalPrice')
              .find('span')
              .text(),
          ).toEqual('AED 440');

          expect(doProfileBoosterToggle).not.toHaveBeenCalled();
          const profileBoosterCheckbox = summary.find('ProfileBoosterBox').find('input[type="checkbox"]');
          expect(profileBoosterCheckbox.prop('data-status')).toEqual('unchecked');
          profileBoosterCheckbox.simulate('change');
          expect(doProfileBoosterToggle).toBeCalled();

          expect(doShaadiCareToggle).not.toHaveBeenCalled();
          const shaadiCareCheckbox = summary.find('ShaadiCaresBox').find('input[type="checkbox"]');
          expect(shaadiCareCheckbox.prop('data-status')).toEqual('checked');
          shaadiCareCheckbox.simulate('change', { target: { checked: true } });
          expect(doShaadiCareToggle).toBeCalled();
        });
      });
      describe('Order Summary : Amount Based Discount', () => {
        const summaryProps = {
          ...props,
          settings: { ...props.settings, discountedPrice: 770, offerDiscountAmount: 770, offerDiscountPerc: 0 },
        };
        it('Percentage Based Discount', () => {
          const summary = mount(<OrderSummary {...summaryProps} />);
          expect(
            summary
              .find('OrderSummery')
              .find('OfferSummary')
              .exists(),
          ).toBe(true);
          expect(
            summary
              .find('OrderSummery')
              .find('OfferSummary')
              .text(),
          ).toContain('Savings');
          expect(
            summary
              .find('OrderSummery')
              .find('OfferSummary')
              .find('span')
              .text(),
          ).toEqual('AED 770');
          expect(
            summary
              .find('TotalSummery')
              .find('TotalPrice')
              .find('span')
              .text(),
          ).toEqual('AED 440');
        });
      });
    });
    describe('Order Summary : Shaadi Care & Profile Booster', () => {
      describe('Order Summary : With Shaadi Care & Profile Booster', () => {
        const summaryProps = { ...props };
        it('Order Summary with Shaadi Care & Profile Booster', () => {
          const summary = mount(<OrderSummary {...summaryProps} />);
          expect(summary.find('ProfileBoosterBox').exists()).toBe(true);
          expect(
            summary
              .find('ProfileBoosterBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(true);
          expect(summary.find('ShaadiCaresBox').exists()).toBe(true);
          expect(
            summary
              .find('ShaadiCaresBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(true);
        });
      });
      describe('Order Summary : With Shaadi Care Only', () => {
        const summaryProps = { ...props, settings: { ...props.settings, isProfileBooster: false } };
        it('Order Summary with Shaadi Care Only', () => {
          const summary = mount(<OrderSummary {...summaryProps} />);
          expect(summary.find('ProfileBoosterBox').exists()).toBe(false);
          expect(
            summary
              .find('ProfileBoosterBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(false);
          expect(summary.find('ShaadiCaresBox').exists()).toBe(true);
          expect(
            summary
              .find('ShaadiCaresBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(true);
        });
      });
      describe('Order Summary : With Profile Booster Only', () => {
        const summaryProps = { ...props, settings: { ...props.settings, isShaadiCare: false } };
        it('Order Summary with Profile Booster Only', () => {
          const summary = mount(<OrderSummary {...summaryProps} />);
          expect(summary.find('ProfileBoosterBox').exists()).toBe(true);
          expect(
            summary
              .find('ProfileBoosterBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(true);
          expect(summary.find('ShaadiCaresBox').exists()).toBe(false);
          expect(
            summary
              .find('ShaadiCaresBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(false);
        });
      });
      describe('Order Summary : Without Shaadi Care & Profile Booster', () => {
        const summaryProps = { ...props, settings: { ...props.settings, isShaadiCare: false, isProfileBooster: false } };
        it('Order Summary without Shaadi Care & Profile Booster', () => {
          const summary = mount(<OrderSummary {...summaryProps} />);
          expect(summary.find('ProfileBoosterBox').exists()).toBe(false);
          expect(
            summary
              .find('ProfileBoosterBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(false);
          expect(summary.find('ShaadiCaresBox').exists()).toBe(false);
          expect(
            summary
              .find('ShaadiCaresBox')
              .find('input[type="checkbox"]')
              .exists(),
          ).toBe(false);
        });
      });
    });
  });
});
