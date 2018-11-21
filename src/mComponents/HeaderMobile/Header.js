import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer } from './styles';

const Header = props => {
  let rows = 0;
  const children = React.Children.map(props.children, child => {
    if (!child) return child;
    rows += 1;
    return React.cloneElement(child, {});
  });

  return <HeaderContainer rows={rows}>{children}</HeaderContainer>;
};

Header.defaultProps = {
  children: [],
};
Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
