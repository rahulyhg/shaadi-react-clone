import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import CountryCodeField from './CountryCodeField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: { list: [{ id: 'Other', text: 'Other' }], default: { id: '+91|India' } } });
  });

describe('country code field on page load', () => {
  const component = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <CountryCodeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as countryCode', () => {
    expect(component.find('input[type="text"][name="countryCode"]').exists()).toBeTruthy();
  });
});
