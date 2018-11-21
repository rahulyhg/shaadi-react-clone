import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';
import Timer from '../../../../../helpers/timer';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: theyAccepted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'theyAccepted' } });
        it('should render msg for free user', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain(`Invitation AcceptedUpgrade to contact ${props.profile.himHer.toLowerCase()} directly`); // eslint-disable-line
        });

        const skuProps = eoiProps('list', {
          flags: { connectionStatus: 'theyAccepted', canCommunicate: true, membershipTags: 'diamond_plus' },
        });
        it('should render msg for free user for diamond plus user', () => {
          const eoi = mount(<Eoi {...skuProps} />);
          expect(eoi.text()).toContain(`Invitation AcceptedYou can contact a Diamond+ Member`); // eslint-disable-line
        });

        it('should render msg for paid user', () => {
          const isPaidProps = { ...props, settings: { ...props.settings, isPaidUser: true } };
          const eoi = mount(<Eoi {...isPaidProps} />);
          expect(eoi.text()).toContain(`Invitation AcceptedContact ${props.profile.himHer.toLowerCase()} directly`);
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'theyAccepted' } });
        it('should render nothing', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toEqual('Accepted');
        });
      });
      describe('type:premiummCarousel', () => {
        const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'theyAccepted' } });
        it('Accepted in Premium Carousel', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.find(Timer).get(0)).toBeTruthy();
        });
      });
    });
  });
});
