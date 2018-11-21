import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import GotraField from './GotraField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('gotra field when non nri plus country user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Canada' })}>
      <Provider store={store}>
        <Router>
          <GotraField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="gotra"]').exists()).toBeFalsy();
  });
});

describe('gotra field when empty caste field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: '' })}>
      <Provider store={store}>
        <Router>
          <GotraField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as gotra', () => {
    expect(mountedComponent.find('input[type="text"][name="gotra"]').exists()).toBeFalsy();
  });
});

describe('gotra field when Indian user with valid eligible caste value', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: 'Chandravanshi Kahar' })}>
      <Provider store={store}>
        <Router>
          <GotraField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as gotra', () => {
    expect(mountedComponent.find('input[type="text"][name="gotra"]').exists()).toBeTruthy();
  });
});
