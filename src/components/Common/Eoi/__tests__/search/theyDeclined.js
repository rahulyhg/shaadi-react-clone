import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';
import Timer from '../../../../../helpers/timer';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: theyDeclined', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'theyDeclined' } });
        it('should render ', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toEqual(
            `${props.profile.heShe} Declined your Invitation. This member cannot be contacted.`, // eslint-disable-line no-irregular-whitespace
          );
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'theyDeclined' } });
        it('should render nothing', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toEqual('Declined');
        });
      });
      describe('type: premiumCarousel', () => {
        const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'theyDeclined' } });
        it('should render nothing', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.find(Timer).get(0)).toBeTruthy();
        });
      });
    });
  });
});
