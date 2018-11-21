import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi dailyRecommendations connectionStatus: blocked', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.dr, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: dailyRecommendations', () => {
        const props = eoiProps('dailyRecommendations', { flags: { connectionStatus: 'blocked' } });
        it('should render unblock section', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain(`${props.profile.name}'s Profile has been BlockedNext recommendation`);
        });
      });
    });
  });
});
