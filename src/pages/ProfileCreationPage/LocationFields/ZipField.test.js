import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ZipField from './ZipField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('zip field when Canadian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Canada' })}>
      <Provider store={store}>
        <Router>
          <ZipField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as zip', () => {
    expect(mountedComponent.find('input[type="text"][name="zip"]').exists()).toBeFalsy();
  });
});

describe('zip field when Australia user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Australia' })}>
      <Provider store={store}>
        <Router>
          <ZipField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as zip', () => {
    expect(mountedComponent.find('input[type="text"][name="zip"]').exists()).toBeTruthy();
  });
});

describe('zip field when United Kingdom user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'United Kingdom' })}>
      <Provider store={store}>
        <Router>
          <ZipField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as zip', () => {
    expect(mountedComponent.find('input[type="text"][name="zip"]').exists()).toBeTruthy();
  });
});

describe('zip field when New Zealand user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'New Zealand' })}>
      <Provider store={store}>
        <Router>
          <ZipField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as zip', () => {
    expect(mountedComponent.find('input[type="text"][name="zip"]').exists()).toBeTruthy();
  });
});

describe('zip field when USA user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'USA' })}>
      <Provider store={store}>
        <Router>
          <ZipField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as zip', () => {
    expect(mountedComponent.find('input[type="text"][name="zip"]').exists()).toBeTruthy();
  });
});

describe("zip field when NRI plus country user but don't remember zip checkbox ticked", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ zipStatus: true })}>
      <Provider store={store}>
        <Router>
          <ZipField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as zip', () => {
    expect(mountedComponent.find('input[type="text"][name="zip"]').exists()).toBeFalsy();
  });
});
