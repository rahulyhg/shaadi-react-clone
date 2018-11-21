import React from 'react';
import { mount } from 'enzyme';
import StoppageHeader from '../index';
import props from './utils/factory';

jest.mock('../../../Common/Link');

describe('stoppage header when web and has logo', () => {
  const component = mount(<StoppageHeader {...props} isNative={false} />);
  it('should show logo', () => {
    expect(component.find('img#logo').exists()).toBeTruthy();
  });
});

describe('stoppage header when native and has logo', () => {
  const component = mount(<StoppageHeader {...props} isNative />);
  it('should show logo', () => {
    expect(component.find('img#logo').exists()).toBeFalsy();
  });
});

describe('stoppage header when page is not skippable', () => {
  const component = mount(<StoppageHeader {...props} canShowSkip={false} />);
  it('should not show skip button', () => {
    expect(component.find('#page-skip-link').exists()).toBeFalsy();
  });
});

describe('stoppage header when page is skippable', () => {
  const component = mount(<StoppageHeader {...props} canShowSkip />);
  it('should show skip button', () => {
    expect(component.find('#page-skip-link').exists()).toBeTruthy();
  });
});
