import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import CasteField from './CasteField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [] });
  });

describe('caste field when religion is Others', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ religion: 'Others' })}>
      <Provider store={store}>
        <Router>
          <CasteField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="caste"]').exists()).toBeFalsy();
  });
});

describe('caste field when religion is Spiritual', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ religion: 'Spiritual' })}>
      <Provider store={store}>
        <Router>
          <CasteField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="caste"]').exists()).toBeFalsy();
  });
});

describe("caste field when user belongs to a community's religion", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: '' })}>
      <Provider store={store}>
        <Router>
          <CasteField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as caste', () => {
    expect(mountedComponent.find('input[type="text"][name="caste"]').exists()).toBeTruthy();
  });
});
