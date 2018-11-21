import React from 'react';
import { mount } from 'enzyme';
import ShaadiCareBox from '../../OrderSummary/ShaadiCareBox';
import factory from '../utils/factory';

describe('ShaadiCareBox', () => {
  const doShaadiCareToggle = jest.fn();

  describe('should render', () => {
    beforeEach(() => {
      doShaadiCareToggle.mockClear();
    });
    const props = { ...factory.shaadiCareBoxProps, doShaadiCareToggle };

    describe('ShaadiCareBox : have checkbox checked', () => {
      const shaadiCareProps = { ...props, currency: 'USD', displayAmount: 3, isShaadiCareChecked: true };
      it('It is checked', () => {
        const shaadiCareBox = mount(<ShaadiCareBox {...shaadiCareProps} />);
        expect(shaadiCareBox.find('ShaadiCaresBox').exists()).toBe(true);
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('input[type="checkbox"]')
            .exists(),
        ).toBe(true);
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('BoxHtml')
            .exists(),
        ).toBe(true);
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('BoxHtml')
            .text(),
        ).toContain('Contribute to ShaadiCares');
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('BoxPrice')
            .text(),
        ).toContain('US $3');
      });
    });
    describe('ShaadiCareBox : have checkbox unchecked', () => {
      const shaadiCareProps = { ...props, currency: 'USD', displayAmount: 3, isShaadiCareChecked: false };
      it('It is unchecked', () => {
        const shaadiCareBox = mount(<ShaadiCareBox {...shaadiCareProps} />);
        expect(shaadiCareBox.find('ShaadiCaresBox').exists()).toBe(true);
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('input[type="checkbox"]')
            .exists(),
        ).toBe(true);
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('BoxHtml')
            .exists(),
        ).toBe(true);
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('BoxHtml')
            .text(),
        ).toContain('Contribute to ShaadiCares');
        expect(
          shaadiCareBox
            .find('ShaadiCaresBox')
            .find('BoxPrice')
            .text(),
        ).toContain('US $3');
      });
    });
  });
});
