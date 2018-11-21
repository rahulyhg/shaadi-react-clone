import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi dailyRecommendations connectionStatus: theyDeclined', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.dr, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: dailyRecommendations', () => {
        const props = eoiProps('dailyRecommendations', { flags: { connectionStatus: 'theyDeclined' } });
        it('should render correct text', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain(`${props.profile.name} Declined your Invitation`);
        });
      });
    });
  });
});
