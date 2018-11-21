import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AnotherCollegeField from './AnotherCollegeField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('another college field when education level is empty', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ educationLevel: '' })}>
      <Provider store={store}>
        <Router>
          <AnotherCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as anotherCollege', () => {
    expect(mountedComponent.find('input[type="text"][name="anotherCollege"]').exists()).toBeFalsy();
  });
});

describe('another college field when education level is Less than high school', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ educationLevel: 'Less than high school' })}>
      <Provider store={store}>
        <Router>
          <AnotherCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as anotherCollege', () => {
    expect(mountedComponent.find('input[type="text"][name="anotherCollege"]').exists()).toBeFalsy();
  });
});

describe('another college field when education level is Bachelor', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ educationLevel: 'Bachelor' })}>
      <Provider store={store}>
        <Router>
          <AnotherCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as anotherCollege', () => {
    expect(mountedComponent.find('input[type="text"][name="anotherCollege"]').exists()).toBeFalsy();
  });
});

describe('another college field when education level is Doctorate', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ educationLevel: 'Doctorate' })}>
      <Provider store={store}>
        <Router>
          <AnotherCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as anotherCollege', () => {
    expect(mountedComponent.find('input[type="text"][name="anotherCollege"]').exists()).toBeTruthy();
  });
});
