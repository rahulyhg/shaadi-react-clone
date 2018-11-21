import React from 'react';
import { mount } from 'enzyme';
import Toolbar from '../index';
import factory from './utils/factory';

// jest.mock("../../../Common/Link");

describe('Chat Toolbar', () => {
  it('should mount toolbar componenet', () => {
    const props = { ...factory.props };

    const sampleWrapper = mount(<Toolbar {...props} />);
    expect(sampleWrapper.debug().length).toBeGreaterThan(0);
    expect(sampleWrapper.find('Toolbar')).toHaveLength(1);
  });

  it('should click changeStatus', () => {
    const changeStatus = jest.fn();
    const toggleChatInterface = jest.fn();
    const changeSettings = jest.fn();
    const settings = { ...factory.props, changeStatus, changeSettings, toggleChatInterface };

    const sampleWrapper = mount(<Toolbar {...settings} />);
    beforeEach(() => {
      changeSettings.mockClear();
    });
    const buttons = sampleWrapper.find('button');
    buttons.at(0).simulate('click');
    expect(buttons.at(0).text()).toContain('Invisible');
    expect(changeSettings).toHaveBeenCalledWith('status', 'invisible');
    buttons.at(1).simulate('click');
    expect(buttons.at(1).text()).toContain('Go Offline');
  });

  it('should click when toggleSound is on', () => {
    const toggleSound = jest.fn();
    const changeSettings = jest.fn();
    const settings = { ...factory.props, changeSettings, toggleSound };

    const sampleWrapper = mount(<Toolbar {...settings} />);
    beforeEach(() => {
      changeSettings.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(2);
    buttons.simulate('click');
    expect(changeSettings).toHaveBeenCalledWith('sounds', 'off');
  });
  it('should click when toggleSound is off', () => {
    const toggleSound = jest.fn();
    const changeStatus = jest.fn();
    const changeSettings = jest.fn();
    const settings = {
      ...factory.props,
      toggleSound,
      changeStatus,
      changeSettings,
      chatSettings: {
        ...factory.props.chatSettings,
        sounds: 'off',
      },
    };
    const sampleWrapper = mount(<Toolbar {...settings} />);
    beforeEach(() => {
      changeSettings.mockClear();
    });
    const buttons = sampleWrapper.find('button').at(2);
    buttons.simulate('click');
    expect(changeSettings).toHaveBeenCalledWith('sounds', 'on');
  });

  it('should click  toggleChatInterface', () => {
    const toggleChatInterface = jest.fn();
    const changeSettings = jest.fn();
    const settings = { ...factory.props, toggleChatInterface, changeSettings };
    const sampleWrapper = mount(<Toolbar {...settings} />);
    beforeEach(() => {
      changeSettings.mockClear();
    });

    const buttons = sampleWrapper.find('div').at(5);
    buttons.simulate('click');
    expect(changeSettings).toHaveBeenCalledWith('activeTab', 'none');
    expect(changeSettings).toHaveBeenCalledWith('isOpen', false);
  });
});
