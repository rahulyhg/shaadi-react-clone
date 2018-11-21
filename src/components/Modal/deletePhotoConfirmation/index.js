import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

class DeletePhotoConfirmation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(event) {
    this.props.data.onDelete(this.props.data.photo, this.props.data.index, event);
    this.props.onModalClose(event);
  }

  closeModal(event) {
    this.props.onModalClose(event);
  }

  render() {
    return (
      <s.UploadPhotoLayer>
        <ss.Header>
          <ss.Title>Delete Photo</ss.Title>
          {<s.CloseIntentModalBtn id="delete-photo" onClick={this.onDelete} />}
        </ss.Header>
        <s.DeletedWrap>
          <s.DeletedLayerWrap>
            <s.SuccessIcon />
            Your photo has been deleted.
            <s.UndoLink id="close-delete-photo-confirmation-modal" onClick={this.closeModal}>
              Undo
            </s.UndoLink>
          </s.DeletedLayerWrap>
        </s.DeletedWrap>
      </s.UploadPhotoLayer>
    );
  }
}

DeletePhotoConfirmation.propTypes = {
  data: PropTypes.shape({
    photo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default DeletePhotoConfirmation;
