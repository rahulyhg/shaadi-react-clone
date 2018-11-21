import React from 'react';
import { mount } from 'enzyme';
import Features from '../../Products/features';
import factory from '../utils/factory';

jest.mock('../../../Common/Link');
describe('Features', () => {
  const placeCart = jest.fn();
  describe('Should Render', () => {
    beforeEach(() => {
      placeCart.mockClear();
    });
    const props = {
      benefits: factory.productSelfProps.product.benefits,
      errorMsg: '',
      isVisible: true,
      btnloading: false,
      placeCart,
      membershipId: 'SSP_GPlus',
    };
    describe('Feature without error', () => {
      const FeaturesProps = { ...props };
      it('Contain Features', () => {
        const feature = mount(<Features {...FeaturesProps} />);
        expect(feature.find('Features').exists()).toBe(true);
        expect(feature.find('Features').text()).toContain('Chat with your Matches');
        expect(feature.find('Features').text()).toContain('View 75 Contact Numbers');
        expect(feature.find('Features').text()).toContain('Get highlighted to your Matches');
        expect(feature.find('Features').text()).toContain('Feature on top of Search Results');
      });
    });
    describe('Feature with error', () => {
      const FeaturesProps = {
        benefits: factory.productSelfProps.product.benefits,
        errorMsg: 'The Discount code in invalid',
        isVisible: true,
        btnloading: false,
        placeCart,
        membershipId: 'SSP_GPlus',
      };
      it('Contain Features', () => {
        const feature = mount(<Features {...FeaturesProps} />);
        expect(feature.find('DiscountError').exists()).toBe(true);
        expect(feature.find('DiscountError').text()).toEqual('The Discount code in invalid');
      });
    });
  });
});
