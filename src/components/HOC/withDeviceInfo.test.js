import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import withDeviceInfo from './withDeviceInfo';
import initializeStore from '../../store';

const store = initializeStore();

describe('Desktop device info ', () => {
  const DummyComponent = () => <div />;
  const ComponentFromHOC = withDeviceInfo(DummyComponent);
  const component = mount(
    <Provider store={store}>
      <ComponentFromHOC />
    </Provider>,
  );
  it('should detect is as a desktop device', () => {
    expect(
      component
        .find(DummyComponent)
        .props()
        .isMobile(),
    ).toBeFalsy();
  });
});

describe('Mobile device info ', () => {
  const DummyComponent = () => <div />;
  const ComponentFromHOC = withDeviceInfo(DummyComponent);
  store.dispatch({ type: 'SET_LAYOUT', payload: { layout: 'mobile' } });
  const component = mount(
    <Provider store={store}>
      <ComponentFromHOC />
    </Provider>,
  );
  it('should detect is as a mobile device', () => {
    expect(
      component
        .find(DummyComponent)
        .props()
        .isMobile(),
    ).toBeTruthy();
  });
});
