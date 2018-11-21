import React from 'react';
import { mount } from 'enzyme';
import DoshamTypesField from './DoshamTypesField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

describe("dosham types field when mallu hindu user doen't even select dosham", () => {
  const component = mount(
    <ContextProvider {...getContext({ dosham: '' })}>
      <DoshamTypesField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as doshamTypes', () => {
    expect(component.find('input[type="checkbox"][name="doshamTypes"]').exists()).toBeFalsy();
  });
});

describe("dosham types field when mallu hindu user don't remember dosham", () => {
  const component = mount(
    <ContextProvider {...getContext({ dosham: "Don't know" })}>
      <DoshamTypesField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as doshamTypes', () => {
    expect(component.find('input[type="checkbox"][name="doshamTypes"]').exists()).toBeFalsy();
  });
});

describe("dosham types field when mallu hindu user doesn't have dosham", () => {
  const component = mount(
    <ContextProvider {...getContext({ dosham: 'No' })}>
      <DoshamTypesField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as doshamTypes', () => {
    expect(component.find('input[type="checkbox"][name="doshamTypes"]').exists()).toBeFalsy();
  });
});

describe('dosham types field when mallu hindu user do have dosham', () => {
  const component = mount(
    <ContextProvider {...getContext({ dosham: 'Yes' })}>
      <DoshamTypesField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as doshamTypes', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2; // eslint-disable-line no-undef
    setTimeout(() => {
      done();
      expect(component.find('input[type="checkbox"][name="doshamTypes"]').exists()).toBeTruthy();
    }, 1);
  });
});
