import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AnnualIncomeField from './AnnualIncomeField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('income field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <AnnualIncomeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as income', () => {
    expect(mountedComponent.find('input[type="text"][name="income"]').exists()).toBeTruthy();
  });
});
