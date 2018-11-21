import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: blocked', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'blocked' } });
        it('should render nothing', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toEqual('');
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'blocked' } });
        it('should render nothing', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toEqual('Blocked Member');
        });
      });
      describe('type: premiumCarousel', () => {
        const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'blocked' } });
        it('should render nothing', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toEqual('Blocked');
        });
      });
    });
  });
});
