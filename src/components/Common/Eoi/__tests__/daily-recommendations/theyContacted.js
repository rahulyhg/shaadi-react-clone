import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi dailyRecommendations connectionStatus: theyContacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.dr, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: dailyRecommendations & logger paid', () => {
        const props = eoiProps('dailyRecommendations', {
          flags: { connectionStatus: 'theyContacted', isFree: false, membershipTags: 'gold_plus' },
        });
        const settings = { ...props.settings, isPaidUser: true };
        it('should render Yes, No', () => {
          const eoi = mount(<Eoi {...props} settings={settings} />);
          const buttons = eoi.find('button');
          expect(buttons.at(1).text()).toEqual('Yes');
          expect(buttons.at(2).text()).toEqual('No');
        });
        it('should render theyContacted message', () => {
          const eoi = mount(<Eoi {...props} settings={settings} />);
          expect(eoi.text()).toContain(`This Member has invited you to connect!`);
        });

        it('before connect for diamond or platinum plus member should render Free Access Tag', () => {
          const eoiData = eoiProps('list', {
            flags: { connectionStatus: 'default', canCommunicate: true, membershipTags: 'diamond_plus' },
          });
          const eoi = mount(<Eoi {...eoiData} />);
          expect(eoi.find('[data-test-selector="sku_exclusive_feature"]').exists()).toBe(true);
          expect(
            eoi
              .find('[data-test-selector="sku_exclusive_feature"]')
              .first()
              .text(),
          ).toContain('FREE ACCESS');
        });
      });
    });
  });
});
