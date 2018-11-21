import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';
import { renderContactCondition } from '../utils';

const ProfileTitle = props => {
  const { isSettingsPaidUser, isSms, contactDetailsStatus, profileUrl, profileName } = props;
  return (
    <s.noCssDiv>
      {isSettingsPaidUser && isSms && renderContactCondition[contactDetailsStatus === 'available']}

      {isSettingsPaidUser && !isSms && `Call initiated with `}

      <s.uName target="_blank" to={profileUrl}>
        {profileName}
      </s.uName>
    </s.noCssDiv>
  );
};
ProfileTitle.propTypes = {
  isSettingsPaidUser: PropTypes.bool.isRequired,
  isSms: PropTypes.string.isRequired,
  contactDetailsStatus: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
};
export default ProfileTitle;
