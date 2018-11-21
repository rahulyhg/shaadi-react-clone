import React from 'react';
import PropTypes from 'prop-types';
import withProfileDataHelper from './withProfileDataHelper';
import s from '../../../components/Modal/styles';

const MiniProfile = props => (
  <s.miniProfile>
    <s.EIRecommendationPhotoLink isPrimary>
      <s.EIRecommendationPhoto
        style={{
          backgroundImage: `url(${props.photoUrl})`,
        }}
      />
    </s.EIRecommendationPhotoLink>
    <s.OtherData>
      <s.OtherDataSpan>{`${props.age}, ${props.religion},`}</s.OtherDataSpan>
      {props.motherTongue && <s.OtherDataSpan>{`${props.motherTongue},`}</s.OtherDataSpan>}
      {props.city && <s.OtherDataSpan>{`${props.city}`}</s.OtherDataSpan>}
    </s.OtherData>
  </s.miniProfile>
);

MiniProfile.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  motherTongue: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  religion: PropTypes.string.isRequired,
};

export default withProfileDataHelper(MiniProfile);
