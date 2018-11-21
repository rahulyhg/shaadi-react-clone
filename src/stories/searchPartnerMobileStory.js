/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import props from '../fixtures/searchPartnerMobilePageFixture';
import FakeCardSwipeWrapper from './wrappers/fakeCardSwipeWrapper';
import { SearchPartnerPage } from '../pages/SearchPartnerPage/mobile';
import Header, { TopBar, BottomBar, TopNavItem, BottomLink } from '../mComponents/HeaderMobile';
import MobileDecorator from './decorators/mobileDecorator';

storiesOf('SearchPartnerMobile Page', module)
  .addDecorator(story =>
    <MobileDecorator>
      <div style={{ position: 'fixed', top: 0, left: 0, width: 'inherit', zIndex: 2 }}>
        <Header>
          <TopBar>
            <TopNavItem icon="sidebar" label="Menu" onClick={action('hamburger button clicked')} />
            <TopNavItem isActive icon="matches" label="Matches" count={27} href="https://www.shaadi.com/profile/daily-recommendations" />
            <TopNavItem icon="inbox" label="Inbox" count={3} href="https://www.shaadi.com/inbox/pending/interests" />
            <TopNavItem icon="chat" label="Chat" count={0} href="https://www.shaadi.com/inbox/chats/buddy-list" />
          </TopBar>
          <BottomBar>
            <BottomLink href="/profile/daily-recommendations" label="Search" />
            <BottomLink href="/profile/daily-recommendations" label="Recommendations (27)" />
            <BottomLink isActive href="/profile/daily-recommendations" label="Preferred (49)" />
            <BottomLink href="/profile/daily-recommendations" label="Broader" />
            <BottomLink href="/profile/daily-recommendations" label="2-Way" />
            <BottomLink href="/profile/daily-recommendations" label="Reverse" />
            <BottomLink href="/profile/daily-recommendations" label="Shortlist" />
            <BottomLink href="/profile/daily-recommendations" label="Viewed" />
          </BottomBar>
        </Header>
      </div>
      {story()}
    </MobileDecorator>,
  )
  .add('with props', () => <SearchPartnerPage {...props} />)
  .add('swiping cards should remove them', () => <FakeCardSwipeWrapper {...props} />);
