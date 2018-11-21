import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import CircularProgress from '../Common/Mui/CircularProgress';

class SendRequestModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      willSendPassword: false,
    };
  }

  componentWillReceiveProps(props) {
    if (props.message !== this.state.message) {
      this.setState({ message: props.message });
    }
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  sendRequest = () => {
    // console.log('%c wire SendPhotoPassword case', 'font-size: 20px');
    // const actionHash = {
    //   remind: 'remind_confirm',
    //   accept: this.props.showMessageLayer ? 'send_message' : 'accept_confirm',
    // };
    // if (this.props.uid) {
    //   const action = actionHash[this.props.type] || 'connect_confirm';
    // }
    this.props.onAction('connect_confirm', this.state.message, this.state.willSendPassword);
  };

  renderSendPassword = () => (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.willSendPassword}
            onChange={() => this.setState({ willSendPassword: !this.state.willSendPassword })}
          />
        }
        label="Send Photo Password"
      />
    </FormGroup>
  );

  render() {
    if (this.props.disabled) {
      return (
        <DialogContent style={{ textAlign: 'center' }}>
          <CircularProgress color="primary" />
        </DialogContent>
      );
    }
    return (
      <div style={{ minWidth: '50%', overflow: 'hidden' }}>
        <DialogTitle style={{ paddingBottom: 0 }}>Write a Message</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <TextField
            id="multiline-flexible"
            multiline
            rowsMax="8"
            fullWidth
            autoFocus
            value={this.state.message}
            onChange={this.handleChange}
            margin="normal"
          />
          {this.props.settings.canSendPasswordOnConnect && this.renderSendPassword()}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.props.onModalClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={this.sendRequest}>
            Send
          </Button>
        </DialogActions>
      </div>
    );
  }
}

SendRequestModal.propTypes = {
  disabled: PropTypes.bool.isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  message: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default SendRequestModal;
