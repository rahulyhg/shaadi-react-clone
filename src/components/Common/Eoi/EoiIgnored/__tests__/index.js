import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import EoiIgnored from '../../EoiIgnored';
import initializeStore from '../../../../../store';
import factory from './utils/factory';

const store = initializeStore();

describe('EoiIgnored', () => {
  const onAction = jest.fn();
  describe('Default EOI', () => {
    it('should mount', () => {
      const props = {
        ...factory.allData,
        onConnect: onAction,
      };
      const eoi = mount(
        <Provider store={store}>
          <Router>
            <EoiIgnored {...props} />
          </Router>
        </Provider>,
      );
      expect(eoi.text().indexOf('Added to Ignored list')).toBe(0);
    });
  });

  describe('Skip EOI', () => {
    it('should mount', () => {
      const props = {
        ...factory.allData,
        justNowText: 'removed from your recommendations',
        onConnect: onAction,
      };
      const eoi = mount(
        <Provider store={store}>
          <Router>
            <EoiIgnored {...props} />
          </Router>
        </Provider>,
      );
      expect(eoi.text().indexOf('removed from your recommendations')).toBe(0);
    });
  });
});
