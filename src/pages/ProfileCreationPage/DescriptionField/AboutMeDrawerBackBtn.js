import React from 'react';
import PropTypes from 'prop-types';
import PointyArrow from '../../../theme/PointyArrow';
import Wrapper from '../../../theme/Wrapper';
import RippleWrap from '../../../theme/RippleWrap';

const AboutMeDrawerBackBtn = ({ closeDrawer }) => (
  <Wrapper className="btn btn-back" width="20px" height="55px" flex="0.7" justifyContent="center" display="flex" onClick={closeDrawer}>
    <RippleWrap minwidth="auto" width="100%" height="100%" bg="none" boxshadow="none">
      <PointyArrow left />
    </RippleWrap>
  </Wrapper>
);

AboutMeDrawerBackBtn.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default AboutMeDrawerBackBtn;
