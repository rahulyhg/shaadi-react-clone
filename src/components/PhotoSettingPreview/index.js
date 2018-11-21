import React from 'react';
import PropTypes from '../../PropTypes';
import PhotoScreened from './PhotoScreened';
import PhotoUnderScreening from './PhotoUnderScreening';

const PhotoSettingPreview = props => {
  if (props.isUnderScreening && props.showLockIcon) {
    return <PhotoUnderScreening isVisibleToPremium={props.isVisibleToPremium} gender={props.gender} />;
  } else if (props.isPhotoScreened) {
    return (
      <PhotoScreened
        isVisibleToPremium={props.isVisibleToPremium}
        showLockIcon={props.showLockIcon}
        profilePhotoUrl={props.profilePhotoUrl}
      />
    );
  }
  return null;
};

PhotoSettingPreview.propTypes = {
  isVisibleToPremium: PropTypes.bool.isRequired,
  isPhotoScreened: PropTypes.bool.isRequired,
  showLockIcon: PropTypes.bool.isRequired,
  isUnderScreening: PropTypes.bool.isRequired,
  gender: PropTypes.oneOf(['male', 'female']).isRequired,
  profilePhotoUrl: PropTypes.string.isRequired,
};

export default PhotoSettingPreview;
