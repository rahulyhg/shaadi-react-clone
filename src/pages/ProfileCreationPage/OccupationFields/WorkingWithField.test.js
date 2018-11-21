import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import WorkingWithField from './WorkingWithField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();

describe('working with field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <WorkingWithField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as workingWith', () => {
    expect(mountedComponent.find('input[type="text"][name="workingWith"]').exists()).toBeTruthy();
  });
});
