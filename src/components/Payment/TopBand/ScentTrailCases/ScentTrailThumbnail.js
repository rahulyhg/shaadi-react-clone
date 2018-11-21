import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';

const ScentTrailThumbnail = ({ photo, profileId }) => (
  <s.ScentTrailThumbnail>
    <s.ThumbnailImage>
      <img src={photo} alt={profileId} width="60" />
    </s.ThumbnailImage>
  </s.ScentTrailThumbnail>
);
ScentTrailThumbnail.defaultProps = {
  photo: '',
  profileId: '',
};
ScentTrailThumbnail.propTypes = {
  photo: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
};
export default ScentTrailThumbnail;
