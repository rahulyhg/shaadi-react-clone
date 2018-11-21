import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import RashiField from './RashiField';
import context from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

describe('rashi field when sub caste value is not others', () => {
  const mountedComponent = mount(
    <ContextProvider {...context({ rashi: 'Makar' })}>
      <Provider store={store}>
        <Router>
          <RashiField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="rashi"]').exists()).toBeFalsy();
  });
});

describe('rashi field when valid nakshatra value present', () => {
  api.get = () =>
    new Promise((resolve, reject) => {
      resolve({ data: [{ id: 'Kumbh', text: 'Kumbh' }, { id: 'Makra', text: 'Makra' }] });
    });
  const mountedComponent = mount(
    <ContextProvider {...context({ nakshatra: 'Bharani' })}>
      <Provider store={store}>
        <Router>
          <RashiField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as rashi', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2; // eslint-disable-line no-undef
    setTimeout(() => {
      done();
      expect(mountedComponent.find('input[type="text"][name="rashi"]').exists()).toBeTruthy();
    }, 1);
  });
});
