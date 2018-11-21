import React from 'react';
import { mount } from 'enzyme';
import factory from './utils/factory';
import ChatIcon from '../../ChatIcon';

describe('Chat icon click event', () => {
  const onClick = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      beforeEach(() => {
        onClick.mockClear();
      });

      ['list', 'grid', 'profile', 'onlineTabChat'].forEach(view => {
        describe('Render icon component as per view', () => {
          [
            { onlineStatus: 'Online', chatIcon: 'web_online' },
            { onlineStatus: 'Offine', chatIcon: 'web_offline' },
            { onlineStatus: 'Idle', chatIcon: 'web_idle' },
          ].forEach(chat => {
            const props = {
              ...profile,
              ...factory.props,
              viewType: view,
              chatDetails: { onlineStatus: chat.onlineStatus, chatIcon: chat.chatIcon },
              clickFn: onClick,
            };

            let componentName = `${view}ChatIcon`;
            // console.log(88888,componentName);
            if (view === 'profile') {
              componentName = (['Offine', 'Idle'].includes(chat.onlineStatus) && 'profileOtherChatIcon') || 'profileOnlineChatIcon';
            }
            if (view === 'onlineTabChat') {
              componentName = 'onlineTabChatIcon';
            }

            it(`Should render ${view} view ${chat.onlineStatus} icon`, () => {
              const chaticon = mount(<ChatIcon {...props} />);
              expect(chaticon.find(componentName).length).toBe(1);
            });
          });
        });

        describe('Chat Status : Online', () => {
          if (view !== 'onlineTabChat')
            ['web_online', 'app_online'].forEach(chatStatus => {
              const props = {
                ...profile,
                ...factory.props,
                viewType: view,
                chatDetails: { onlineStatus: 'Offine', chatIcon: 'chatStatus' },
                clickFn: onClick,
              };
              it(`Online icon clickable in ${view} view`, () => {
                const chaticon = mount(<ChatIcon {...props} />);
                expect(onClick).not.toHaveBeenCalled();
                chaticon.simulate('click');
                expect(onClick).toHaveBeenCalled();
              });
            });
        });

        describe('Chat Status : Idle', () => {
          if (view !== 'onlineTabChat')
            ['web_idle', 'app_idle'].forEach(chatStatus => {
              const props = {
                ...profile,
                ...factory.props,
                viewType: view,
                chatDetails: { onlineStatus: 'Offine', chatIcon: 'chatStatus' },
                clickFn: onClick,
              };
              it(`Online icon clickable in ${view} view`, () => {
                const chaticon = mount(<ChatIcon {...props} />);
                expect(onClick).not.toHaveBeenCalled();
                chaticon.simulate('click');
                expect(onClick).toHaveBeenCalled();
              });
            });
        });

        describe('Chat Status : Offine', () => {
          if (view !== 'onlineTabChat')
            ['web_offline', 'app_offline'].forEach(chatStatus => {
              const props = {
                ...profile,
                ...factory.props,
                viewType: view,
                chatDetails: { onlineStatus: 'Offine', chatIcon: chatStatus },
                clickFn: onClick,
              };
              it(`Online icon clickable in ${view} view`, () => {
                const chaticon = mount(<ChatIcon {...props} />);
                expect(onClick).not.toHaveBeenCalled();
                chaticon.simulate('click');
                expect(onClick).toHaveBeenCalled();
              });
            });
        });
      });
    });
  });
});
