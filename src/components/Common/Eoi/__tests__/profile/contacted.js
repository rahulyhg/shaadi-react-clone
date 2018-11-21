import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: contacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: profile', () => {
        const props = eoiProps('profile', { flags: { connectionStatus: 'contacted' } });
        it('should render awaiting response', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('span')
              .at(1)
              .text(),
          ).toBe('You have sent an Invitation to this member.');
          const buttons = eoi.find('.button').hostNodes();
          expect(buttons.length).toBe(2);
        });
        const skuprops = eoiProps('profile', {
          flags: { connectionStatus: 'contacted', canCommunicate: true, membershipTags: 'diamond_plus' },
        });
        it('should render response for diamond and platinum plus user on connect', () => {
          const eoi = mount(<Eoi {...skuprops} profilePageBucket={'B'} justNow />);
          expect(
            eoi
              .find('div')
              .first()
              .text(),
          ).toContain('Invitation sent.');
        });
        const propsWithHistory = eoiProps('profile', {
          flags: { connectionStatus: 'contacted', isBothPartyPayUser: false, showHistory: true },
        });
        it('should render awaiting response with history link', () => {
          const eoi = mount(<Eoi {...propsWithHistory} />);
          expect(
            eoi
              .find('span')
              .at(1)
              .text(),
          ).toBe('You have sent an Invitation to this member.');
          const buttons = eoi.find('.button').hostNodes();
          expect(buttons.length).toBe(3);
        });
        const buttons = [{ index: 0, type: 'remind', text: 'Send Reminder' }, { index: 1, type: 'cancel', text: 'Cancel' }];
        buttons.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            const button = eoi
              .find('.button')
              .hostNodes()
              .at(index);
            expect(button.text()).toEqual(text);
          });
        });
      });
    });
  });
});
