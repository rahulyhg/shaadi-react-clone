import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import DoshamField from './DoshamField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();

const hinduIndian = { religion: 'Hindu', country: 'India' };
const hinduMalluIndian = { ...hinduIndian, motherTongue: 'Malayalam' };

describe("dosham field when mallu hindu user doen't even select sudhajagdam", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduMalluIndian, suddhaJadhagam: '' })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeFalsy();
  });
});

describe('dosham field when mallu hindu user do have sudhajagdam', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduMalluIndian, suddhaJadhagam: 'Yes' })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeFalsy();
  });
});

describe("dosham field when mallu hindu user don't remember sudhajagdam", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduMalluIndian, suddhaJadhagam: "Don't know" })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeTruthy();
  });
});

describe("dosham field when mallu hindu user doesn't have sudhajagdam", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduMalluIndian, suddhaJadhagam: 'No' })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeTruthy();
  });
});

describe('dosham field when tamilian hindu user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduIndian, motherTongue: 'Tamil' })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeTruthy();
  });
});

describe('dosham field when telu hindu user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduIndian, motherTongue: 'Telugu' })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeTruthy();
  });
});

describe('dosham field when kanad hindu user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduIndian, motherTongue: 'Kannada' })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeTruthy();
  });
});

describe('dosham field when north indian user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ ...hinduIndian, motherTongue: 'Hindi' })}>
      <Provider store={store}>
        <DoshamField />
      </Provider>
    </ContextProvider>,
  );
  it('should not have an input text field having name as dosham', () => {
    expect(mountedComponent.find('input[type="radio"][name="dosham"]').exists()).toBeFalsy();
  });
});
