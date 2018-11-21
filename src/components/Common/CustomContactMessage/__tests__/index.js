import React from 'react';
import { mount } from 'enzyme';
import CustomButton from '../../CustomButton';
import factory from './utils/factory';

describe('Connect Message Rendering', () => {
  it('Should render Connect text', () => {
    const customContactMessageProps = { ...factory.customContactMessage };
    const customContactMessageMount = mount(<CustomButton {...customContactMessageProps} />);
    expect(customContactMessageMount.html()).toContain('Connect Now');
    expect(customContactMessageMount.props().type).toBe('Connect');
    expect(customContactMessageMount.props().message).toBe('Connect Now');
  });

  it('Should render Accept text', () => {
    const customContactMessageProps = { ...factory.customContactMessage, type: 'Accept', title: 'Accept', message: 'Accept' };
    const customContactMessageMount = mount(<CustomButton {...customContactMessageProps} />);
    expect(customContactMessageMount.html()).toContain('Accept');
    expect(customContactMessageMount.props().type).toBe('Accept');
    expect(customContactMessageMount.props().message).toBe('Accept');
  });

  it('Should render Write Message text', () => {
    const customContactMessageProps = {
      ...factory.customContactMessage,
      type: 'WriteMessage',
      title: 'Write Message',
      message: 'Write Message',
    };
    const customContactMessageMount = mount(<CustomButton {...customContactMessageProps} />);
    expect(customContactMessageMount.html()).toContain('Write Message');
    expect(customContactMessageMount.props().type).toBe('WriteMessage');
    expect(customContactMessageMount.props().message).toBe('Write Message');
  });

  it('Should render Cancel text', () => {
    const customContactMessageProps = { ...factory.customContactMessage, type: 'Cancel', title: 'Cancel', message: 'Cancel' };
    const customContactMessageMount = mount(<CustomButton {...customContactMessageProps} />);
    expect(customContactMessageMount.html()).toContain('Cancel');
    expect(customContactMessageMount.props().type).toBe('Cancel');
    expect(customContactMessageMount.props().message).toBe('Cancel');
  });
});
