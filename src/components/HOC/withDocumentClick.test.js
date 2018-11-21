import React from 'react';
import { mount } from 'enzyme';
import withDocumentClick from './withDocumentClick';

const DummyComponent = () => <div />;
const ComponentFromHOC = withDocumentClick(DummyComponent);
const spyOnUnMount = jest.spyOn(ComponentFromHOC.prototype, 'componentWillUnmount');
const spyOnMount = jest.spyOn(ComponentFromHOC.prototype, 'componentDidMount');

const onDocumentClick = jest.fn();

describe('with Document Click ', () => {
  const mountedComponent = mount(<ComponentFromHOC onDocumentClick={onDocumentClick} />);
  it('should add document on click event listner on load', () => {
    expect(spyOnMount).toHaveBeenCalled();
  });
  it('should unmount', () => {
    mountedComponent.unmount();
    expect(spyOnUnMount).toHaveBeenCalled();
  });
});
