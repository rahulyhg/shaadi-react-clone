import React from 'react';
import PropTypes from 'prop-types';
import RippleWrap from '../../../theme/RippleWrap';
import Wrapper from '../../../theme/Wrapper';
import Cross from '../../../theme/Cross';

const DrawerClose = ({ closeDrawer }) => (
  <Wrapper width="100%" textAlign="center" flex="0.7" onClick={closeDrawer}>
    <RippleWrap minwidth="auto" minheight="54px" width="100%" color="inherit" bg="#fff" boxshadow="none">
      <Cross size="20px" />
    </RippleWrap>
  </Wrapper>
);

DrawerClose.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default DrawerClose;
