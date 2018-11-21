import React from 'react';
import { mount } from 'enzyme';
import ThankyouMsg from '../ThankyouMsg';

const props = { wwwBaseUrl: 'www.shaadi.com', msg: ['Thank you for your feedback.', <br />, 'You are helping us improve Shaadi.com'] };

describe('ThankyouMsg Tests', () => {
  const wrapper = mount(<ThankyouMsg {...props} />);

  it('should show checkmark', () => {
    expect(wrapper.find('FieldTick').length).toEqual(1);
  });

  it('should show continue button', () => {
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toContain('Continue');
  });

  describe('ThankyouMsg Tests for CSAT', () => {
    it('should show Thankyou Message', () => {
      expect(wrapper.debug()).toContain('Thank you for your feedback.');
    });
  });

  describe('ThankyouMsg Tests for Phone Settings', () => {
    const newProps = { isNative: false, wwwBaseUrl: 'www.shaadi.com', msg: ['Thank you', <br />, 'Your settings have been saved'] };
    const wrapperPhoneSetting = mount(<ThankyouMsg {...newProps} />);

    it('should show Thankyou Message', () => {
      expect(wrapperPhoneSetting.debug()).toContain('Thank you');
    });
  });
});
