import React from 'react';
import { mount } from 'enzyme';
import PremiumCarousel from '../../PremiumCarousel';
import factory from './utils/factory';

jest.mock('../../Common/Link');

describe('PremiumCarousel', () => {
  const onAction = jest.fn();
  const onMatchSelectionChange = jest.fn();
  const onFacetChangeCarousel = jest.fn();
  const daTracking = jest.fn();

  describe('should render', () => {
    beforeEach(() => {
      onAction.mockClear();
    });

    describe('Total Profiles Count < 3', () => {
      const carouselProps = { ...factory.lessThreeItemProps, onAction, onMatchSelectionChange, onFacetChangeCarousel, daTracking };
      it('should render PremiumCarousel Component as null', () => {
        const carousel = mount(<PremiumCarousel {...carouselProps} />);
        expect(carousel).toBeTruthy();
        expect(carousel.html()).toEqual(null);
      });
    });

    describe('Total Profiles Count = 3', () => {
      const carouselProps = { ...factory.threeItemProps, onAction, onMatchSelectionChange, onFacetChangeCarousel };
      it('should render PremiumCarousel Component with 3 Profiles', () => {
        const carousel = mount(<PremiumCarousel {...carouselProps} />);
        expect(carousel).toBeTruthy();
        expect(carousel.find('ViewMoreItem').length).toBe(0);
        expect(carousel.find('div[direction="prev"]').exists()).toBe(true);
        expect(carousel.find('div[direction="prev"]').length).toEqual(1);
        expect(carousel.find('div[direction="next"]').exists()).toBe(true);
        expect(carousel.find('div[direction="next"]').length).toEqual(1);
        expect(carousel.find('div[data-prevdisplay=false]').exists()).toBe(true);
        expect(carousel.find('div[data-nextdisplay=false]').exists()).toBe(true);
        expect(carousel.find('div[data-carousel-item]').exists()).toBe(true);
        expect(carousel.find('div[data-carousel-item]').length).toEqual(3);
      });
    });

    describe('Total Profiles Count > 3', () => {
      const carouselProps = { ...factory.greaterThreeItemProps, onAction, onMatchSelectionChange, onFacetChangeCarousel };
      it('should render PremiumCarousel Component with 4 Profiles', () => {
        const carousel = mount(<PremiumCarousel {...carouselProps} />);
        expect(carousel.find('ViewMoreItem').length).toBe(1);
        const ViewMore = carousel.find('ViewMoreItem');
        expect(ViewMore.text()).toEqual('ViewMore');
        ViewMore.simulate('click');
        expect(carousel).toBeTruthy();
        expect(carousel.find('div[direction="prev"]').exists()).toBe(true);
        expect(carousel.find('div[direction="prev"]').length).toEqual(1);
        expect(carousel.find('div[direction="next"]').exists()).toBe(true);
        expect(carousel.find('div[direction="next"]').length).toEqual(1);
        expect(carousel.find('div[data-prevdisplay=false]').exists()).toBe(true);
        expect(carousel.find('div[data-nextdisplay=true]').exists()).toBe(true);
        expect(carousel.find('div[data-carousel-item]').exists()).toBe(true);
        expect(carousel.find('div[data-carousel-item]').length).toEqual(8);
      });
    });
  });
});
