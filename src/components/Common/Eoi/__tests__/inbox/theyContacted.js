import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi Inbox connectionStatus: theyContacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: inbox', () => {
        const buttonsSet = [
          { type: 'accept', title: 'Accept', onClickArgs: ['accept'] },
          { type: 'decline', title: 'Decline', onClickArgs: ['decline'] },
        ];
        const props = eoiProps('inbox', { flags: { connectionStatus: 'theyContacted', isFree: false, membershipTags: 'gold_plus' } });
        const settings = { ...props.settings, isPaidUser: true };
        it('should render decline, delete & decline with message', () => {
          const eoi = mount(<Eoi {...props} settings={settings} />);
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(3);
        });
        buttonsSet.forEach(({ type, title, onClickArgs }) => {
          it(`should render ${type} button`, () => {
            const eoi = mount(<Eoi {...props} settings={settings} />);
            const buttons = eoi.find('button');
            const button = buttons.find(`[title="${title}"]`);
            expect(button.length).toBe(1);
            expect(onAction).not.toHaveBeenCalled();
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
          });
        });
      });
    });
  });
});
