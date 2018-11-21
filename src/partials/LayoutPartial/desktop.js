import React from 'react';
import PropTypes from '../../PropTypes';
import theme from '../../theme/common';

const DesktopLayout = props => (
  <div className="desktop-container" style={theme.container}>
    {props.children}
  </div>
);

DesktopLayout.propTypes = {
  children: PropTypes.children.isRequired,
};

export default DesktopLayout;
