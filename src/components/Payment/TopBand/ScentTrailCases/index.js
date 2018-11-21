import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import ScentTrail from './ScentTrail';

const ScentTrailCases = props => (
  <ScentTrail>
    <s.ScentTrailWrapper>
      <ScentTrail.Thumbnail {...props} />
      <ScentTrail.Text {...props} />
    </s.ScentTrailWrapper>
  </ScentTrail>
);
ScentTrailCases.defaultProps = {
  type: '',
  acceptCount: 0,
  profileId: '',
  profileName: '',
  photo: '',
  subText: '',
  wwwBaseUrl: '',
  gender: 'none',
};
ScentTrailCases.propTypes = {
  type: PropTypes.string.isRequired,
  acceptCount: PropTypes.number.isRequired,
  profileId: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(['male', 'female', 'none']).isRequired,
};
export default ScentTrailCases;
