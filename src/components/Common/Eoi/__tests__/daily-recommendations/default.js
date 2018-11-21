import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi dailyRecommendations connectionStatus: default', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.dr, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: dailyRecommendations', () => {
        const props = eoiProps('dailyRecommendations', { flags: { connectionStatus: 'default', membershipTags: 'free' } });
        const buttons = [
          { index: 1, type: 'yes', text: 'Yes', element: 'button' },
          { index: 2, type: 'no', text: 'No', element: 'button' },
        ];
        buttons.forEach(({ index, type, text, element, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            const button = eoi.find(element).at(index);
            expect(button.text()).toEqual(text);
          });
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
