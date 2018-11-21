import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';
import withModal from '../../../../components/HOC/withModal';

const AboutMeEngagingModal = ({ about, closeModal, focusAboutMe, getTemplate }) => (
  <s.UploadPhotoLayer>
    <s.ContentWrap>
      <s.helpmeLayer
        onClick={() => {
          closeModal();
          focusAboutMe();
        }}
      >
        Please describe {about} in atleast 50 characters.
      </s.helpmeLayer>
      <s.aboutOrWrap>
        <s.aboutOrLeft />
        OR
        <s.aboutOrRight />
      </s.aboutOrWrap>
      <s.helpmeLayer
        onClick={() => {
          closeModal();
          getTemplate();
        }}
      >
        Let us help you write this
      </s.helpmeLayer>
    </s.ContentWrap>
  </s.UploadPhotoLayer>
);

AboutMeEngagingModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  focusAboutMe: PropTypes.func.isRequired,
  getTemplate: PropTypes.func.isRequired,
  about: PropTypes.string.isRequired,
};

export default withModal(AboutMeEngagingModal);
