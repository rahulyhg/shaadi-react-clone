import React from 'react';
import { mount } from 'enzyme';
import OfferDiscountCases from '../../TopBand/OfferDiscountCases';
import factory from '../utils/factory';

describe('Offer Discount', () => {
  describe('should render', () => {
    const props = { ...factory.offerDiscountCasesProps };
    describe('Offer Discount : With justforu', () => {
      const offerProps = { ...props, type: 'justforu' };
      it('Top band Message with justforu', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').exists()).toBe(true);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Save 50% on all premium plans. Offer valid only for today');
      });
    });
    describe('Offer Discount : With birthday-free', () => {
      const offerProps = { ...props, type: 'birthday-free' };
      it('Top band Message with birthday-free', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Happy Birthday! Save 50% on any Premium plan!!!');
      });
    });
    describe('Offer Discount : With bigday', () => {
      const offerProps = { ...props, type: 'bigday' };
      it('Top band Message with bigday', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Save upto 50%. Offer valid for today');
      });
    });
    describe('Offer Discount : With CartSweetner', () => {
      const offerProps = { ...props, type: 'CartSweetner' };
      it('Top band Message with CartSweetner', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Complete your order 50% !!! Hurry, this offer expires today');
      });
    });
    describe('Offer Discount : With match-price', () => {
      const offerProps = { ...props, type: 'renewal-member', isOldPrice: true };
      it('Top band Message with match-price', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Renew now to get your Old Price!');
      });
    });
    describe('Offer Discount : With renewal-member', () => {
      const offerProps = { ...props, type: 'renewal-member' };
      it('Top band Message with renewal-member', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Renew at a Special Price. Save upto 50%!');
      });
    });
    describe('Offer Discount : With lifecycle-bigday without ticker', () => {
      const offerProps = { ...props, type: 'lifecycle-bigday', validTill: '1519391023', maxDiscount: 60, showTicker: false };
      it('Top band Message with lifecycle-bigday expiry', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Save upto 60%. Valid till 23rd February');
      });
    });
    describe('Offer Discount : With lifecycle-bigday with ticker', () => {
      const offerProps = { ...props, type: 'lifecycle-bigday', validTill: '1519391023', maxDiscount: 60, showTicker: true };
      it('Top band Message with lifecycle-bigday ticker', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Save upto 60%. Expires in 00h:00m:00s');
      });
    });
    describe('Offer Discount : With fishnet without ticker', () => {
      const offerProps = { ...props, type: 'fishnet', validTill: '1519391023', maxDiscount: 60, showTicker: false };
      it('Top band Message with fishnet expiry', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Save upto 60%. Valid till 23rd February');
      });
    });
    describe('Offer Discount : With fishnet with ticker', () => {
      const offerProps = { ...props, type: 'fishnet', validTill: '1519391023', maxDiscount: 60, showTicker: true };
      it('Top band Message with fishnet ticker', () => {
        const offerDiscount = mount(<OfferDiscountCases {...offerProps} />);
        expect(offerDiscount.find('OfferDiscount').text()).toContain('Save upto 60%. Expires in 00h:00m:00s');
      });
    });
  });
});
