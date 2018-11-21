import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi dailyRecommendations connectionStatus: contacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.dr, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: dailyRecommendations', () => {
        const props = eoiProps('dailyRecommendations', { flags: { connectionStatus: 'contacted' } });
        it('should render contacted as justnow', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('p')
              .at(0)
              .text(),
          ).toBe(`Invitation sent to ${props.profile.name}`);// eslint-disable-line
        });
      });

      it('For premium  User view contact button enable', () => {
        const premProps = deepExtend(
          {},
          eoiProps('dailyRecommendations', {
            flags: { connectionStatus: 'contacted', canCommunicate: false, membershipTags: 'diamond_plus' },
          }),
          {
            settings: { isPaidUser: true },
            profilePageBucket: 'B',
          },
        );
        const eoi = mount(<Eoi {...premProps} />);
        expect(eoi.find('[data-viewcontact=true]').exists()).toBe(true);
      });

      it('For sku experiment view contact button enable', () => {
        const skuProps = deepExtend(
          {},
          eoiProps('dailyRecommendations', {
            flags: { connectionStatus: 'contacted', canCommunicate: true, membershipTags: 'diamond_plus' },
          }),
          {
            settings: { isPaidUser: false },
            profilePageBucket: 'B',
          },
        );
        const eoi = mount(<Eoi {...skuProps} />);
        expect(eoi.find('[data-viewcontact=true]').exists()).toBe(true);
      });
    });
  });
});
