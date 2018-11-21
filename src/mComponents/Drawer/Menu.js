import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ children }) => <div>{children}</div>;

Menu.defaultProps = {};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
