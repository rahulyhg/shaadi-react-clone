import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi profile connectionStatus: misuseReported', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({
        type,
        profile: deepExtend({}, profile, over),
        ...factory.props,
        onAction,
        justNow: true,
        justNowText: 'Complaint raised for issue',
      });

      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: profile', () => {
        const props = eoiProps('profile', { flags: { connectionStatus: 'misuseReported' } });
        it('should render nothing', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.text()).toContain('Complaint raised for issue');
        });
      });
    });
  });
});
