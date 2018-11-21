import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: shortlisted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: profile', () => {
        const props = eoiProps('profile', { flags: { connectionStatus: 'shortlisted', membershipTags: 'free' }, shortlists: { count: 2 } });
        const buttons = [
          { index: 0, type: 'yes', text: 'Yes' },
          { index: 1, type: 'no', text: 'No' },
          { index: 2, type: 'maybe', text: '2 Shortlists' },
        ];
        buttons.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
          });
        });
      });
    });
  });
});
