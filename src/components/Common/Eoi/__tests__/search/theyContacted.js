import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';
import PremiumCarousel from '../../EoiTheyContacted/premiumCarousel';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: theyContacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'theyContacted', membershipTags: 'free' } });
        const buttons = [
          { index: 0, type: 'accept', text: '', onClickArgs: ['accept'] },
          { index: 2, type: 'decline', text: '', onClickArgs: ['decline'] },
          { index: 1, type: 'accept', text: 'Accept', onClickArgs: ['accept'] },
        ];

        describe('settings canConnectWithMessage: true ', () => {
          const settings = { ...props.settings, canConnectWithMessage: true };
          buttons.forEach(({ index, type, text, onClickArgs }) => {
            it(`should render ${type} button`, () => {
              const eoi = mount(<Eoi {...props} settings={settings} />);
              const button = eoi.find('button').at(index);
              expect(button.text()).toEqual(text);
              expect(onAction).not.toHaveBeenCalled();
              button.simulate('click');
              expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            });
          });
        });

        describe('settings canConnectWithMessage: false', () => {
          buttons.slice(0, 2).forEach(({ text, index }) => {
            it(`should render button with ${text}`, () => {
              const eoi = mount(<Eoi {...props} />);
              const button = eoi.find('button').at(index);
              expect(button.text()).toEqual(text);
            });
          });
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'theyContacted', membershipTags: 'free' } });
        const buttons = [
          { type: 'accept', text: 'Accept', onClickArgs: ['accept'] },
          { type: 'decline', text: 'Decline', onClickArgs: ['decline'] },
        ];

        buttons.forEach(({ type, text, onClickArgs }, index) => {
          it(`should render ${text} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            expect(onAction).not.toHaveBeenCalled();
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
          });
        });
      });

      describe('type:premiumCarousel', () => {
        const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'theyContacted', membershipTags: 'free' } });

        it('should render Accept Button', done => {
          const onClickArgs = ['accept_premium_carousel'];
          const eoi = mount(<Eoi {...props} />);

          expect(global.ShaadiDataLayer.length).toEqual(0);
          expect(onAction).not.toHaveBeenCalled();

          const button = eoi.find(PremiumCarousel).at(0);
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
