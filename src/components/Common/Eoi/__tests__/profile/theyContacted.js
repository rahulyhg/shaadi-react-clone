import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: theyContacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: profile & logger paid', () => {
        const buttonsSet = [
          { index: 0, type: 'accept', text: 'Accept', onClickArgs: ['accept'] },
          { index: 1, type: 'decline_with_delete', text: 'Delete from Inbox', onClickArgs: ['decline_with_delete'] },
        ];
        const props = eoiProps('profile', { flags: { connectionStatus: 'theyContacted', isFree: false, membershipTags: 'gold_plus' } });
        const settings = { ...props.settings, isPaidUser: true };
        it('should render decline, delete ', () => {
          const eoi = mount(<Eoi {...props} settings={settings} />);
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
        });
        buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
          it(`should render ${type} button`, () => {
            const eoi = mount(<Eoi {...props} settings={settings} />);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            expect(onAction).not.toHaveBeenCalled();
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
          });
        });
      });

      describe('type: profile free & logger paid', () => {
        const buttonsSet = [
          { index: 0, type: 'accept', text: 'Accept', onClickArgs: ['accept'] },
          { index: 1, type: 'decline_with_delete', text: 'Delete from Inbox', onClickArgs: ['decline_with_delete'] },
        ];
        const props = eoiProps('profile', { flags: { connectionStatus: 'theyContacted', isFree: true, membershipTags: 'gold_plus' } });
        const settings = { ...props.settings, isPaidUser: true };
        it('should render decline, delete ', () => {
          const eoi = mount(<Eoi {...props} settings={settings} />);
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
        });
        buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
          it(`should render ${type} button`, () => {
            const eoi = mount(<Eoi {...props} settings={settings} />);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            expect(onAction).not.toHaveBeenCalled();
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
          });
        });
      });

      describe('type: profile & logger free', () => {
        const buttonsSet = [
          { index: 0, type: 'accept', text: 'Accept', onClickArgs: ['accept'] },
          { index: 1, type: 'decline_with_delete', text: 'Delete from Inbox', onClickArgs: ['decline_with_delete'] },
        ];
        const props = eoiProps('profile', { flags: { connectionStatus: 'theyContacted', isFree: true, membershipTags: 'free' } });
        const settings = { ...props.settings, isPaidUser: false };
        it('should render decline, delete ', () => {
          const eoi = mount(<Eoi {...props} settings={settings} />);
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
        });
        buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
          it(`should render ${type} button`, () => {
            const eoi = mount(<Eoi {...props} settings={settings} />);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            expect(onAction).not.toHaveBeenCalled();
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
          });
        });
      });

      describe('type: profile paid & logger free', () => {
        const buttonsSet = [
          { index: 0, type: 'accept', text: 'Accept', onClickArgs: ['accept'] },
          { index: 1, type: 'decline_with_delete', text: 'Delete from Inbox', onClickArgs: ['decline_with_delete'] },
        ];
        const props = eoiProps('profile', { flags: { connectionStatus: 'theyContacted', isFree: false, membershipTags: 'free' } });
        const settings = { ...props.settings, isPaidUser: false };
        it('should render decline, delete ', () => {
          const eoi = mount(<Eoi {...props} settings={settings} />);
          const buttons = eoi.find('button');
          expect(buttons.length).toBe(2);
        });
        buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
          it(`should render ${type} button`, () => {
            const eoi = mount(<Eoi {...props} settings={settings} />);
            const button = eoi.find('button').at(index);
            expect(button.text()).toEqual(text);
            expect(onAction).not.toHaveBeenCalled();
            button.simulate('click');
            expect(onAction).toHaveBeenCalledWith(profile.uid, ...onClickArgs);
          });
        });
      });
    });
  });
});
