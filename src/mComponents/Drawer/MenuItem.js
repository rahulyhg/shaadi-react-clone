import React from 'react';
import PropTypes from 'prop-types';
import { MenuItemContainer, MenuItemButton, MenuIcon, MenuText, MenuCount, MenuDropdown } from './styles';

class MenuItem extends React.PureComponent {
  state = { open: false };

  handleDropdownClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { icon, title, to, count, children, isExternal, isMoreBtn } = this.props;
    const { open } = this.state;
    if (children) {
      return (
        <div>
          {(!open || !isMoreBtn) && (
            <MenuItemButton onClick={this.handleDropdownClick}>
              <MenuIcon kind={icon} />
              <MenuText>{title}</MenuText>
              <MenuIcon kind="nav_arrow" open={this.state.open} />
            </MenuItemButton>
          )}
          <MenuDropdown open={open}>{children}</MenuDropdown>
        </div>
      );
    }
    return (
      <MenuItemContainer to={to} isExternal={isExternal}>
        <MenuIcon kind={icon} />
        <MenuText>{title}</MenuText>
        {!!count && <MenuCount>{count}</MenuCount>}
      </MenuItemContainer>
    );
  }
}

MenuItem.defaultProps = {
  children: null,
  count: 0,
  to: '#',
  isExternal: true,
  isMoreBtn: false,
};

MenuItem.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  count: PropTypes.number,
  isExternal: PropTypes.bool,
  isMoreBtn: PropTypes.bool,
};

export default MenuItem;
