/* eslint-disable */
import React from 'react';
import { ChatHistoryPage } from '../pages/ChatHistoryPage/mobile';
import fixtures from '../fixtures/chatHistoryMobileFixture';
import { storiesOf } from '@storybook/react'; //eslint-disable-line
import MobileDecorator from './decorators/mobileDecorator';

storiesOf('ChatHistoryPageMobile', module)
  .addDecorator(story =>
    <MobileDecorator>
      {story()}
    </MobileDecorator>
  )
  .add('with props', () =>
    <ChatHistoryPage {...fixtures.simpleProps} />,
  ).add('free user sends message', () =>
    <ChatHistoryPage {...fixtures.freeUserSendsMessageProps} />,
  ).add('free user receives message', () =>
    <ChatHistoryPage {...fixtures.freeUserReceivesMessageProps} />,
  );
