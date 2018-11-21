import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const FirstPhotoUpload = props => (
  <s.FirstPhotoUploadWrapper>
    <s.Content>
      <s.ProfileHeading>
        Send profile photo privately to {props.data.name}!
        <s.LayerCloseBtn onClick={props.onModalClose} />
      </s.ProfileHeading>
      <s.PhotoAcceptMember>He is more likely to Accept Members who have a profile photo.</s.PhotoAcceptMember>
      <s.PhotoBtnWrapper>
        <s.ActivePhotoUploadBtn isExternal target="_blank" onClick={() => modalRedirectAndClose(props)}>
          Upload Photo Now
        </s.ActivePhotoUploadBtn>
        <s.SendPhotoDivider />
        <s.DisabledPhotoUploadBtn onClick={props.onModalClose}>{"I'll"} add profile photo later</s.DisabledPhotoUploadBtn>
      </s.PhotoBtnWrapper>
    </s.Content>
  </s.FirstPhotoUploadWrapper>
);

const modalRedirectAndClose = props => {
  props.onModalClose();
  window.location.href = `${props.wwwBaseUrl}/my-shaadi/photo/advance?lnkref=topMenu`;
};

FirstPhotoUpload.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default FirstPhotoUpload;
