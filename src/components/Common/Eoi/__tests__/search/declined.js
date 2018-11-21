import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';
import Timer from '../../../../../helpers/timer';

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
        it('should render Declined Member', () => {
          const props = eoiProps('list', { flags: { connectionStatus: 'declined' } });
          const eoi = mount(<Eoi {...props} />);
          expect(eoi).toHaveText(`You declined ${props.profile.hisHer.toLowerCase()} Invitation`);
        });

        it('should render Deleted', () => {
          const props = eoiProps('list', { flags: { connectionStatus: 'declined', isDeleted: true } });
          const eoi = mount(<Eoi {...props} />);
          expect(eoi).toHaveText('Deleted');
        });
      });

      describe('type: grid', () => {
        it('should render Declined Member', () => {
          const props = eoiProps('grid', { flags: { connectionStatus: 'declined' } });
          const eoi = mount(<Eoi {...props} />);
          expect(eoi).toHaveText('Declined');
        });
        it('should render Deleted', () => {
          const props = eoiProps('grid', { flags: { connectionStatus: 'declined', isDeleted: true } });
          const eoi = mount(<Eoi {...props} />);
          expect(eoi).toHaveText('Deleted');
        });
      });
      describe('type: premiumCarousel', () => {
        it('should render Declined Member', () => {
          const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'declined' } });
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.find(Timer).get(0)).toBeTruthy();
        });
        it('should render Deleted', () => {
          const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'declined', isDeleted: true } });
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.find(Timer).get(0)).toBeTruthy();
        });
      });
    });
  });
});
