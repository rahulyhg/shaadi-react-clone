import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { DrawerContainer } from './styles';

class DrawerMobile extends React.PureComponent {
  render() {
    const { children, open } = this.props;
    return (
      <Drawer variant="persistent" anchor="left" open={open}>
        <DrawerContainer>{children}</DrawerContainer>
      </Drawer>
    );
  }
}

DrawerMobile.defaultProps = {};
DrawerMobile.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DrawerMobile;
