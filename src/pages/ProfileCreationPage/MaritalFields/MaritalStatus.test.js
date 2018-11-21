import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import MaritalStatusField from './MaritalStatusField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();

describe('marital status field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <MaritalStatusField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as maritalStatus', () => {
    expect(mountedComponent.find('input[type="text"][name="maritalStatus"]').exists()).toBeTruthy();
  });
});
