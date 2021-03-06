import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import EducationLevelField from './EducationLevelField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();

describe('education level field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <EducationLevelField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as educationLevel', () => {
    expect(mountedComponent.find('input[type="text"][name="educationLevel"]').exists()).toBeTruthy();
  });
});
