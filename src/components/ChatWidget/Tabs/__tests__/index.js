import React from 'react';
import { mount } from 'enzyme';
import Tabs from '../index';
import factory from './utils/factory';

describe('Chat Tabs', () => {
  it('should mount Tabs componenet', () => {
    const props = { ...factory.props };

    const sampleWrapper = mount(<Tabs {...props} />);
    expect(sampleWrapper.debug().length).toBeGreaterThan(0);
    expect(sampleWrapper.find('Tabs')).toHaveLength(1);
  });

  it('should click onTabClick with alerts', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(0);
    expect(sampleWrapper.debug()).toContain('Alerts');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('alerts');
  });

  it('should click onTabClick with chats', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(1);
    expect(sampleWrapper.debug()).toContain('Chats');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('chats');
  });

  it('should click onTabClick with online', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(2);
    expect(sampleWrapper.debug()).toContain('Active');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('online');
  });

  it('should click onTabClick with alerts when status offline', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick, status: 'offline' };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(0);
    expect(sampleWrapper.debug()).toContain('Alerts');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('alerts');
  });

  it('should click onTabClick with chats when status offline', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick, status: 'offline' };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(1);
    expect(sampleWrapper.debug()).toContain('Chats');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('chats');
  });

  it('should click onTabClick with online when status offline', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick, status: 'offline' };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(2);
    expect(sampleWrapper.debug()).toContain('Active');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('online');
  });

  it('should click onTabClick with chats when count 0', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick, counts: { alerts: 0, chats: 0, online: 26 } };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(1);
    expect(sampleWrapper.debug()).toContain('Chats');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('chats');
  });

  it('should click onTabClick with alerts', () => {
    const onTabClick = jest.fn();
    const settings = { ...factory.props, onTabClick, counts: { alerts: 0, chats: 0, online: 26 } };
    const sampleWrapper = mount(<Tabs {...settings} />);
    beforeEach(() => {
      onTabClick.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(0);
    expect(sampleWrapper.debug()).toContain('Alerts');
    buttons.simulate('click');
    expect(onTabClick).toHaveBeenCalledWith('alerts');
  });
});
