import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');
describe('Eoi Inbox connectionStatus: accepted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({
        type,
        profile: deepExtend({}, profile, over),
        ...factory.props,
        onAction,
        onChatNow: onAction,
        onShowContactDetails: onAction,
      });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: inbox paid', () => {
        const buttonsSet = [
          { index: 0, type: 'write message', title: 'Write Message', onClickArgs: ['chat_now'] },
          { index: 1, type: 'view contact', title: 'View Contact', onClickArgs: ['view_contact'] },
        ];
        const props = deepExtend({}, eoiProps('inbox', { flags: { connectionStatus: 'accepted', isFree: false } }), {
          settings: { isPaidUser: true },
        });
        it('should render paid member text', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toBe(`Contact ${props.profile.himHer.toLowerCase()} directly`);
        });

        buttonsSet.forEach(({ index, type, title, onClickArgs }) => {
          it(`should render ${type} buttons`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            expect(global.ShaadiDataLayer.length).toEqual(0);
            const buttons = eoi.find('button');
            const button = buttons.find(`[title="${title}"]`);
            expect(button.length).toBe(1);
            // button.simulate('click');
            // expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            // expect(global.ShaadiDataLayer.length).toEqual(1);
          });
        });
      });

      describe('type: inbox free', () => {
        const buttonsSet = [
          { index: 0, type: 'write message', title: 'Write Message', onClickArgs: ['chat_now'] },
          { index: 1, type: 'view contact', title: 'View Contact', onClickArgs: ['view_contact'] },
        ];

        const props = eoiProps('inbox', { flags: { connectionStatus: 'accepted', isFree: true } });
        it('should render free member text', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toBe(`Upgrade to Contact ${props.profile.himHer.toLowerCase()} directly`);
        });

        it('should render free member text for diamond plus and platinum plus profile accept', () => {
          const skuprops = eoiProps('inbox', {
            flags: { connectionStatus: 'accepted', isFree: true, canCommunicate: true, membershipTags: 'diamond_plus' },
          });
          const eoi = mount(<Eoi {...skuprops} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toBe(`You can contact a Diamond+ Member`);
        });

        buttonsSet.forEach(({ index, type, title, onClickArgs }) => {
          it(`should render ${type} buttons`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            expect(global.ShaadiDataLayer.length).toEqual(0);
            const buttons = eoi.find('button');
            const button = buttons.find(`[title="${title}"]`);
            expect(button.length).toBe(1);
            // button.simulate('click');
            // expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            // expect(global.ShaadiDataLayer.length).toEqual(1);
          });
        });
      });
    });
  });
});
