import React from 'react';
import { mount } from 'enzyme';
import PremiumPlusCarousel from '../../PremiumPlusCarousel';
import factory from './utils/factory';

jest.mock('../../Common/Link');

describe('Premium Plus Carousel', () => {
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
      it('should render PremiumPlusCarousel Component as null', () => {
        const carousel = mount(<PremiumPlusCarousel {...carouselProps} />);
        expect(carousel).toBeTruthy();
        expect(carousel.html()).toEqual(null);
      });
    });

    describe('Total Profiles Count = 5', () => {
      const carouselProps = { ...factory.fiveItemProps, onAction, onMatchSelectionChange, onFacetChangeCarousel };
      it('should render PremiumCarousel Component with 5 Profiles', () => {
        const carousel = mount(<PremiumPlusCarousel {...carouselProps} />);
        expect(carousel).toBeTruthy();
        expect(carousel.find('div[direction="prev"]').exists()).toBe(true);
        expect(carousel.find('div[direction="prev"]').length).toEqual(2);
        expect(carousel.find('div[direction="next"]').exists()).toBe(true);
        expect(carousel.find('div[direction="next"]').length).toEqual(2);
        expect(carousel.find('div[data-prevdisplay=false]').exists()).toBe(true);
      });
    });

    describe('Total Profiles Count > 8', () => {
      const carouselProps = { ...factory.greaterFiveItemProps, onAction, onMatchSelectionChange, onFacetChangeCarousel };
      it('should render PremiumCarousel Component with 4 Profiles', () => {
        const carousel = mount(<PremiumPlusCarousel {...carouselProps} />);
        expect(carousel).toBeTruthy();
        expect(carousel.find('MoreLink').length).toBe(2);
        const ViewMore = carousel.find('#seeAllLink');
        expect(ViewMore.first().text()).toEqual('See All');
        ViewMore.first().simulate('click');
        expect(carousel.find('div[direction="prev"]').exists()).toBe(true);
        expect(carousel.find('div[direction="prev"]').length).toEqual(2);
        expect(carousel.find('div[direction="next"]').exists()).toBe(true);
        expect(carousel.find('div[direction="next"]').length).toEqual(2);
        expect(carousel.find('div[data-prevdisplay=false]').exists()).toBe(true);
        expect(carousel.find('div[data-nextdisplay=true]').exists()).toBe(true);
        expect(carousel.find('MainWrapper').exists()).toBe(true);
        carousel.instance().onMouseEnter();
        carousel.instance().onMouseLeave();
      });
    });
  });
});
