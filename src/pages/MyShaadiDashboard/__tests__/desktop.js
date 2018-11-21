import React from 'react';
import { shallow } from 'enzyme';

import { MyShaadiDashboardDesktop } from '../desktop';
import factory from './utils/factory';

const makeProps = (props = {}) => ({
  ...MyShaadiDashboardDesktop.mapStateToProps(factory),
  ...props,
});

describe('<MyShaadiDashboardDesktop />', () => {
  describe('init', () => {
    it('should render', () => {
      shallow(<MyShaadiDashboardDesktop {...makeProps()} />);
    });
  });
});
