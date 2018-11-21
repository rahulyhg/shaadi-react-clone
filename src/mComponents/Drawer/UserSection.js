import React from 'react';
import PropTypes from 'prop-types';
import { UserSectionContainer, UserPhoto, UserTitle, UserUid, UserDetails, UpgradeLink, UpgradeText, AddPhotoBtn } from './styles';

const upgradeMessages = {
  upgrade: 'Upgrade to Premium',
  extend: 'Extend Membership',
  renew: 'Renew membership',
};

const UserSection = ({ photo, name, uid, profileLink, upgradeLink, isFreeUser, showUploadPhoto, upgradeType }) => (
  <div>
    <UserSectionContainer to={profileLink} isExternal>
      <UserPhoto src={photo} />
      <UserDetails>
        <UserTitle>Hello! {name}</UserTitle>
        <UserUid>({uid})</UserUid>
        {showUploadPhoto && (
          <AddPhotoBtn to={`/my-shaadi/photo/add?lnkref=TopNavMenu`} isExternal>
            Add Photo
          </AddPhotoBtn>
        )}
      </UserDetails>
    </UserSectionContainer>
    {isFreeUser && (
      <UpgradeLink to={upgradeLink} isExternal>
        <UpgradeText>{upgradeMessages[upgradeType]}</UpgradeText>
      </UpgradeLink>
    )}
  </div>
);

UserSection.defaultProps = {
  isFreeUser: false,
  name: '',
  uid: '',
  showUploadPhoto: false,
  upgradeType: 'upgrade',
};

UserSection.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  profileLink: PropTypes.string.isRequired,
  upgradeLink: PropTypes.string.isRequired,
  isFreeUser: PropTypes.bool.isRequired,
  showUploadPhoto: PropTypes.bool.isRequired,
  upgradeType: PropTypes.string.isRequired,
};

export default UserSection;
