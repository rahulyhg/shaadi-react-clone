import React from 'react';
import { connect } from 'react-redux';

import { Provider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import prefixer from 'fela-plugin-prefixer';
import fallbackValue from 'fela-plugin-fallback-value';
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer';
import extend from 'fela-plugin-extend';
import 'typeface-roboto'; //eslint-disable-line
import constants from '../../constants/constants';

import Drawer from './drawer';

import PropTypes from '../../PropTypes';
import felaTheme from '../../theme/felaTheme';
import theme from '../../theme/common';

const renderer = createRenderer({
  plugins: [prefixer(), placeholderPrefixer(), fallbackValue(), extend()],
});
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff8e8d',
      main: '#ff5a60',
      dark: '#00bcd5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#62efff',
      main: '#00bcd5',
      dark: '#008ba4',
      contrastText: '#fff',
    },
  },
});

const getUpgradeType = membership => {
  if (membership.accountType === 'PAID' && membership.planDaysToExpiry < 7) {
    return 'renew';
  }
  return membership.upgradeType;
};

const MobileLayout = ({ drawerOpen, self, wwwBaseUrl, children, notificationCount, membership, experiments, platform, domain }) => (
  <MuiThemeProvider theme={muiTheme}>
    <Provider renderer={renderer}>
      <ThemeProvider theme={felaTheme}>
        <div style={theme.mobileContainer}>
          <Drawer
            drawerOpen={drawerOpen}
            self={self}
            wwwBaseUrl={wwwBaseUrl}
            notficationCount={notificationCount}
            upgradeType={getUpgradeType(membership)}
            isLiteApp={platform === constants.LITE_APP_PLATFORM}
            experiments={experiments}
            domain={domain}
          />
          <div style={drawerOpen ? theme.contentWithDrawerOpen : theme.contentWithDrawerClosed}>{children}</div>
        </div>
      </ThemeProvider>
    </Provider>
  </MuiThemeProvider>
);

MobileLayout.propTypes = {
  children: PropTypes.children.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  notificationCount: PropTypes.number.isRequired,
  self: PropTypes.shape({}).isRequired,
  membership: PropTypes.shape({}).isRequired,
  platform: PropTypes.string.isRequired,
  experiments: PropTypes.shape({}).isRequired,
  domain: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  drawerOpen: state.mView.drawerOpen,
  self: state.profiles.self,
  notificationCount: state.chat.counts.alerts,
  wwwBaseUrl: state.config.app.wwwBaseUrl,
  membership: state.header.membership,
  platform: state.config.app.platform,
  experiments: state.session.settings.experiments,
  domain: state.session.domain,
});

export default withRouter(connect(mapStateToProps, {})(MobileLayout));
