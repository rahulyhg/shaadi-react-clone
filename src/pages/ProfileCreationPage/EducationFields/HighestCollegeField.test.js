import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import HighestCollegeField from './HighestCollegeField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('highest college field when education level is empty', () => {
  const component = mount(
    <ContextProvider {...getContext({ educationLevel: '' })}>
      <Provider store={store}>
        <Router>
          <HighestCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as highestCollege', () => {
    expect(component.find('input[type="text"][name="highestCollege"]').exists()).toBeFalsy();
  });
});

describe('highest college field when education level is Less than high school', () => {
  const component = mount(
    <ContextProvider {...getContext({ educationLevel: 'Less than high school' })}>
      <Provider store={store}>
        <Router>
          <HighestCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as highestCollege', () => {
    expect(component.find('input[type="text"][name="highestCollege"]').exists()).toBeFalsy();
  });
});

describe('highest college field when education level is Bachelor', () => {
  const component = mount(
    <ContextProvider {...getContext({ educationLevel: 'Bachelor' })}>
      <Provider store={store}>
        <Router>
          <HighestCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as highestCollege', () => {
    expect(component.find('input[type="text"][name="highestCollege"]').exists()).toBeTruthy();
  });
});

describe('highest college field when education level is Doctorate', () => {
  const component = mount(
    <ContextProvider {...getContext({ educationLevel: 'Doctorate' })}>
      <Provider store={store}>
        <Router>
          <HighestCollegeField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as highestCollege', () => {
    expect(component.find('input[type="text"][name="highestCollege"]').exists()).toBeTruthy();
  });
});
