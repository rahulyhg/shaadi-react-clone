import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveFormFieldWithOptions from './ResponsiveFormFieldWithOptions';
import TextField from './TextField';
import Arrow from './Arrow';
import Relative from '../../../theme/Relative';
import getMockedHistory from '../../../__tests__/factory/utils/getMockedHistory';
import ContextProvider from '../Context';
import DrawerFields from './DrawerFields';
import initializeStore from '../../../store';

const store = initializeStore();

const mockedEvent = {
  preventDefault() {},
  stopPropagation() {},
  target: {},
  currentTarget: {},
};

const openDrawerMock = jest.fn();

const baseProps = {
  onClick: jest.fn(),
  onOptionSelection: jest.fn(),
  isMulti: false,
  name: 'test',
  label: 'test',
  deviceInfo: {
    windowHeight: 600,
  },
};

const context = {
  deviceInfo: { height: 2000, layout: 'mobile' },
  history: getMockedHistory(),
};

describe('responsive form field with options', () => {
  const component = mount(
    <ContextProvider {...context}>
      <Provider store={store}>
        <Router>
          <ResponsiveFormFieldWithOptions {...baseProps} />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should render', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('should have an input text field', () => {
    expect(component.find(TextField).exists()).toBeTruthy();
  });

  it('should have arrow component', () => {
    expect(component.find(Arrow).exists()).toBeTruthy();
  });
});

describe('drawer disabled text field on click', () => {
  // Change the viewport to 500px.
  global.innerWidth = 500;
  // Trigger the window resize event.
  global.dispatchEvent(new Event('resize'));
  const component = mount(
    <ContextProvider {...context}>
      <Provider store={store}>
        <Router>
          <ResponsiveFormFieldWithOptions {...baseProps} isDisabled />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should not open drawer', () => {
    component.simulate('mousedown', mockedEvent);
    expect(openDrawerMock).not.toHaveBeenCalled();
  });
});

describe('drawer text field on click', () => {
  // Change the viewport to 500px.
  global.innerWidth = 500;
  // Trigger the window resize event.
  global.dispatchEvent(new Event('resize'));
  const component = mount(
    <ContextProvider {...context}>
      <Provider store={store}>
        <Router>
          <ResponsiveFormFieldWithOptions {...baseProps} />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  component.find(Relative).simulate('click', mockedEvent);
  it('should open drawer', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2; // eslint-disable-line no-undef
    setTimeout(() => {
      done();
      expect(component.find(DrawerFields).exists()).toBeTruthy();
    }, 1);
  });
});
