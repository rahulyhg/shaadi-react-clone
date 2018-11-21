import React from 'react';
import PropTypes from 'prop-types';
import MUIDrawer from '@material-ui/core/SwipeableDrawer';

const Drawer = ({ children, ...props }) => <MUIDrawer {...props}>{children}</MUIDrawer>;

Drawer.defaultProps = {
  children: null,
  anchor: 'right',
  onOpen() {},
  onClose() {},
};

Drawer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]),
  anchor: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Drawer;
