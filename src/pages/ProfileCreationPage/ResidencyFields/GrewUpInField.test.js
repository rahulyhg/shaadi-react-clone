import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import GrewUpInField from './GrewUpInField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import { theme } from '../../../components/Common/FormElements/theme';
import api from '../../../api';
import initializeStore from '../../../store';

const store = initializeStore();

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe('grew up in field when Indian user', () => {
  const component = mount(
    <ContextProvider {...getContext({ country: 'India' })}>
      <Provider store={store}>
        <Router>
          <GrewUpInField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(component.find('input[type="text"][name="grewUpIn"]').exists()).toBeFalsy();
  });
});

describe('grew up in field when NRI+ user and living since is since birth', () => {
  const component = mount(
    <ContextProvider {...getContext({ country: 'Australia', livingSince: 'Birth' })}>
      <Provider store={store}>
        <Router>
          <GrewUpInField />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(component.find('input[type="text"][name="grewUpIn"]').exists()).toBeFalsy();
  });
});

describe('grew up in field when NRI+ user and living since is not birth or within 3 years after birth', () => {
  const component = mount(
    <MuiThemeProvider theme={theme}>
      <ContextProvider {...getContext({ country: 'Australia', livingSince: '2012' })}>
        <Provider store={store}>
          <Router>
            <GrewUpInField />
          </Router>
        </Provider>
      </ContextProvider>
    </MuiThemeProvider>,
  );
  it('should have an input text field having name as grewUpIn', () => {
    expect(component.find('input[type="text"][name="grewUpIn"]').exists()).toBeTruthy();
  });
});

describe('grew up in field when NRI user but NRI+ user', () => {
  const component = mount(
    <MuiThemeProvider theme={theme}>
      <ContextProvider {...getContext({ country: 'UAE' })}>
        <Provider store={store}>
          <Router>
            <GrewUpInField />
          </Router>
        </Provider>
      </ContextProvider>
    </MuiThemeProvider>,
  );
  it('should have an input text field having name as grewUpIn', () => {
    expect(component.find('input[type="text"][name="grewUpIn"]').exists()).toBeTruthy();
  });
});
