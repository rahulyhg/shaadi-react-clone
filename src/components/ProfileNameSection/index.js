import React from 'react';
import PropTypes from '../../PropTypes';
import ProfileNameSectionA from './ProfileNameSectionA';
import ProfileNameSectionB from './ProfileNameSectionB';

const ProfileNameSection = props => {
  const { profilePageBucket } = props;

  switch (profilePageBucket) {
    case 'A':
      return <ProfileNameSectionA {...props} />;
    case 'B':
    case 'C':
      return <ProfileNameSectionB {...props} />;
    default:
      return <ProfileNameSectionA {...props} />;
  }
};

ProfileNameSection.defaultProps = {
  profilePageBucket: 'A',
};
ProfileNameSection.propTypes = {
  profilePageBucket: PropTypes.string,
};

export default ProfileNameSection;
