import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import TrustBadge from '../../TrustBadge';
import initializeStore from '../../../store';
import factory from './utils/factory';

const store = initializeStore();

describe('TrustBadge', () => {
  const onAction = jest.fn();
  describe('Trust Badge for profile page', () => {
    it('should mount', () => {
      const props = {
        ...factory.allData,
        onBlockClick: onAction,
        onMisuseClick: onAction,
        isDR: false,
      };
      const trustBadge = mount(
        <Provider store={store}>
          <Router>
            <TrustBadge {...props} />
          </Router>
        </Provider>,
      );
      expect(trustBadge.text().indexOf('Report Profile/Photos')).toBe(67);
    });
  });

  describe('Trust Badge for DR page', () => {
    it('should mount', () => {
      const props = {
        ...factory.allData,
        onBlockClick: onAction,
        onMisuseClick: onAction,
        isDR: true,
      };
      const trustBadge = mount(
        <Provider store={store}>
          <Router>
            <TrustBadge {...props} />
          </Router>
        </Provider>,
      );
      expect(trustBadge.text().indexOf('Report Profile/Photos')).toBe(-1);
    });
  });
});
