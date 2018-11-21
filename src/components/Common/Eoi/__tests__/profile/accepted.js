import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: accepted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        global.ShaadiDataLayer = [];
        onAction.mockClear();
      });

      describe('type: profile paid', () => {
        const buttonsSet = [
          { index: 0, type: 'send email', text: 'Send Email', onClickArgs: ['sendEmail'] },
          { index: 1, type: 'decline with message', text: 'Decline with message', onClickArgs: ['decline_with_message'] },
        ];
        const buttonsSetWithHistory = [
          ...buttonsSet,
          { index: 2, type: 'view history', text: 'View History', onClickArgs: ['view_history'] },
        ];
        const props = eoiProps('profile', { flags: { connectionStatus: 'accepted', isFree: false } });
        it('should render Accepted Member', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('p')
              .first()
              .text(),
          ).toBe('Accepted Member. Take the next step...');
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
        });
        const propsWithHistory = eoiProps('profile', {
          flags: { connectionStatus: 'accepted', isBothPartyPayUser: false, showHistory: true, isFree: false },
        });
        it('should render Accepted Member with history link', () => {
          const eoi = mount(<Eoi {...propsWithHistory} />);
          expect(
            eoi
              .find('p')
              .first()
              .text(),
          ).toBe('Accepted Member. Take the next step...');
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(3);
        });
        buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button without history`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            expect(global.ShaadiDataLayer.length).toEqual(0);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            expect(global.ShaadiDataLayer.length).toEqual(1);
          });
        });

        buttonsSetWithHistory.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button with history`, () => {
            const eoi = mount(<Eoi {...propsWithHistory} />);
            expect(onAction).not.toHaveBeenCalled();
            expect(global.ShaadiDataLayer.length).toEqual(0);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            expect(global.ShaadiDataLayer.length).toEqual(1);
          });
        });
      });

      describe('type: profile free', () => {
        const buttonsSet = [{ index: 0, type: 'yes', text: 'Send Email', onClickArgs: ['sendEmail'] }];
        const buttonsSetWithHistory = [{ index: 1, type: 'no', text: 'View History', onClickArgs: ['view_history'] }];

        const props = eoiProps('profile', { flags: { connectionStatus: 'accepted', isFree: true } });
        it('should render Accepted Member', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('p')
              .first()
              .text(),
          ).toBe('Accepted Member. Take the next step...');
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(1);
        });

        const propsWithHistory = eoiProps('profile', {
          flags: { connectionStatus: 'accepted', isBothPartyPayUser: false, showHistory: true, isFree: true },
        });
        it('should render Accepted Member with history link', () => {
          const eoi = mount(<Eoi {...propsWithHistory} />);
          expect(
            eoi
              .find('p')
              .first()
              .text(),
          ).toBe('Accepted Member. Take the next step...');
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
        });

        buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button without history`, () => {
            const eoi = mount(<Eoi {...props} />);
            expect(onAction).not.toHaveBeenCalled();
            expect(global.ShaadiDataLayer.length).toEqual(0);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
            expect(global.ShaadiDataLayer.length).toEqual(1);
          });
        });

        buttonsSetWithHistory.forEach(({ index, type, text, onClickArgs }) => {
          it(`has a working ${type} button with history`, () => {
            const eoi = mount(<Eoi {...propsWithHistory} />);
            expect(onAction).not.toHaveBeenCalled();
            expect(global.ShaadiDataLayer.length).toEqual(0);
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
