import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class ViewContactConfirmModal extends React.PureComponent { //eslint-disable-line
  state = { reportMisuse: false };
  handleChange = () => {
    this.setState({ reportMisuse: !this.state.reportMisuse });
  };
  render() {
    const { onAction, onModalClose } = this.props;
    const { reportMisuse } = this.state;
    const onActionKey = reportMisuse ? 'report_misuse_confirm_mobile' : 'block_mobile';
    return (
      <div>
        <DialogTitle>Are you sure you want to Block {this.props.himHer.toLowerCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText>Blocked Member will not be able to view your Profile or contact you on Shaadi.com.</DialogContentText>
          <FormControlLabel
            control={<Checkbox checked={this.state.reportMisuse} onChange={this.handleChange} />}
            label="Also, report this profile for Misuse"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onAction(onActionKey)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </div>
    );
  }
}

ViewContactConfirmModal.propTypes = {
  himHer: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAction: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ViewContactConfirmModal;
