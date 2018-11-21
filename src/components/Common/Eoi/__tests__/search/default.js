import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';
import PremiumButton from '../../../PremiumButton';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: default', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'default', membershipTags: 'free' } });
        const buttons = [
          { index: 0, type: 'yes', text: '', onClickArgs: ['connect'] },
          { index: 1, type: 'maybe', text: 'Connect Now', onClickArgs: ['connect'] },
        ];
        buttons.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(global.ShaadiDataLayer.length).toEqual(0);
            expect(onAction).not.toHaveBeenCalled();
            const button = eoi.find('button').at(index);
            if (button.length) {
              expect(button.text()).toEqual(text);
              button.simulate('click');
            }
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            expect(global.ShaadiDataLayer.length).toEqual(1);
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

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'default', membershipTags: 'free' } });
        const buttons = [
          { index: 0, type: 'yes', text: 'Yes', onClickArgs: ['connect'] },
          { index: 1, type: 'maybe', text: '', onClickArgs: ['addToShortlist', ['123']] },
          { index: 2, type: 'no', text: '', onClickArgs: ['ignore'] },
        ];
        buttons.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(global.ShaadiDataLayer.length).toEqual(0);
            expect(onAction).not.toHaveBeenCalled();
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            expect(global.ShaadiDataLayer.length).toEqual(index === 1 ? 0 : 1);
          });
        });
      });
      describe('type:premiumCarousel', () => {
        const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'default', membershipTags: 'free' } });

        it('has a working Connect button', done => {
          const onClickArgs = ['connect_premium_carousel'];
          const eoi = mount(<Eoi {...props} />);

          expect(global.ShaadiDataLayer.length).toEqual(0);
          expect(onAction).not.toHaveBeenCalled();

          const button = eoi.find(PremiumButton).at(0);
          button.instance().buttonClick({});
          setTimeout(() => {
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            expect(global.ShaadiDataLayer.length).toEqual(1);
            done();
          }, 500);
        });
      });
    });
  });
});
