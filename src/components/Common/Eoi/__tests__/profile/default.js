import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: default', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: profile', () => {
        const props = eoiProps('profile', { flags: { connectionStatus: 'default', membershipTags: 'free' } });
        const buttons = [{ index: 0, type: 'yes', text: 'Yes' }, { index: 1, type: 'no', text: 'No' }];
        buttons.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            const button = eoi.find('button').at(index);
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
