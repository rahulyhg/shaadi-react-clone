import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi chat connectionStatus: default', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });

      describe('chat window and profileCard default case', () => {
        const props = eoiProps('chat', { flags: { connectionStatus: 'default' } });
        const eoi = mount(<Eoi {...props} />);

        it('should render connect button', () => {
          const button = eoi.find('button');
          expect(button.text()).toContain(`Connect`);
        });
      });
    });
  });
});
