import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi dailyRecommendations connectionStatus: accepted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.dr, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: dailyRecommendations paid', () => {
        const props = eoiProps('dailyRecommendations', { flags: { connectionStatus: 'accepted', isFree: false } });
        it('should render Accepted Member', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('p')
              .first()
              .text(),
          ).toBe(`Accepted ${props.profile.name}'s Invitation`);
        });
      });

      describe('type: dailyRecommendations free', () => {
        const props = eoiProps('dailyRecommendations', { flags: { connectionStatus: 'accepted', isFree: true } });
        it('should render Accepted Member', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('p')
              .first()
              .text(),
          ).toBe(`Accepted ${props.profile.name}'s Invitation`);
        });
      });
    });
  });
});
