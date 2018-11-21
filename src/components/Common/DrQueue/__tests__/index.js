import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import DrQueue from '../../DrQueue';
import initializeStore from '../../../../store';
import factory from './utils/factory';

const store = initializeStore();

describe('DrQueue', () => {
  describe('Dr DrQueue length should be equal to props queue length', () => {
    it('should mount', () => {
      const props = factory.allData;
      const drQueue = mount(
        <Provider store={store}>
          <Router>
            <DrQueue {...props} />
          </Router>
        </Provider>,
      );
      expect(drQueue.find('img').length).toBe(props.queue.length);
    });
  });
});
