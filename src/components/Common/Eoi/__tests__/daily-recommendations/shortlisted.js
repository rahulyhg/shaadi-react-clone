import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi dailyRecommendations connectionStatus: shortlisted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.dr, onAction });

      describe('type: dailyRecommendations', () => {
        const props = eoiProps('dailyRecommendations', { flags: { connectionStatus: 'shortlisted' } });
        it('should render shortlisted message', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain(`${props.profile.name} added to your Maybe's`);// eslint-disable-line
        });
      });
    });
  });
});
