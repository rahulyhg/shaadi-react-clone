import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/Common/FormElements/Button';
import withModal from '../../../../components/HOC/withModal';
import s from './styles';

const AboutMeTemplateModal = ({ closeModal, suggestedValue, updateValue }) => (
  <s.UploadPhotoLayer>
    <s.RegcontentMainWrap>
      <s.Regcontenthead>Recommended Text to make your profile stand out</s.Regcontenthead>
      <s.RegcontentWrap>{suggestedValue}</s.RegcontentWrap>
      <s.modelBtnWrap>
        <s.cancelBtn onClick={closeModal}>Cancel</s.cancelBtn>
        <Button
          onClick={() => {
            closeModal();
            updateValue(suggestedValue);
          }}
          padding={'0 30px'}
          margin={'40px 0 0'}
          height={'36px'}
          ignoreRoot
          layerBtn={'LayerBtn'}
        >
          Copy this
        </Button>
      </s.modelBtnWrap>
    </s.RegcontentMainWrap>
  </s.UploadPhotoLayer>
);

AboutMeTemplateModal.propTypes = {
  suggestedValue: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default withModal(AboutMeTemplateModal);
