import React from 'react';

import { storiesOf } from '@storybook/react'; //eslint-disable-line
import Drawer, { UserSection, Menu, MenuItem, SubMenuItem, Footer, DesktopLink, Copyright, DownloadAppLink } from '../mComponents/Drawer';
import MobileDecorator from './decorators/mobileDecorator';

storiesOf('Drawer Component', module)
  .addDecorator(story => <MobileDecorator>{story()}</MobileDecorator>)
  .add('without props', () => <Drawer />)
  .add('with props', () => (
    <Drawer open>
      <UserSection
        isFreeUser
        profileLink="/my-shaadi/profile"
        upgradeLink="/upgrade"
        name="Sunita G"
        uid="SH81838238"
        photo="https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2NzA2NTMxNV5BMl5BanBnXkFtZTYwMjA1ODEy._V1_UY256_CR85,0,172,256_AL_.jpg"
      />
      <Menu>
        <MenuItem title="Accepted" url="#" icon="accepted" />
        <MenuItem title="Recent Visitors" url="#" icon="recent_visitors" />
        <MenuItem title="My Profile" icon="my_profile">
          <SubMenuItem title="View/Edit Profile" url="#" />
          <SubMenuItem title="Edit Partner Preferences" url="#" />
          <SubMenuItem title="Manage Photos" url="#" />
          <SubMenuItem title="Verify Mobile Number" url="#" />
          <SubMenuItem title="View/Edit Horoscope Details" url="#" />
        </MenuItem>
        <MenuItem title="Account & Settings" url="#" icon="account" />
        <MenuItem title="Notifications" url="#" icon="notifications" count={20} />
        <MenuItem title="Help & Support" url="#" icon="help" />
        <MenuItem title="More" url="#" icon="more" />
      </Menu>
      <DownloadAppLink platform="android">Download the Shaadi.com App</DownloadAppLink>
      <Footer>
        <DesktopLink href="/index/switch-to-desktop-view?go=https%3A%2F%2Fwww.shaadi.com">View Desktop version</DesktopLink>
        <Copyright>Copyright © 1996-2018 Shaadi.com</Copyright>
      </Footer>
    </Drawer>
  ));
