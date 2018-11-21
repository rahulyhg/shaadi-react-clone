import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi chat connectionStatus: contacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({
        type,
        profile: deepExtend({}, profile, over),
        ...factory.props,
        onAction,
        onChatNow: onAction,
      });

      describe('chatwindow and profilecard msg cases for contacted case', () => {
        const props = eoiProps('chat', { flags: { connectionStatus: 'contacted' } });
        it('should render contacted just now text', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain(`Invitation Sent`);
        });
      });
    });
  });
});
