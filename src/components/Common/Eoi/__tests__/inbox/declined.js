import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi inbox connectionStatus: declined', () => {
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

      describe('type: inbox', () => {
        const props = eoiProps('inbox', { flags: { connectionStatus: 'declined' } });
        it('should render Declined Member', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('p')
              .at(0)
              .text(),
          ).toBe('Changed Your Mind?');
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
          const button = buttons.first();
          button.simulate('click');
          expect(onAction).toHaveBeenCalledWith(profile.uid, 'accept');
        });
        const buttonSet = [{ index: 0, type: 'accept', title: 'Accept', onClickArgs: ['accept'] }];
        buttonSet.forEach(({ index, type, title, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            const buttons = eoi.find('button');
            const button = buttons.find(`[title="${title}"]`);
            expect(button.length).toBe(1);
          });
        });
      });
    });
  });
});
