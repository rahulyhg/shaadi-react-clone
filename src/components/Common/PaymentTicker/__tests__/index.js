import React from 'react';
import { mount } from 'enzyme';
import PaymentTicker from '../../PaymentTicker';
import factory from './utils/factory';

describe('Payment Ticker', () => {
  describe('should render', () => {
    const props = { ...factory.paymentTickerProps };
    describe('Payment Ticker : With improper time', () => {
      it('Payment Ticker with proper time', () => {
        const tickerProps = { ...props, target_time: 0 };
        const ticker = mount(<PaymentTicker {...tickerProps} />);
        expect(ticker.text()).toEqual('00h:00m:00s');
      });
    });
    describe('Payment Ticker : With proper time', () => {
      it('Payment Ticker with proper time', () => {
        const state = {
          willFade: false,
          timer: {
            hrsTensAnim: true,
            hrsTens: 20,
            hrsUnitAnim: true,
            hrsUnit: 1,
            minTenAnim: true,
            minTens: 1,
            minUnitAnim: true,
            minUnit: 1,
            secTensAnim: true,
            secTens: 1,
            secUnitAnim: true,
            secUnit: 1,
          },
        };
        const ticker = mount(<PaymentTicker {...props} {...state} />);
        expect(ticker.find('CountText').exists()).toBe(true);
        expect(ticker.find('CountText').length).toEqual(2);
        expect(ticker.find('CountTextMin').exists()).toBe(true);
        expect(ticker.find('CountTextMin').length).toEqual(1);
        expect(ticker.find('CountColun').exists()).toBe(true);
        expect(ticker.find('CountColun').length).toEqual(2);
      });
    });
  });
});
