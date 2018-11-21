import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: ignored', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      const ignoredMessage = `${profile.heShe} will not be shown in your Search or Matches the next time you login.`;
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'ignored' } });
        it('should render ignored message', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('p')
              .first()
              .text(),
          ).toBe(ignoredMessage);
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'ignored' } });
        it('should render ignored message', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('div')
              .last()
              .text(),
          ).toBe('Added to Ignored list');
        });
      });
      describe('type: premiumCarousel', () => {
        const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'ignored' } });
        it('should render ignored message', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('div')
              .last()
              .text(),
          ).toBe('Ignored');
        });
      });
    });
  });
});
