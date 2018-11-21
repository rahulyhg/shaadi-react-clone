import React from 'react';
import { mount } from 'enzyme';
import PaymentSuccessStories from '../../PaymentSuccessStories';
import factory from './utils/factory';

jest.mock('../../../Common/Link');

describe('Payment Success Stories', () => {
  describe('should render', () => {
    const props = { ...factory.successStoriesProps };

    describe('Payment Success Stories : have zero story', () => {
      const paymentSuccessStoriesProps = { ...props };
      it('Stories === 0', () => {
        const paymentSS = mount(<PaymentSuccessStories {...paymentSuccessStoriesProps} />);

        expect(paymentSS).toBeTruthy();
        expect(paymentSS.find('PaymentSuccessStories').exists()).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[direction="prev"]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[direction="next"]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[data-prevdisplay=false]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[data-nextdisplay=true]')
            .exists(),
        ).toBe(false);
      });
    });
    describe('Payment Success Stories : have one story', () => {
      const paymentSuccessStoriesProps = { ...factory.oneStoryProps };
      it('Stories === 1', () => {
        const paymentSS = mount(<PaymentSuccessStories {...paymentSuccessStoriesProps} />);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[direction="prev"]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[direction="next"]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[data-prevdisplay=false]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[data-nextdisplay=true]')
            .exists(),
        ).toBe(false);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('Story')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('ThumbContainer')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('StoryContent')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('StoryHeading')
            .exists(),
        ).toBe(true);
      });
    });
    describe('Payment Success Stories : have more than one stories', () => {
      const paymentSuccessStoriesProps = { ...factory.moreThanOneStoriesProps };
      it('Stories > 1', () => {
        const paymentSS = mount(<PaymentSuccessStories {...paymentSuccessStoriesProps} />);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[direction="prev"]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[direction="next"]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[data-prevdisplay=false]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('div[data-nextdisplay=true]')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('Story')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('ThumbContainer')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('StoryContent')
            .exists(),
        ).toBe(true);
        expect(
          paymentSS
            .find('PaymentSuccessStories')
            .find('StoryHeading')
            .exists(),
        ).toBe(true);
      });
    });
  });
});
