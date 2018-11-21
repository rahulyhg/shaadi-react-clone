import React, { Fragment } from 'react';
import PropTypes from '../../../PropTypes';
import SvgLoader from '../SvgLoader';
import s from './styles';

const ProfilePhotoWithShield = props => (
  <s.ProfileImgWrap>
    {props.user.gender ? (
      <Fragment>
        <s.ProfileImg
          width="105"
          height="105"
          src={
            props.user.photos.hasApprovedProfilePhotos
              ? props.user.photos.profilePhoto.domain_name + props.user.photos.profilePhoto['120X120']
              : `/assets/silhouette-face-${props.user.gender}.png`
          }
        />
        <s.IconShield />
      </Fragment>
    ) : (
      <SvgLoader isVisible />
    )}
  </s.ProfileImgWrap>
);

ProfilePhotoWithShield.propTypes = {
  user: PropTypes.shape(PropTypes.shaadiUser).isRequired,
};

export default ProfilePhotoWithShield;
