import React from 'react';
import { mount } from 'enzyme';
import ScrollLazyLoad from './ScrollLazyLoad';

const arrayOfChildren = [
  <div key="1">1</div>,
  <div key="2">2</div>,
  <div key="3">3</div>,
  <div key="4">4</div>,
  <div>5</div>,
  <div>6</div>,
];

describe('scroll lazy load cases ', () => {
  const component = mount(<ScrollLazyLoad itemsLimit={2}>{arrayOfChildren}</ScrollLazyLoad>);
  const spyOnRemoveEventListner = jest.spyOn(component.instance(), 'removeEventListner');
  xit('should remove event listner on scroll if no more children to show', () => {
    global.document.scrollTop = 50;
    expect(spyOnRemoveEventListner).toHaveBeenCalled();
  });
  it('should remove event listner when unmounted', () => {
    component.unmount();
    expect(spyOnRemoveEventListner).toHaveBeenCalled();
  });
});
