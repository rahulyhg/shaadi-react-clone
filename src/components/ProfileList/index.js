import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const ProfileList = props => {
  if (!props.results.loading && props.results.items.length === 0 && !props.results.flash) {
    return null;
  }
  return (
    <s.ProfileList isVisible profilePageBucket={props.profilePageBucket}>
      <s.Heading profilePageBucket={props.profilePageBucket}>{props.title}</s.Heading>
      {props.results.flash && <p style={{ fontStyle: 'oblique', textAlign: 'center' }}>{props.results.flash}</p>}
      {props.results.loading && <s.Loading />}
      {props.results.items.map(item => {
        const profile = props.profiles[item.uid] || props.profiles.default;
        const ageHieght = profile.base.detailList.filter(prop => prop.key === 'age-height')[0];
        const religionCaste = profile.base.detailList.filter(prop => prop.key === 'religion-caste')[0];
        const remainingDetails = profile.base.detailList.filter(prop => prop.key !== 'age-height' && prop.key !== 'religion-caste');
        return (
          <s.Item key={item.uid}>
            {/* opening in new tab as it's PWA */}
            <s.PhotoLink to={`/profile?profileid=${item.uid}&evt_ref=${props.evt_ref}`} target={'_blank'}>
              <s.Photo src={profile.thumbnail || profile.thumbnailBlur} />
            </s.PhotoLink>
            <s.Details>
              <s.NameLink
                profilePageBucket={props.profilePageBucket}
                to={`/profile?profileid=${item.uid}&evt_ref=${props.evt_ref}`}
                target={'_blank'}
              >
                {profile.name}
              </s.NameLink>
              <s.Detail key={`${ageHieght.key}-${religionCaste.key}`}>
                {ageHieght.value}, {religionCaste.value}
              </s.Detail>
              {remainingDetails.map(detail => <s.Detail key={detail.key}>{detail.value}</s.Detail>)}
            </s.Details>
          </s.Item>
        );
      })}
    </s.ProfileList>
  );
};

ProfileList.defaultProps = {
  profilePageBucket: 'A',
};

ProfileList.propTypes = {
  title: PropTypes.string.isRequired,
  evt_ref: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(
    PropTypes.shape({
      uid: PropTypes.string,
      name: PropTypes.string,
      base: PropTypes.shape({
        detailList: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }).isRequired,
    }),
  ).isRequired,
  results: PropTypes.shape({
    flash: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uid: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  profilePageBucket: PropTypes.string,
};

export default ProfileList;
