import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import RegionalSiteField from './RegionalSiteField';
import getContext from './utils/sampleContext';
import ContextProvider from '../../components/Common/Context';
import api from '../../api';
import initializeStore from '../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('regional Site field when non eligible mother tongue', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ motherTongue: 'English' })}>
      <Provider store={store}>
        <Router>
          <RegionalSiteField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="regionalSite"]').exists()).toBeFalsy();
  });
});

describe('regional Site field when NRI', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Canada' })}>
      <Provider store={store}>
        <Router>
          <RegionalSiteField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as regionalSite', () => {
    expect(mountedComponent.find('input[type="text"][name="regionalSite"]').exists()).toBeFalsy();
  });
});

describe('regional Site field when Indian user with valid eligible mother tongue value', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'India', motherTongue: 'Gujarati' })}>
      <Provider store={store}>
        <Router>
          <RegionalSiteField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as regionalSite', () => {
    expect(mountedComponent.find('input[type="text"][name="regionalSite"]').exists()).toBeTruthy();
  });
});

describe('regional Site field when eligible mother tongue and is native app', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'India', motherTongue: 'Gujarati', search: '?os=native-android' })}>
      <Provider store={store}>
        <Router>
          <RegionalSiteField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="regionalSite"]').exists()).toBeFalsy();
  });
});
