import React from 'react';
import { mount } from 'enzyme';
import Notifications from '../index';
import factory from './utils/factory';

jest.mock('../../../Common/Link');

describe('Notifications', () => {
  it('should mount Notifications', () => {
    const props = { ...factory.props };
    const sampleWrapper = mount(<Notifications {...props} />);
    expect(sampleWrapper.text()).toContain('You have new notifications');
  });

  it('should click onHideToast', () => {
    const onHideToast = jest.fn();
    const settings = { ...factory.props, onHideToast };
    const sampleWrapper = mount(<Notifications {...settings} />);
    const button = sampleWrapper.find('button').at(0);
    button.simulate('click');
    expect(onHideToast).toHaveBeenCalled();
  });

  describe('Describe onClickNotificationToast', () => {
    factory.props.items.forEach(({ uid }, index) => {
      const onClickNotificationToast = jest.fn();
      it(`should click onClickNotificationToast ${uid ? 'uid is available' : ''}`, () => {
        beforeEach(() => {
          onClickNotificationToast.mockClear();
        });
        const settings = { ...factory.props, onClickNotificationToast };
        const sampleWrapper = mount(<Notifications {...settings} />);
        const button = sampleWrapper
          .find('div')
          .find(`[index=${index}]`)
          .children()
          .at(0);
        button.simulate('click');
        expect(onClickNotificationToast).toHaveBeenCalled();
      });
    });
  });

  describe('Describe onHideToast', () => {
    factory.props.items.forEach(({ uid }, index) => {
      const onHideToast = jest.fn();
      it(`should click onHideToast ${uid ? 'uid is available' : ''}`, () => {
        beforeEach(() => {
          onHideToast.mockClear();
        });
        const settings = { ...factory.props, onHideToast };
        const sampleWrapper = mount(<Notifications {...settings} />);
        const button = sampleWrapper
          .find(`[index=${index}]`)
          .find('button')
          .at(0);
        button.simulate('click');
        expect(onHideToast).toHaveBeenCalled();
      });
    });
  });
});
