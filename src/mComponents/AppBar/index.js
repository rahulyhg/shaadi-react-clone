import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from '../../PropTypes';

class Appbar extends React.Component { //eslint-disable-line
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderDropdownBtn = () => {
    const { renderActions } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
          style={{
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: '38px',
            height: '38px',
            padding: '8px',
            fontSize: '30px',
          }}
        >
          <KeyboardArrowDown />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          {renderActions(this.handleClose)}
        </Menu>
      </div>
    );
  };

  render() {
    const { classes, renderActions, onBack, title, styles, children } = this.props;
    return (
      <AppBar position="sticky" style={{ boxShadow: 'none', backgroundColor: 'transparent', ...styles }}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onBack}>
            <ArrowBack />
          </IconButton>
          {children || (
            <Typography variant="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>
          )}
          {!!renderActions && this.renderDropdownBtn()}
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

Appbar.defaultProps = {
  scrollTop: 0,
  styles: {},
  title: '',
};

Appbar.propTypes = {
  renderActions: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  children: PropTypes.children.isRequired,
  title: PropTypes.string,
  styles: PropTypes.shape({}),
  classes: PropTypes.shape({
    flex: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Appbar);
