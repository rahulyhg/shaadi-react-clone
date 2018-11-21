import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi chat connectionStatus: accepted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({
        type,
        profile: deepExtend({}, profile, over),
        ...factory.props,
        onAction,
      });

      describe('chat window and profileCard accepted case', () => {
        const props = eoiProps('chat', { flags: { connectionStatus: 'accepted' } });
        it('should render Accepted just now text', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain(`Accepted`);
        });
      });
    });
  });
});
