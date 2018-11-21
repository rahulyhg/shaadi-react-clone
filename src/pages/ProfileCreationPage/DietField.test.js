import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import DietField from './DietField';
import getContext from './utils/sampleContext';
import ContextProvider from '../../components/Common/Context';
import initializeStore from '../../store';

const store = initializeStore();

describe('diet field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <DietField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as diet', () => {
    expect(mountedComponent.find('input[type="text"][name="diet"]').exists()).toBeTruthy();
  });
});
