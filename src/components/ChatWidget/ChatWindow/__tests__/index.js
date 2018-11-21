import React from 'react';
import { mount, shallow } from 'enzyme';
import ChatWindow from '../index';
import factory from './utils/factory';
import Eoi from '../../../Common/Eoi';

jest.mock('../../../Common/Link');

describe('ChatWindow', () => {
  it('should show EOI component', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);

    expect(sampleWrapper.find(Eoi)).toHaveLength(1);
  });

  it("should show typing status on receiver's chat window when sender of the message is typing", () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        loading: null,
        typing: 'Raj is typing...',
        flash: null,
        flashType: 'default',
        items: [],
        mark: 1522400858668,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);

    expect(sampleWrapper.text()).toContain('is typing...');
  });

  it('should show upgrade banner when free member sends message', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        loading: null,
        typing: null,
        flash: 'free_member',
        flashType: 'error',
        items: [],
        mark: 1522401167241,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);

    expect(sampleWrapper.text()).toContain('You can only reply to a Premium User. To continue chatting with your matches,');
  });

  it('should trigger componentWillreceive props and then call fetchChatHistory', () => {
    const fetchChatHistory = jest.fn();

    const chatWinodwProps = { ...factory.chatWinodwProps, fetchChatHistory };
    const sampleWrapper = shallow(<ChatWindow {...chatWinodwProps} />);
    const newItem = { ...factory.componentWillreceiveChangeProps };

    sampleWrapper.setProps({ ...newItem });
  });

  it('should call doChatWindowAction - when  minimize and close buttons are clicked, also verify the button labels', () => {
    const doChatWindowAction = jest.fn();

    const chatWindowProps = { ...factory.FreeUserConnectChatWindow, doChatWindowAction };
    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);

    const { item } = chatWindowProps;
    const { uid } = item;

    const buttons = sampleWrapper.find('button');

    expect(doChatWindowAction).not.toHaveBeenCalled();

    buttons.at(1).simulate('click');
    expect(buttons.at(1).text()).toEqual('−');

    expect(doChatWindowAction).toHaveBeenCalledWith(uid, 'minimize');

    buttons.at(0).simulate('click');
    expect(buttons.at(0).text()).toEqual('X');

    expect(doChatWindowAction).toHaveBeenCalledWith(uid, 'close');

    buttons.at(2).simulate('click');
    expect(buttons.at(2).text()).toEqual('X');

    expect(doChatWindowAction).toHaveBeenCalledWith(uid, 'close');
  });

  it('should call doChatWindowAction - when  dock window is clicked', () => {
    const doChatWindowAction = jest.fn();

    const chatWindowProps = { ...factory.FreeUserConnectChatWindow, doChatWindowAction };
    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);

    const { item } = chatWindowProps;
    const { uid, status } = item;
    const divEle = sampleWrapper.find('#docDiv');

    expect(doChatWindowAction).not.toHaveBeenCalled();
    divEle.at(0).simulate('click');
    expect(doChatWindowAction).toHaveBeenCalledWith(uid, status === 'minimized' ? 'open' : 'minimize');
  });

  it('should call onMessageSubmit when user press enter or submit', () => {
    const onMessageSubmit = jest.fn();
    const doSendMessage = jest.fn();

    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      onMessageSubmit,
      doSendMessage,
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);

    expect(doSendMessage).not.toHaveBeenCalled();

    const chatInputBox = sampleWrapper.find('input');

    chatInputBox.simulate('change', {
      target: {
        value: 'Nivedita Here',
      },
    });

    sampleWrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(doSendMessage).toHaveBeenCalled();

    chatInputBox.simulate('change', {
      target: {
        value: '    ',
      },
    });

    sampleWrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(doSendMessage).toHaveBeenCalled();
  });

  it('should show Chat History Links to Non - BothPartyPayUser', () => {
    const sampleWrapper = mount(<ChatWindow {...factory.FreeUserConnectChatWindow} />);
    expect(sampleWrapper.text()).toContain('Chat History');
  });
  it('should not show Chat History Links to BothPartyPay A case User', () => {
    const BothPartyPayAbucketUser = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        loading: null,
        typing: null,
        flash: null,
        flashType: 'default',
        since: 20180401220249,
        hide_message: true,
        items: [],
        mark: 1522904393666,
        chatUid: '6SH10710989',
      },
    };
    const sampleWrapper = mount(<ChatWindow {...BothPartyPayAbucketUser} />);
    expect(sampleWrapper.text()).not.toContain('Chat History');
  });

  it('should show Chat History Links to BothPartyPay B case User', () => {
    const sampleWrapper = mount(<ChatWindow {...factory.FreeUserConnectChatWindow} />);
    expect(sampleWrapper.text()).toContain('Chat History');
  });
  it('should show Report Misuse Links', () => {
    const sampleWrapper = mount(<ChatWindow {...factory.FreeUserConnectChatWindow} />);
    expect(sampleWrapper.text()).toContain('Report Misuse');
  });
  it('should mask/gamify the received message for BothPartyPayUser A case User', () => {
    const BothPartyPayAbucketUser = {
      ...factory.FreeUserConnectChatWindow,
      item: {
        ...factory.FreeUserConnectChatWindow.item,
        gamifiedCount: 12,
      },
      history: {
        loading: null,
        typing: null,
        flash: null,
        flashType: 'default',
        since: 20180401220249,
        hide_message: true,
        items: [],
        mark: 1522904393666,
        chatUid: '6SH10710989',
      },
    };

    const { item } = BothPartyPayAbucketUser;
    const { gamifiedCount } = item;

    const msg = gamifiedCount > 1 ? 'messages ' : 'message ';

    const sampleWrapper = mount(<ChatWindow {...BothPartyPayAbucketUser} />);
    expect(sampleWrapper.text()).toContain(
      `You have ${BothPartyPayAbucketUser.item.gamifiedCount} unread ${msg}from him. To view and reply Upgrade Now!`,
    ); // eslint-disable-line prettier/prettier
  });

  it('should show upgrade message on window open to BothPartyPayUser unless they are accepted by Premium member and there is any chat history', () => {
    const BothPartyPayUser = {
      ...factory.FreeUserConnectChatWindow,
      item: {
        ...factory.FreeUserConnectChatWindow.item,
        gamifiedCount: 12,
      },
      settings: {
        ...factory.FreeUserConnectChatWindow.settings,
        isBothPartyPayUser: true,
      },
      history: {
        loading: null,
        typing: null,
        flash: 'free_member',
        flashType: 'error',
        items: [],
        mark: 1522401167241,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...BothPartyPayUser} />);
    expect(sampleWrapper.text()).toContain('To start chatting with your matches,Upgrade Now!');
  });

  it('should show upgrade message on window open to free users unless they are accepted by Premium member and there is any chat history', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        loading: null,
        typing: null,
        flash: 'free_member',
        flashType: 'error',
        items: [],
        mark: 1522401167241,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);
    expect(sampleWrapper.text()).toContain('You can only reply to a Premium User. To continue chatting with your matches, Upgrade Now!');
  });

  it('should show invitation will be sent with chat to premium users', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      settings: {
        ...factory.FreeUserConnectChatWindow.settings,
        isPaidUser: true,
        isBothPartyPayUser: true,
      },
      profile: {
        ...factory.FreeUserConnectChatWindow.profile,
        flags: {
          ...factory.FreeUserConnectChatWindow.profile.flags,
          isFree: false,
          isPremium: true,
          membershipLevel: 'PremiumPlus',
          connectionNote: 'He sent you an Invitation with Email on 28 Mar 2018.',
          connectionError: false,
          connectionStatus: 'default',
          connectionAction: 'profile_contacted',
        },
      },
    };
    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);
    expect(sampleWrapper.text()).toContain('An Invitation will be sent along with your Chat.');
  });

  it('should show declined message when user tries to send message to member declined by him/her', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        flash: 'You have declined this connect.%HeShe% cannot be contacted.',
        flashType: 'error',
        items: [],
        mark: 1522400858668,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);
    expect(sampleWrapper.text()).toContain('You have declined this connect.He cannot be contacted.');
  });

  it('should show declined message when user tries to send message to member who declined him/her', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        flash: 'This member has declined this connect.%HeShe% cannot be contacted.',
        flashType: 'error',
        items: [],
        mark: 1522400858668,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);
    expect(sampleWrapper.text()).toContain('This member has declined this connect.He cannot be contacted.');
  });

  it('should show cancelled message when user tries to send message to member cancelled by him/her', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        flash: 'You have cancelled this connect.%HeShe% cannot be contacted.',
        flashType: 'error',
        items: [],
        mark: 1522400858668,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);
    expect(sampleWrapper.text()).toContain('You have cancelled this connect.He cannot be contacted.');
  });

  it('should show cancelled message when user tries to send message to member who cancelled him/her', () => {
    const chatWindowProps = {
      ...factory.FreeUserConnectChatWindow,
      history: {
        flash: 'This member has cancelled %hisHer% connect.%HeShe% cannot be contacted.',
        flashType: 'error',
        items: [],
        mark: 1522400858668,
        chatUid: 'JSH26295881',
      },
    };

    const sampleWrapper = mount(<ChatWindow {...chatWindowProps} />);
    expect(sampleWrapper.text()).toContain('This member has cancelled his connect.He cannot be contacted.');
  });
});
