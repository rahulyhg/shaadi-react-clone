/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import Drawer, {
  UserSection,
  Menu,
  MenuItem,
  SubMenuItem,
  Footer,
  DesktopLink,
  Copyright,
  DownloadAppLink,
} from '../../mComponents/Drawer';

import { getDownloadAppLink } from '../../mComponents/utils';

const upgradeLink = wwwBaseUrl => `${wwwBaseUrl}/payment/index?source=menu_upgrade&pg=pym&return_path=${encodeURI(window.location.href)}`;

const appLinkInfo = getDownloadAppLink();

const DrawerPartial = ({
  self,
  notificationCount,
  wwwBaseUrl,
  drawerOpen = false,
  upgradeType,
  experiments = {},
  isLiteApp = false,
  domain,
}) => (
  <Drawer open={drawerOpen}>
    <UserSection
      isFreeUser={self.flags.isFree || upgradeType === 'renew'}
      profileLink={`${wwwBaseUrl}/my-shaadi/profile`}
      upgradeLink={upgradeLink(wwwBaseUrl)}
      name={self.name}
      uid={self.userHandle}
      photo={self.thumbnail}
      showUploadPhoto={!self.photos.count}
      upgradeType={upgradeType}
    />
    <Menu>
      <MenuItem title="Accepted" to={`${wwwBaseUrl}/inbox/accepted/interests`} icon="accepted" isExternal />
      <MenuItem title="Recent Visitors" to={`${wwwBaseUrl}/search/discovery/recent-visitors`} icon="recent_visitors" isExternal />
      <MenuItem title="My Profile" icon="my_profile">
        <SubMenuItem title="View/Edit Profile" to={`${wwwBaseUrl}/my-shaadi/profile`} isExternal />
        <SubMenuItem title="Edit Partner Preferences" to={`${wwwBaseUrl}/my-shaadi/partner-profile`} isExternal />
        <SubMenuItem title="Manage Photos" to={`${wwwBaseUrl}/my-shaadi/photo/advance`} isExternal />
        <SubMenuItem title="Verify Mobile Number" to={`${wwwBaseUrl}/my-shaadi/contact-details`} isExternal />
        <SubMenuItem title="View/Edit Horoscope Details" to={`${wwwBaseUrl}/my-shaadi/astro`} isExternal />
      </MenuItem>
      <MenuItem title="Account & Settings" to={`${wwwBaseUrl}/my-shaadi/my-account`} isExternal icon="account" />
      {isLiteApp && <MenuItem title="Change Language" to={`http://app.${domain}/stop-page/lang-selection`} icon="language" isExternal />}
      <MenuItem title="Notifications" to={`${wwwBaseUrl}/inbox/notifications`} isExternal icon="notifications" count={notificationCount} />
      <MenuItem title="Help & Support" to={`${wwwBaseUrl}/faq/call`} isRequired icon="help" />
      <MenuItem title="More" icon="more" isMoreBtn>
        <MenuItem icon="sent" title="Sent" to={`${wwwBaseUrl}/inbox/sent/interests`} isExternal />
        <MenuItem icon="deleted" title="Deleted" to={`${wwwBaseUrl}/inbox/archived/interests`} isExternal />
        <MenuItem icon="contact_filters" title="Contact Filters" to={`${wwwBaseUrl}/my-shaadi/partner-profile/contact-filter`} isExternal />
        <MenuItem icon="trms" title="Terms & Conditions" to={`${wwwBaseUrl}/shaadi-info/index/terms`} isExternal />
        <MenuItem icon="contact_us_icon" title="Contact Us" to={`${wwwBaseUrl}/contact-us`} isExternal />
        <MenuItem icon="logout" title="Logout" to={`${wwwBaseUrl}/registration/user/complete-logout`} isExternal />
      </MenuItem>
    </Menu>
    {!isLiteApp && (
      <DownloadAppLink platform={`${appLinkInfo.platform}`} url={`${appLinkInfo.link}`}>
        Download the Shaadi.com App
      </DownloadAppLink>
    )}
    <Footer>
      {!isLiteApp && (
        <DesktopLink to={`${wwwBaseUrl}/index/switch-to-desktop-view?go=${encodeURI(window.location.href)}`} isExternal>
          View Desktop version
        </DesktopLink>
      )}
      <Copyright>Copyright © 1996-2018 Shaadi.com</Copyright>
    </Footer>
  </Drawer>
);

DrawerPartial.defaultProps = {
  notificationCount: 0,
  name: '',
  isLiteApp: false,
  experiments: {},
  domain: '',
};

DrawerPartial.propTypes = {
  wwwBaseUrl: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  notificationCount: PropTypes.number.isRequired,
  self: PropTypes.shape({}).isRequired,
  upgradeType: PropTypes.string.isRequired,
  isLiteApp: PropTypes.bool.isRequired,
  experiments: PropTypes.shape({}),
  domain: PropTypes.string.isRequired,
};

export default DrawerPartial;
