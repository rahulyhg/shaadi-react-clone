import React from 'react';
import { mount } from 'enzyme';
import TopBandAndSkipLink from '../../RevampPaymentPage/TopBandAndSkipLink';
import factory from '../utils/factory';

jest.mock('../../../Common/Link');
describe('Top Band And Skip Link', () => {
  describe('should render', () => {
    describe('Top Band And Skip Link', () => {
      const props = {
        ...factory.topBandProps,
        location: {
          hash: '',
          pathname: '/payment',
          search: '',
        },
        wwwBaseUrl: '',
        skipProfileId: '',
        showSkipLink: true,
      };
      it('Top Band With Skip Link', () => {
        const topBandAndSkipLink = mount(<TopBandAndSkipLink {...props} />);
        expect(topBandAndSkipLink.text()).toContain("I'll do this later");
      });
      it('Top Band Without Skip Link', () => {
        const topBandAndSkipLink = mount(<TopBandAndSkipLink {...props} showSkipLink={false} />);
        expect(topBandAndSkipLink.text()).toContain('');
      });
    });
  });
});
