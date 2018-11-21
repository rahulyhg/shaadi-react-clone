import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import EducationField from './EducationField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();

describe('education  field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <EducationField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as educationField', () => {
    expect(mountedComponent.find('input[type="text"][name="educationField"]').exists()).toBeTruthy();
  });
});
