import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from '../../PropTypes';
import { ProfileLink } from './styles';

const overrides = {
  Male: {
    requestPassword: '/assets/mobile/inbox_male_pp.png',
    passwordRequested: '/assets/mobile/inbox_male_pp.png',
    noPhoto: '/assets/mobile/inbox_male_pp.png',
  },
  Female: {
    requestPassword: '/assets/mobile/inbox_female_pp.png',
    passwordRequested: '/assets/mobile/inbox_female_pp.png',
    noPhoto: '/assets/mobile/inbox_female_pp.png',
  },
};

const ChatHeader = ({ classes, profile, onBack }) => (
  <AppBar className={classes.appbar}>
    <Toolbar>
      <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <ProfileLink to={`/profile?profileid=${profile.uid}`} isExternal>
        <Avatar
          alt={profile.name}
          src={(overrides[profile.gender] || {})[profile.flags.albumStatus] || profile.thumbnail}
          className={classes.avatar}
        />
        <ListItemText
          primary={profile.name.length > 18 ? `${profile.name.substring(0, 18)}...` : profile.name}
          secondary={profile.presence.lastOnlineStatus}
          classes={{ root: classes.root, primary: classes.username, secondary: classes.username }}
        />
      </ProfileLink>
    </Toolbar>
  </AppBar>
);

ChatHeader.propTypes = {
  profile: PropTypes.shape(PropTypes.basicProfile).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onBack: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    paddingLeft: 0,
  },
  flex: {
    flex: 1,
  },
  appbar: {
    width: 'inherit',
    boxShadow: '0 0 0 0',
  },
  avatar: {
    margin: 10,
    marginLeft: 0,
    width: '30px',
    height: '30px',
    background: '#fff',
    border: '1px solid #dfe0e3',
  },
  menuButton: {
    marginLeft: -12,
  },
  username: {
    color: '#fff !important',
  },
});

export default withStyles(styles)(ChatHeader);
