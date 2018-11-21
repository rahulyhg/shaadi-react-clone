/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';

import { RecentChatPage } from '../pages/RecentChatPage/mobile';
import props from '../fixtures/recentChatPageMobile';
import MobileDecorator from './decorators/mobileDecorator';

storiesOf('recentChatPageMobile', module)
  .addDecorator(story =>
    <MobileDecorator>
      {story()}
    </MobileDecorator>,
  )
  .add('with props', () =>
    <RecentChatPage {...props} />,
  ).add('no chat data', () =>
    <RecentChatPage {...props} items={[]}  />,
  );
