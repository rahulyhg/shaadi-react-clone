import React from 'react';
import PropTypes from 'prop-types';
import { SubMenuItemContainer } from './styles';

const SubMenuItem = ({ title, to, isExternal }) => (
  <SubMenuItemContainer to={to} isExternal={isExternal}>
    {title}
  </SubMenuItemContainer>
);

SubMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
};

export default SubMenuItem;
