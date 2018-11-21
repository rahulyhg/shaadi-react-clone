import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import SubCasteField from './SubCasteField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import api from '../../../api';

describe('sub caste field when non nri plus country user', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Canada' })}>
      <Router>
        <SubCasteField />
      </Router>
    </ContextProvider>,
  );
  it('should be hidden', () => {
    expect(mountedComponent.find('input[type="text"][name="subCaste"]').exists()).toBeFalsy();
  });
});

describe('sub caste field when empty caste field', () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: '' })}>
      <Router>
        <SubCasteField />
      </Router>
    </ContextProvider>,
  );
  it('should have an input text field having name as subCaste', () => {
    expect(mountedComponent.find('input[type="text"][name="subCaste"]').exists()).toBeFalsy();
  });
});

describe('sub caste field when Indian user with valid caste value', () => {
  api.get = () =>
    new Promise((resolve, reject) => {
      resolve({ data: [] });
    });
  const mountedComponent = mount(
    <ContextProvider {...getContext({ caste: 'Iyer' })}>
      <Router>
        <SubCasteField />
      </Router>
    </ContextProvider>,
  );
  it('should have an input text field having name as subCaste', () => {
    expect(mountedComponent.find('input[type="text"][name="subCaste"]').exists()).toBeTruthy();
  });
  describe('on valid caste value change', () => {
    mountedComponent.setProps(getContext({ caste: 'Iyernagar' }));
    api.get = () =>
      new Promise((resolve, reject) => {
        resolve({ data: [{ id: 'Other', text: 'Other' }] });
      });
    it('should have a drop down', () => {
      expect(mountedComponent.find('input[type="text"][name="subCaste"]').exists()).toBeTruthy();
    });
  });
});
