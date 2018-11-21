/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header, { TopBar, BottomBar, TopNavItem, BottomLink } from '../mComponents/HeaderMobile';
import MobileDecorator from './decorators/mobileDecorator';

storiesOf('HeaderMobile Component', module)
  .addDecorator(story =>
    <MobileDecorator>
          {story()}
    </MobileDecorator>,
  )
  .add('with no children', () => <Header />)
  .add('with empty TopBar and BottomBar', () => (
    <Header>
      <TopBar />
      <BottomBar />
    </Header>
  ))
  .add('with items', () => (
    <Header>
      <TopBar>
        <TopNavItem icon="sidebar" label="Menu" onClick={action('hamburger button clicked')} />
        <TopNavItem isActive icon="matches" label="Matches" count={27} href="https://www.shaadi.com/profile/daily-recommendations" />
        <TopNavItem icon="inbox" label="Inbox" count={3} href="https://www.shaadi.com/inbox/pending/interests" />
        <TopNavItem icon="chat" label="Chat" count={0} href="https://www.shaadi.com/inbox/chats/buddy-list" />
      </TopBar>
      <BottomBar>
        <BottomLink href="/profile/daily-recommendations" label="Search" />
        <BottomLink isActive href="/profile/daily-recommendations" label="Recommendations (27)" />
        <BottomLink href="/profile/daily-recommendations" label="Preferred (49)" />
        <BottomLink href="/profile/daily-recommendations" label="Broader" />
        <BottomLink href="/profile/daily-recommendations" label="2-Way" />
        <BottomLink href="/profile/daily-recommendations" label="Reverse" />
        <BottomLink href="/profile/daily-recommendations" label="Shortlist" />
        <BottomLink href="/profile/daily-recommendations" label="Viewed" />
      </BottomBar>
    </Header>
  ));
