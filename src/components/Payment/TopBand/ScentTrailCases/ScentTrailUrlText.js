import PropTypes from 'prop-types';
import React from 'react';
import { STOPPAGE_SOURCES } from '../../utils';
import s from '../styles';

const ScentTrailUrlText = props => {
  const { type, acceptCount, profileId, profileName, wwwBaseUrl } = props;
  const isAcceptScentTrail = !!STOPPAGE_SOURCES.includes(type);
  const targetVal =
    isAcceptScentTrail && acceptCount >= 2 ? `${wwwBaseUrl}/inbox/accepted/interests` : `${wwwBaseUrl}/profile?profileid=${profileId}`;
  const targetText =
    profileName === '' && isAcceptScentTrail && acceptCount >= 2
      ? `${acceptCount - 1} ${acceptCount > 2 ? `others` : `Member`}`
      : profileName;
  return (
    <s.DisplayUrl isExternal to={targetVal} target="_blank">
      {targetText}
    </s.DisplayUrl>
  );
};
ScentTrailUrlText.defaultProps = {
  type: '',
  acceptCount: 0,
  profileId: '',
  profileName: '',
  wwwBaseUrl: '',
};
ScentTrailUrlText.propTypes = {
  type: PropTypes.string.isRequired,
  acceptCount: PropTypes.number.isRequired,
  profileId: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
};
export default ScentTrailUrlText;
