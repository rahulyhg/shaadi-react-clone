import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../../theme/Wrapper';

const DrawerTitleWrap = ({ children, innerRef }) => (
  <Wrapper
    display="flex"
    alignItems="center"
    bgColor="#fff"
    boxShadow="0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.1)"
    width="80vw"
    maxWidth="80vw"
    minheight="54px"
    zIndex="7"
    innerRef={innerRef}
  >
    {children}
  </Wrapper>
);

DrawerTitleWrap.propTypes = {
  children: PropTypes.node.isRequired,
  innerRef: PropTypes.func.isRequired,
};

export default DrawerTitleWrap;
