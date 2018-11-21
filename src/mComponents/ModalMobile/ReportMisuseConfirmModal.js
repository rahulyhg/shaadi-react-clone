import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ReportMisuseConfigmIcon, ReportMisuseConfigmIconWrapper } from './styles';

const ReportMisuseConfirmModal = ({ display_name, onAction, onModalClose, reason, reasonText, uid }) => (
  <div>
    <DialogContent style={{ paddingBottom: 0 }}>
      <ReportMisuseConfigmIconWrapper>
        <ReportMisuseConfigmIcon />
      </ReportMisuseConfigmIconWrapper>
      <Typography variant="subheading" color="textSecondary">
        Your complaint against <b>{display_name}</b> will be sent to Shaadi.com team for review. We will notify you of the action taken.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onModalClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={() => onAction('report_misuse_mobile', reason, reasonText)} color="secondary">
        Send
      </Button>
    </DialogActions>
  </div>
);

ReportMisuseConfirmModal.propTypes = {
  display_name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  reasonText: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ReportMisuseConfirmModal;
