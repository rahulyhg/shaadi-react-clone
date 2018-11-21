import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import CityField from './CityField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('city field when NRI+ user whose zip field is opted', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Australia', zipStatus: false })}>
      <Provider store={store}>
        <Router>
          <CityField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="city"]').exists()).toBeFalsy();
  });
});

describe('city field when NRI+ user whose zip field is not opted', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Australia', zipStatus: true })}>
      <Provider store={store}>
        <Router>
          <CityField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as city', () => {
    expect(mountedComponent.find('input[type="text"][name="city"]').exists()).toBeTruthy();
  });
});

describe('city field when non NRI+ country', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'India' })}>
      <Provider store={store}>
        <Router>
          <CityField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as city', () => {
    expect(mountedComponent.find('input[type="text"][name="city"]').exists()).toBeTruthy();
  });
});
