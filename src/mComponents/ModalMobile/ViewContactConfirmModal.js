import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const ViewContactConfirmModal = ({ display_name, onAction, onModalClose }) => (
  <div>
    <DialogContent style={{ paddingBottom: 0 }}>
      <Typography variant="subheading" color="textSecondary">
        Would you like to view contact details of {display_name}?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onModalClose} color="secondary">
        No
      </Button>
      <Button onClick={() => onAction('contactDetails')} color="secondary">
        Yes
      </Button>
    </DialogActions>
  </div>
);

ViewContactConfirmModal.propTypes = {
  display_name: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAction: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ViewContactConfirmModal;
