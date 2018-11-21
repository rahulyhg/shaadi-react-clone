import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployerField from './EmployerField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('employer field when Canadian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ workingWith: 'Not Working' })}>
      <Provider store={store}>
        <Router>
          <EmployerField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as employer', () => {
    expect(mountedComponent.find('input[type="text"][name="employer"]').exists()).toBeFalsy();
  });
});

describe('employer field when USA user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ workingWith: 'Private Company' })}>
      <Provider store={store}>
        <Router>
          <EmployerField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as employer', () => {
    expect(mountedComponent.find('input[type="text"][name="employer"]').exists()).toBeTruthy();
  });
});

describe('employer field when USA user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ workingWith: 'Business / Self Employed' })}>
      <Provider store={store}>
        <Router>
          <EmployerField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as employer', () => {
    expect(mountedComponent.find('input[type="text"][name="employer"]').exists()).toBeTruthy();
  });
});
