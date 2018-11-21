import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

class ProfilePhotoUpload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.data.redirectToAlbums && this.props.data.isModalClosed !== props.data.isModalClosed && props.data.isModalClosed) {
      this.props.headerAction('profilePhotoUploaded', { data: this.props.data });
    }
  }

  closeModal(event) {
    if (this.props.data.uploadingPhotoCount) {
      return false;
    }
    this.props.onModalClose(event);
    return true;
  }

  renderAttachments() {
    const attachments = this.props.data.attachments;

    return (
      <s.UploadProgressWrap className="over_y">
        {Object.keys(attachments).map((attachmentName, index) => (
          <s.ProgressContainer key={attachmentName} index={index}>
            <s.ProgressFileName>{attachmentName}</s.ProgressFileName>
            <s.ProgressFileDetail isVisible={attachments[attachmentName].isAttachmentUploaded}>
              Photos uploaded will be screened and made available on your profile within an hour.
            </s.ProgressFileDetail>
            <s.ProgressFileDetail failed isVisible={attachments[attachmentName].isInvalidAttachment}>
              Invalid File type. Accepted types for photo are jpg, jpeg, png, bmp, webp, gif, tiff, tif
            </s.ProgressFileDetail>
            <s.ProgressFileDetail failed isVisible={attachments[attachmentName].apiError}>
              {attachments[attachmentName].apiErrorMsg}
            </s.ProgressFileDetail>
            <s.ProgressFileDetail failed isVisible={this.props.data.isUploadFailed}>
              Unexpected Error!
            </s.ProgressFileDetail>
            <s.ProgressBarWrp isVisible={attachments[attachmentName].showProgress}>
              <s.ProgressBarStatus progressPercent={attachments[attachmentName].progressPercent} />
            </s.ProgressBarWrp>
          </s.ProgressContainer>
        ))}
      </s.UploadProgressWrap>
    );
  }

  render() {
    return (
      <s.UploadPhotoLayer>
        <ss.Header>
          <ss.Title>Uploading Photos</ss.Title>
        </ss.Header>

        <s.UploadImgBlock>
          <s.LoadImgBlock className="fieldset flash">
            {this.renderAttachments()}
            <s.UploadPhotoLayerFooter>
              <s.UploadPhotoLayerBtn
                id="close-photo-upload-modal"
                onClick={this.closeModal}
                uploading={!!this.props.data.uploadingPhotoCount}
              >
                Continue
              </s.UploadPhotoLayerBtn>
            </s.UploadPhotoLayerFooter>
          </s.LoadImgBlock>
        </s.UploadImgBlock>
      </s.UploadPhotoLayer>
    );
  }
}

ProfilePhotoUpload.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    source: PropTypes.string,
    attachments: PropTypes.shape({
      attachmentName: PropTypes.string,
      progressPercent: PropTypes.number,
      showProgress: PropTypes.bool,
      isAttachmentUploaded: PropTypes.bool,
      isInvalidAttachment: PropTypes.bool,
    }),
    isUploadFailed: PropTypes.bool.isRequired,
    isModalClosed: PropTypes.bool.isRequired,
    redirectToAlbums: PropTypes.bool.isRequired,
    uploadingPhotoCount: PropTypes.number.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  headerAction: PropTypes.func.isRequired,
};

export default ProfilePhotoUpload;
