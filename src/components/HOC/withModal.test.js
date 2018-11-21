import React from 'react';
import { mount } from 'enzyme';
import withModal from './withModal';

const DummyComponent = () => <div />;
const ComponentFromHOC = withModal(DummyComponent);

describe('closed modal state ', () => {
  const component = mount(<ComponentFromHOC hideOnOutsideClick />);
  component.setProps({ isOpen: true });
  it('should open modal when given the right props', () => {
    expect(component.find('.modal').exists()).toBeTruthy();
  });
});

describe('open modal state ', () => {
  const component = mount(<ComponentFromHOC isOpen hideOnOutsideClick />);
  it('should close modal on document body click other than the modal', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2; // eslint-disable-line no-undef
    component.instance().modalRef = component.find('.modal');
    component.instance().onDocumentClick({ target: null });
    setTimeout(() => {
      done();
      expect(component.html()).toBeNull();
    }, 1);
  });
});
