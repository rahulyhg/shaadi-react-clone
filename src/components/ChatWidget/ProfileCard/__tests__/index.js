import React from 'react';
import { mount } from 'enzyme';
import ProfileCard from '../../ProfileCard';
import factory from './utils/factory';

jest.mock('../../../Common/Link');

describe('ProfileCard View Cases for chat', () => {
  let ProfileCardWrapper;
  // beforeEach(() => {
  //   ProfileCardWrapper = mount(<ProfileCard {...factory.props} />);
  // });

  describe(' default profile card for Premium User', () => {
    it('should have photo', () => {
      ProfileCardWrapper = mount(<ProfileCard {...factory.props} />);
      expect(ProfileCardWrapper.find('img').length).toEqual(1);
    });
    it('should show premium band for premium user', () => {
      const planProps = {
        ...factory.props,
        profile: { ...factory.props.profile, flags: { ...factory.props.profile.flags, isPremium: true } },
      };
      ProfileCardWrapper = mount(<ProfileCard {...planProps} />);
      expect(ProfileCardWrapper.find('div[data-plan="premium"]').exists()).toBe(true);
    });
    it('should have display name', () => {
      expect(ProfileCardWrapper.text()).toContain(`${factory.props.profile.name}`);
    });
    it('should have chat now button and default text', () => {
      const button = ProfileCardWrapper.find('button');
      expect(button.text()).toEqual('Chat now');
    });
  });

  describe(' default profile card for Free User', () => {
    ProfileCardWrapper = mount(<ProfileCard {...factory.freeUserProps} />);
    it('should have default text', () => {
      expect(ProfileCardWrapper.text()).toContain(`Upgrade Now to start Chatting`);
    });
  });

  describe('profile card for member hidden case', () => {
    it('should show hidden text ', () => {
      const hiddenProps = {
        ...factory.props,
        profile: { ...factory.props.profile, flags: { ...factory.props.profile.flags, connectionStatus: 'hidden' } },
      };
      ProfileCardWrapper = mount(<ProfileCard {...hiddenProps} />);
      expect(ProfileCardWrapper.find('button').exists()).toBe(false);
      expect(ProfileCardWrapper.text()).toContain(`Your profile is currently hidden.`);
      expect(ProfileCardWrapper.text()).toContain(`To Contact this Member Unhide your Profile`);
    });
  });

  describe('profile card for connection action as profile hidden deactivated', () => {
    it('should show hidden text ', () => {
      const hiddenProps = {
        ...factory.props,
        profile: { ...factory.props.profile, flags: { ...factory.props.profile.flags, connectionAction: 'profile_hidden_deactivated' } },
      };
      ProfileCardWrapper = mount(<ProfileCard {...hiddenProps} />);
      expect(ProfileCardWrapper.find('button').exists()).toBe(false);
      expect(ProfileCardWrapper.text()).toContain(`This Profile is currently not available as it has been hidden or deleted.`);
    });
  });

  describe('profile card for member hidden case for alert source', () => {
    it('should show hidden text ', () => {
      const hiddenProps = {
        ...factory.props,
        source: 'alerts',
        profile: { ...factory.props.profile, flags: { ...factory.props.profile.flags, connectionStatus: 'hidden' } },
      };
      ProfileCardWrapper = mount(<ProfileCard {...hiddenProps} />);
      expect(ProfileCardWrapper.find('button').exists()).toBe(false);
      expect(ProfileCardWrapper.text()).toContain(`Your profile is currently hidden.`);
      expect(ProfileCardWrapper.text()).toContain(`To Contact this Member Unhide your Profile`);
    });
  });

  describe('profile card for connection action as profile hidden deactivated for alert source', () => {
    it('should show hidden text ', () => {
      const hiddenProps = {
        ...factory.props,
        source: 'alerts',
        profile: { ...factory.props.profile, flags: { ...factory.props.profile.flags, connectionAction: 'profile_hidden_deactivated' } },
      };
      ProfileCardWrapper = mount(<ProfileCard {...hiddenProps} />);
      expect(ProfileCardWrapper.find('button').exists()).toBe(false);
      expect(ProfileCardWrapper.text()).toContain(`This Profile is currently not available as it has been hidden or deleted.`);
    });
  });

  describe('profile card when normal user online and can initiate chat', () => {
    it('should show chat now button ', () => {
      const basicEoiProps = {
        ...factory.props,
        source: 'online',
        canInitiateChat: true,
      };
      ProfileCardWrapper = mount(<ProfileCard {...basicEoiProps} />);
      const button = ProfileCardWrapper.find('button');
      expect(button.text()).toEqual('Chat now');
    });
  });
  describe(' SKU Exp: profile card for P+/D+', () => {
    const newProps = {
      ...factory.freeUserProps,
      profile: {
        ...factory.freeUserProps.profile,
        flags: {
          ...factory.freeUserProps.profile.flags,
          canCommunicate: true,
        },
      },
      canInitiateChat: false,
      canShowUpgradeLink: true,
    };
    ProfileCardWrapper = mount(<ProfileCard {...newProps} />);
    it('should not display `Upgrade Now to start Chatting`', () => {
      expect(ProfileCardWrapper.text()).not.toContain(`Upgrade Now to start Chatting`);
    });
  });
});
