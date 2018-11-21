import React from 'react';
import { mount } from 'enzyme';
import withAPI from './withAPI';
import api from '../../api';

const mockedPromise = jest.fn();

api.get = mockedPromise;

const DummyComponent = () => <div />;
const ComponentFromHOC = withAPI(DummyComponent);

describe('With API ', () => {
  const mountedComponent = mount(<ComponentFromHOC />);
  it('should have getDraftProfile method', () => {
    expect(mountedComponent.find(DummyComponent).props().getDraftProfile).toBeDefined();
  });
  it('should have getExitIntentLayer method', () => {
    expect(mountedComponent.find(DummyComponent).props().getExitIntentLayer).toBeDefined();
  });
  it('should have getRegExitIntentLayer method', () => {
    expect(mountedComponent.find(DummyComponent).props().getRegExitIntentLayer).toBeDefined();
  });
  it('should call api on getDraftProfile', () => {
    mountedComponent
      .find(DummyComponent)
      .props()
      .getDraftProfile({});
    expect(mockedPromise).toHaveBeenCalled();
  });
  it('should call api on getExitIntentLayer', () => {
    mountedComponent
      .find(DummyComponent)
      .props()
      .getExitIntentLayer();
    expect(mockedPromise).toHaveBeenCalled();
  });
  it('should call api on getRegExitIntentLayer', () => {
    mountedComponent
      .find(DummyComponent)
      .props()
      .getRegExitIntentLayer();
    expect(mockedPromise).toHaveBeenCalled();
  });
});
