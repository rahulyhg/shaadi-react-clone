import React from 'react';
import { mount } from 'enzyme';
import Product from '../../Products/product';
import factory from '../utils/factory';

jest.mock('../../../Common/Link');
describe('Products', () => {
  const addToCart = jest.fn();
  const handleClick = jest.fn();
  describe('Should Render', () => {
    beforeEach(() => {
      addToCart.mockClear();
      handleClick.mockClear();
    });
    const props = { ...factory.productSelfProps, addToCart, handleClick };
    describe('Premium Product', () => {
      const ProductsProps = { ...props };
      it('Contain Premium Product', () => {
        const product = mount(<Product {...ProductsProps} />);
        expect(product.find('PlanContainer').exists()).toBe(true);
        expect(product.find('Tag').exists()).toBe(false);
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .exists(),
        ).toBe(true);
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('Membership')
            .exists(),
        ).toBe(true);
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('Membership')
            .text(),
        ).toEqual('Gold 3 months');
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('PriceContainer')
            .exists(),
        ).toBe(true);
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('PriceContainer')
            .text(),
        ).toContain('US $97');
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('PriceContainer')
            .find('PermonthContainer')
            .text(),
        ).toEqual('Per month US $33');
        const productPlanContainer = product.find('PlanContainer').find('PlanDetails');
        productPlanContainer.simulate('click');
      });
    });
    describe('Personalised Product', () => {
      const ProductsProps = {
        ...props,
        currentTab: 'PersonaliseTab',
        product: { ...props.product, name: 'Select Shaadi', price: 599, pricepermonth: 200 },
        isPremiumProduct: false,
      };
      it('Contain Premium Product', () => {
        const product = mount(<Product {...ProductsProps} />);
        product.setState({ visible: true });
        expect(product.find('PlanContainer').exists()).toBe(true);
        expect(product.find('Tag').exists()).toBe(false);
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('Membership')
            .text(),
        ).toEqual('3 months');
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('PriceContainer')
            .text(),
        ).toContain('US $200 per month');
        expect(
          product
            .find('PlanContainer')
            .find('PlanDetails')
            .find('PriceContainer')
            .find('PermonthContainer')
            .text(),
        ).toEqual('Total US $599');
        expect(product.find('SelectLogo').exists()).toBe(true);
        expect(product.find('FoldingArrow').exists()).toBe(true);
        expect(product.find('Features').exists()).toBe(true);
        expect(product.find('Features').text()).toContain('Chat with your Matches');
        expect(product.find('Features').text()).toContain('View 75 Contact Numbers');
        expect(product.find('Features').text()).toContain('Get highlighted to your Matches');
        expect(product.find('Features').text()).toContain('Feature on top of Search Results');
      });
    });
    describe('Product Tag', () => {
      it('Contain Best Value Tag', () => {
        const ProductsProps = { ...props, product: { ...props.product, name: 'Platinum Plus', best_value: true } };
        const product = mount(<Product {...ProductsProps} />);
        expect(product.find('Tag').exists()).toBe(true);
      });
      it('Contain Top Seller Tag', () => {
        const ProductsProps = { ...props, product: { ...props.product, name: 'Diamond Plus', topseller: true } };
        const product = mount(<Product {...ProductsProps} />);
        expect(product.find('Tag').exists()).toBe(true);
      });
      it('Contain Your Plan Tag', () => {
        const ProductsProps = { ...props, product: { ...props.product, your_plan: true } };
        const product = mount(<Product {...ProductsProps} />);
        expect(product.find('Tag').exists()).toBe(true);
      });
    });
  });
});
