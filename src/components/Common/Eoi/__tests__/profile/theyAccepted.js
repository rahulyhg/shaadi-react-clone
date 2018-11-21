import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: theyAccepted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: profile', () => {
        const props = eoiProps('profile', { flags: { connectionStatus: 'theyAccepted' } });
        it('should render accepted section', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain('Accepted Member Take the next step...');
        });
        const buttons = [
          { index: 0, type: 'sendEmail', text: 'Send Email', onClickArgs: ['sendEmail'] },
          { index: 1, type: 'cancel', text: 'Cancel', onClickArgs: ['cancel_invitation'] },
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
            expect(global.ShaadiDataLayer.length).toEqual(1);
          });
        });
      });
    });
  });
});
