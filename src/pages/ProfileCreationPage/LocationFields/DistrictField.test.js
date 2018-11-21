import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import DistrictField from './DistrictField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('district field when Indian user having illegible state selected and city as other', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'India', city: 'Other', state: 'Bihar' })}>
      <Provider store={store}>
        <Router>
          <DistrictField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="district"]').exists()).toBeFalsy();
  });
});

describe('district field when Indian user having eligible state selected and city not as other', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'India', city: 'Test', state: 'Kerala' })}>
      <Provider store={store}>
        <Router>
          <DistrictField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="district"]').exists()).toBeFalsy();
  });
});

describe('district field when Indian user having eligible state selected and city as other', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'India', city: 'Other', state: 'Kerala' })}>
      <Provider store={store}>
        <Router>
          <DistrictField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as district', () => {
    expect(mountedComponent.find('input[type="text"][name="district"]').exists()).toBeTruthy();
  });
});
