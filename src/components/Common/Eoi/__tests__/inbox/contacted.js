import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi inbox connectionStatus: contacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: inbox', () => {
        const props = eoiProps('inbox', { flags: { connectionStatus: 'contacted' } });
        it('should render awaiting text', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('span')
              .at(0)
              .text(),
          ).toBe('Waiting for a response?');
        });

        const buttonSet = [{ index: 0, type: 'remind', title: 'Remind' }, { index: 1, type: 'cancel', title: 'Cancel' }];
        buttonSet.forEach(({ index, type, title, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            const buttons = eoi.find('button');
            const button = buttons.find(`[title="${title}"]`);
            expect(button.length).toBe(1);
          });
        });
      });
    });
  });
});
