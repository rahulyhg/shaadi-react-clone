import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: cancelled', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'cancelled', membershipTags: 'free' } });
        it(`should render only yes button`, () => {
          const eoi = mount(<Eoi {...props} />);
          expect(global.ShaadiDataLayer.length).toEqual(0);
          expect(onAction).not.toHaveBeenCalled();
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
          expect(global.ShaadiDataLayer.length).toEqual(0);
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'cancelled', membershipTags: 'free' } });
        it(`should render only yes button`, () => {
          const eoi = mount(<Eoi {...props} />);
          expect(onAction).not.toHaveBeenCalled();
          expect(global.ShaadiDataLayer.length).toEqual(0);
          const buttons = eoi.find('button');
          const button = buttons.first();
          expect(buttons.length).toBe(1);
          expect(button.text()).toEqual('Yes');
          button.simulate('click');
          expect(onAction).toHaveBeenCalledWith(profile.uid, 'connect');
          expect(global.ShaadiDataLayer.length).toEqual(1);
        });
      });
    });
  });
});
