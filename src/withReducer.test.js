import React from 'react';
import { shallow } from 'enzyme';
import withReducer from './withReducer';
import initializeStore from './store';
import modalReducer from './reducers/modal';

const store = initializeStore();

const DummyComponent = () => <div />;

describe('With Reducer ', () => {
  it('should have no modal reducer', () => {
    expect(store.getState().modal).not.toBeDefined();
  });
  it('should have modal reducer injected in store', () => {
    const ComponentFromHOC = withReducer('modal', modalReducer)(DummyComponent);
    shallow(<ComponentFromHOC />, { context: { store } });
    expect(store.getState().modal).toBeDefined();
  });
});
