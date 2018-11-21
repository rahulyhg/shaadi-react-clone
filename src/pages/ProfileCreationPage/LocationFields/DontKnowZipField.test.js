import React from 'react';
import { mount } from 'enzyme';
import DontKnowZipField from './DontKnowZipField';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';

describe("don't know / remeber zip field when Canadian user", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Canada' })}>
      <DontKnowZipField />
    </ContextProvider>,
  );
  it('should not have an input checkbox field having name as zipStatus', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="zipStatus"]').exists()).toBeFalsy();
  });
});

describe("don't know / remeber zip field when Australia user", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'Australia' })}>
      <DontKnowZipField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as zipStatus', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="zipStatus"]').exists()).toBeTruthy();
  });
});

describe("don't know / remeber zip field when United Kingdom user", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'United Kingdom' })}>
      <DontKnowZipField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as zipStatus', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="zipStatus"]').exists()).toBeTruthy();
  });
});

describe("don't know / remeber zip field when New Zealand user", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'New Zealand' })}>
      <DontKnowZipField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as zipStatus', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="zipStatus"]').exists()).toBeTruthy();
  });
});

describe("don't know / remeber zip field when USA user", () => {
  const mountedComponent = mount(
    <ContextProvider {...getContext({ country: 'USA' })}>
      <DontKnowZipField />
    </ContextProvider>,
  );
  it('should have an input checkbox field having name as zipStatus', () => {
    expect(mountedComponent.find('input[type="checkbox"][name="zipStatus"]').exists()).toBeTruthy();
  });
});
