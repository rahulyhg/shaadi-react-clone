/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';

import { ProfilePageMobile } from '../pages/ProfilePage/mobile';
import props from '../fixtures/profilePageMobileFixture';
import modalProps from '../fixtures/factories/modal';
import FakeScrollingWrapper from './wrappers/fakeScrollingWrapper';
import FakeConnectClickWrapper from './wrappers/FakeConnectClickWrapper';
import FakeModalWrapper from './wrappers/FakeModalWrapper';
import MobileDecorator from './decorators/mobileDecorator';

const profilesNotReady = {};
const newArr = Object.keys(props.profiles).map(uid => {props.profiles[uid].detailed.ready = false; return props.profiles[uid]})
newArr.map(item => profilesNotReady[item.uid] = item);

storiesOf('ProfilePageMobile Page', module)
  .addDecorator(story => <MobileDecorator>{story()}</MobileDecorator>)
  .add('with props', () => <ProfilePageMobile {...props} />)
  .add('with details not ready', () => {
    return <ProfilePageMobile {...props} profiles={profilesNotReady} toast="Sample Toast" />;
  })
  .add('when scrolling 500px shows bottombar and topbar', () => (
    <FakeScrollingWrapper renderSection={scrollTop => <ProfilePageMobile {...props} scrollTop={scrollTop} />} />
  ))
  .add('on connect click should open next profile and show toast', () => (
    <FakeConnectClickWrapper renderSection={(onAction, toast) => <ProfilePageMobile {...props} onAction={onAction} />} />
  ))
  .add('should show upgrade modal on clicking view contact', () => (
    <FakeModalWrapper modalProps={modalProps()} renderSection={onAction => <ProfilePageMobile {...props} onAction={onAction} />} />
  ))
  .add('with toast', (toast = { message: "Sample Toast" }) => <ProfilePageMobile {...props} toast={toast} />);

Array.prototype.unique = function() {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
