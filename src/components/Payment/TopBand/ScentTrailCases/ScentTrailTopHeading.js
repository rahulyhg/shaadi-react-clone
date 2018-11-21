import PropTypes from 'prop-types';
import React from 'react';
import ScentTrail from './ScentTrail';
import { topContentText } from '../../utils';

const ScentTrailTopHeading = props => {
  const { type, acceptCount, gender } = props;
  const profileURLText = <ScentTrail.UrlText {...props} />;
  const multiAcceptURLText = (acceptCount >= 2 && <ScentTrail.UrlText {...props} profileName="" />) || '';
  return topContentText(type, acceptCount, profileURLText, multiAcceptURLText, gender);
};
ScentTrailTopHeading.propTypes = {
  type: PropTypes.string.isRequired,
  acceptCount: PropTypes.number.isRequired,
  profileId: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(['male', 'female', 'none']).isRequired,
};
export default ScentTrailTopHeading;
