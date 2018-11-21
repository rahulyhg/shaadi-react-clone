import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from '../../PropTypes';
import EoiMobileDropdown from '../EoiMobile/dropdown';
import { DropdownWrapper, IconStyles } from './styles';
import HorizontalPan from '../HorizontalPan';

class EoiDropdown extends React.Component { //eslint-disable-line
  state = {
    anchorEl: null,
  };

  onAction = args => event => {
    event.stopPropagation();
    this.props.onAction(...args);
  };

  handleMenu = event => {
    event.stopPropagation();
    HorizontalPan.disable('EoiDropdown');
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    event.stopPropagation();
    HorizontalPan.enable('EoiDropdown');
    this.setState({ anchorEl: null });
  };

  render() {
    const { profile, shortlistItems, onAction } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <DropdownWrapper no-pan="true">
        <IconButton
          no-pan="true"
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
          style={IconStyles}
        >
          <KeyboardArrowDown no-pan="true" />
        </IconButton>
        <Menu
          id="menu-appbar"
          no-pan="true"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          style={{ marginTop: '56px' }}
          open={open}
          onClose={this.handleClose}
        >
          <EoiMobileDropdown
            no-pan="true"
            connectionStatus={(profile.flags || {}).connectionStatus}
            shortlists={profile.shortlists || {}}
            shortlistItems={shortlistItems || []}
            onAction={onAction}
            handleClose={this.handleClose}
          />
        </Menu>
      </DropdownWrapper>
    );
  }
}

EoiDropdown.defaultProps = {};

EoiDropdown.propTypes = {
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  profile: PropTypes.shape(PropTypes.searchProfile).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default EoiDropdown;
