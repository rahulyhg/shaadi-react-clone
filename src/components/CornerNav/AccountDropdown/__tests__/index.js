import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AccountDropdown from '../index';
import initializeStore from '../../../../store';
import factory from './utils/factory';
import { UploadFromComputerBtn, ImportFromFbBtn } from '../../../Common/Photo';

jest.mock('../../../Common/Link');

const store = initializeStore();
const onAction = jest.fn();
const onDragStart = jest.fn();

describe('AccountDropdown Tests', () => {
  beforeEach(() => {
    onAction.mockClear();
  });

  it('should have upload photo buttons if profile doesnt have photo', () => {
    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...factory.props} />
        </Router>
      </Provider>,
    );
    expect(sampleWrapper.find('ImportFromFbBtn').length).toEqual(1);
    expect(sampleWrapper.find(UploadFromComputerBtn).length).toEqual(1);
  });

  it('should not have photo upload buttons if profile has photo', () => {
    const settings = { ...factory.props.settings, hasUploadedPhoto: true };
    const hasPhoto = { ...factory.props, settings };

    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...hasPhoto} />
        </Router>
      </Provider>,
    );
    expect(sampleWrapper.find(ImportFromFbBtn).length).toEqual(0);
    expect(sampleWrapper.find(UploadFromComputerBtn).length).toEqual(0);
  });

  it('should have male profile icon against My profile link', () => {
    const settings = { ...factory.props.settings, gender: 'Male' };
    const profileGender = { ...factory.props, settings };

    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...profileGender} />
        </Router>
      </Provider>,
    );
    expect(sampleWrapper.find('div[icon="my_profiles_male"]').exists()).toBe(true);
  });

  it('should have female profile icon against My profile link', () => {
    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...factory.props} />
        </Router>
      </Provider>,
    );

    expect(sampleWrapper.find('div[icon="my_profiles_female"]').exists()).toBe(true);
  });

  it('should show account dropdown when dropdown is clicked', () => {
    const onVisibilityChange = jest.fn();
    const settings = { ...factory.props, onVisibilityChange };

    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...settings} />
        </Router>
      </Provider>,
    );

    const button = sampleWrapper.find('#profileDropDown').at(0);
    expect(onAction).not.toHaveBeenCalled();

    button.simulate('click');

    expect(onVisibilityChange).toHaveBeenCalled();
  });

  it('should have onContextMenu  and drag events attached to image', () => {
    const settings = { ...factory.props, onDragStart };

    const sampleWrapper = shallow(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...settings} />
        </Router>
      </Provider>,
    );

    // const button = sampleWrapper.find('#profileImgSmall').at(0);

    // button.simulate('click');
    expect(sampleWrapper).toMatchSnapshot();
  });

  it('should show Extend Membership  if upgradeType is extend', () => {
    const currentMembership = { ...factory.props, upgradeType: 'extend' };

    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...currentMembership} />
        </Router>
      </Provider>,
    );
    expect(sampleWrapper.text()).toContain('Extend Membership');
  });

  it('should show Renew Membership  if upgradeType is renew', () => {
    const currentMembership = { ...factory.props, upgradeType: 'renew' };

    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...currentMembership} />
        </Router>
      </Provider>,
    );
    expect(sampleWrapper.text()).toContain('Renew Membership');
  });

  it('should show Upgrade Now  if upgradeType is upgrade', () => {
    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...factory.props} />
        </Router>
      </Provider>,
    );
    expect(sampleWrapper.text()).toContain('Upgrade Now');
  });

  it('should show premium plan taken by user if user has premium membership', () => {
    const membershipType = { ...factory.props, accountType: 'PAID', plan: 'Gold' };

    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...membershipType} />
        </Router>
      </Provider>,
    );

    expect(sampleWrapper.text()).toContain(`Account Type: ${membershipType.plan}`);
  });

  it('should show Free plan if user has no premium membership', () => {
    const sampleWrapper = mount(
      <Provider store={store}>
        <Router>
          <AccountDropdown {...factory.props} />
        </Router>
      </Provider>,
    );

    expect(sampleWrapper.text()).toContain(`Account Type: ${factory.props.plan}`);
  });
});
