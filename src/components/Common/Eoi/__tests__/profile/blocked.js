import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: blocked', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: profile', () => {
        const props = eoiProps('profile', { flags: { connectionStatus: 'blocked' } });
        it('should render unblock section', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain('Blocked Member. Changed your Mind?');
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
        });

        const buttons = [
          { index: 0, type: 'unblock', text: 'Unblock', onClickArgs: ['unblock'] },
          { index: 1, type: 'maybe', text: 'Report Profile/Photos', onClickArgs: ['reportMisuse'] },
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
