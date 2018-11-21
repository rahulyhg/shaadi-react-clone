import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: declined', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'accepted' } });
        it('should render Accepted Member', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toBe(`Invitation AcceptedUpgrade to contact ${props.profile.himHer.toLowerCase()} directly`); // eslint-disable-line
        });

        it('on accept for diamond or platinum plus member should render response', () => {
          const eoiData = eoiProps('list', {
            flags: { connectionStatus: 'accepted', canCommunicate: true, membershipTags: 'diamond_plus' },
          });
          const eoi = mount(<Eoi {...eoiData} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toContain('Invitation Accepted');
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'accepted' } });
        it('should render Accepted Member', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('div')
              .last()
              .text(),
          ).toBe('Accepted Member');
        });
      });
    });
  });
});
