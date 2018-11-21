import React from 'react';
import PropTypes from '../../../PropTypes';
import s from '../styles';

const PhotoUnderScreening = props => (
  <div>
    <s.PhotoUnderScreeningWrap>
      <s.PrivacyPhotoTitle>Your Photos will be blurred and shown to other Members</s.PrivacyPhotoTitle>
      <s.IllustrativePhoto genderPrefix={props.gender[0]}>Original Photo</s.IllustrativePhoto>
      <s.ToRightCurveArrow />
      <s.IllustrativeBlurPhoto genderPrefix={props.gender[0]}>
        Blurred Photo
        <s.PhotoLockIcon />
        <s.PhotoScreeningText>
          {props.isVisibleToPremium ? 'Visible to' : 'Visible'}
          <br />
          {props.isVisibleToPremium ? 'Premium Members' : 'on Accept'}
        </s.PhotoScreeningText>
      </s.IllustrativeBlurPhoto>
      <s.PhotoScreeningNote>
        <b>Note</b>: Photo for illustrative purposes only
      </s.PhotoScreeningNote>
    </s.PhotoUnderScreeningWrap>
  </div>
);

PhotoUnderScreening.propTypes = {
  isVisibleToPremium: PropTypes.bool.isRequired,
  gender: PropTypes.oneOf(['male', 'female']).isRequired,
};

export default PhotoUnderScreening;
