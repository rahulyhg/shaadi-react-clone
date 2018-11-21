import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import CallIcon from '@material-ui/icons/Call';
import PropTypes from '../../PropTypes';
import { ViewContactMobile, Flex } from './styles';

import CircularProgress from '../Common/Mui/CircularProgress';

const payLink = wwwBaseUrl => `${wwwBaseUrl}/payment?loc=profile&profileid=&source=sms`;

class ViewContactModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message || '',
      smsFormVisible: false,
      hasError: false,
    };
  }

  componentWillReceiveProps(props) {
    if (props.message !== this.state.message) {
      this.setState({ message: props.message });
    }
  }

  onSMSClick = () => {
    this.setState({ smsFormVisible: !this.state.smsFormVisible });
  };

  onSendClick = () => {
    if (!this.state.message) {
      this.setState({ hasError: true });
    } else {
      this.props.onAction('sendSms', { message: this.state.message });
    }
  };

  onSendVerificationRequest = () => {
    this.props.onAction('sendVerificationRequest');
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  renderFlash = () => {
    const FlashMessage = this.props.flash || '';

    return (
      <div>
        <DialogTitle>View Contact</DialogTitle>
        <DialogContent tyle={{ paddingBottom: 0 }}>
          <Typography>{this.props.flash}</Typography>
        </DialogContent>
        <DialogActions>
          {FlashMessage.indexOf('Membership') >= 0 && (
            <Button href={payLink(this.props.wwwBaseUrl)} color="secondary">
              Renew Membership
            </Button>
          )}
          <Button onClick={this.props.onModalClose} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </div>
    );
  };

  renderMessage = (paras, title = null) => {
    const { onModalClose } = this.props;

    return (
      <div>
        <DialogTitle>{title || 'View Contact'}</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <Typography>{paras.map(msg => <span key={msg.slice(0, 30)}>{msg}</span>)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onModalClose} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </div>
    );
  };

  renderFiltered = () => {
    const { onModalClose, heShe, himHer } = this.props;

    return (
      <div>
        <DialogTitle>Filtered Contact</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <Typography>
            {heShe} has Filtered your Profile. You can express Interest in {himHer.toLowerCase()} and contact {himHer.toLowerCase()} once{' '}
            {heShe.toLowerCase()} Accepts your Invitation.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onModalClose} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </div>
    );
  };

  renderVerificationRequest = () => {
    const { onModalClose, name, heShe, himHer, hisHer } = this.props;
    return (
      <div>
        <DialogTitle>Number not verified</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <Typography>
            {name} has not verified {hisHer.toLowerCase()} number yet. You can request {himHer.toLowerCase()} to verify{' '}
            {hisHer.toLowerCase()} number. We will notify you once {heShe.toLowerCase()} verifies {hisHer.toLowerCase()} number.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={onModalClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={this.onSendVerificationRequest}>
            Send Request
          </Button>
        </DialogActions>
      </div>
    );
  };

  renderSMS = () => (
    <div>
      <DialogTitle>Send A Text SMS</DialogTitle>
      <DialogContent style={{ paddingBottom: 0 }}>
        <TextField
          id="multiline-flexible"
          multiline
          rowsMax="8"
          fullWidth
          autoFocus
          color="secondary"
          error={this.state.hasError}
          value={this.state.message}
          onChange={this.handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={this.onSMSClick}>
          Cancel
        </Button>
        <Button color="secondary" onClick={this.onSendClick}>
          Send SMS
        </Button>
      </DialogActions>
    </div>
  );

  render() {
    const {
      heShe,
      hisHer,
      status,
      verificationRequested,
      flashType,
      loading,
      settings,
      contactPerson,
      email,
      mobile,
      mobileStatus,
      onAction,
    } = this.props;
    if (loading) {
      return (
        <DialogContent style={{ textAlign: 'center' }}>
          <CircularProgress color="primary" />
        </DialogContent>
      );
    }

    if (flashType === 'fatal' || flashType === 'success') {
      return this.renderFlash();
    } else if (this.state.smsFormVisible) {
      return this.renderSMS();
    } else if (status === 'filtered') {
      return this.renderFiltered();
    } else if (status === 'member_blocked') {
      return this.renderMessage([`You cannot view contact detail of Blocked Members`]);
    } else if (status === 'profile_declined') {
      return this.renderMessage([
        `You cannot view ${hisHer} contact details as ${heShe} has Declined your Invitation.
      We will notify you if ${heShe} changes ${hisHer.toLowerCase()} mind.`,
      ]);
    } else if (status === 'member_declined') {
      return this.renderMessage([
        `${heShe} had made ${hisHer} contact details Visible on Accept. Please Accept ${hisHer} Invitation to view ${hisHer} contact details.`,
      ]);
    } else if (status === 'member_hidden') {
      return this.renderMessage(['Your Profile is currently hidden. To view contact detail of other Members, make your profile visible.']);
    } else if (status === 'filteredMemberContacted') {
      return this.renderMessage([`You cannot view ${hisHer} contact details as ${heShe.toLowerCase()} has Filtered you out.`]);
    } else if (status === 'profileCancelled') {
      return this.renderMessage([
        `You cannot view ${hisHer.toLowerCase()} contact details as ${heShe} has Cancelled ${hisHer.toLowerCase()} Invitation to you. We will notify you if ${heShe} changes ${hisHer.toLowerCase()} mind.`,
      ]);
    } else if (status === 'availableOnMemberVerification') {
      return this.renderMessage([
        `You can view ${hisHer.toLowerCase()} contact details after you Verify your own Phone number. Verifying your Phone number builds trust in your Profile and helps us send you important notifications regarding your Shaadi.com Profile.`,
      ]);
    } else if (status === 'availableOnVerification') {
      return this.renderVerificationRequest();
    } else if (verificationRequested) {
      return this.renderMessage(['Your request for verifying contact number has been sent to the member.'], 'Request Sent');
    }
    const isMobileHidden = mobileStatus === 'hidden';
    return (
      <div>
        <DialogTitle>View Contact</DialogTitle>
        <List style={{ padding: '0 8px' }}>
          <ListItem>
            <div style={{ width: '100%' }}>
              <ListItemText secondary="Mobile" />
              <ViewContactMobile>
                <Flex>
                  {isMobileHidden && (
                    <Typography variant="Subheading" color="secondary" style={{ paddingTop: '8px' }}>
                      Phone number hidden
                    </Typography>
                  )}
                  {isMobileHidden && <Typography variant="caption">(You can send an SMS)</Typography>}
                  {!isMobileHidden && (
                    <Typography variant="Subheading" color="secondary">
                      {mobile}
                    </Typography>
                  )}
                </Flex>
                <IconButton aria-label="Message" color="secondary" onClick={this.onSMSClick}>
                  <MessageIcon />
                </IconButton>
                <IconButton
                  aria-label="Call"
                  disabled={isMobileHidden}
                  color="secondary"
                  onClick={() => window.open(`tel:${mobile}`, '_system')}
                >
                  <CallIcon />
                </IconButton>
              </ViewContactMobile>
            </div>
          </ListItem>
          <Divider light style={{ margin: '0 8px' }} />
          <ListItem>
            <div>
              <ListItemText secondary="Email" />
              <ListItemText primary={email} style={{ paddingLeft: 0, paddingTop: '8px' }} />
            </div>
          </ListItem>
          <Divider light style={{ margin: '0 8px' }} />
          <ListItem>
            <div>
              <ListItemText secondary="Contact Person" />
              <ListItemText primary={contactPerson} style={{ paddingLeft: 0, paddingTop: '8px' }} />
            </div>
          </ListItem>
          <Divider light style={{ margin: '0 8px' }} />
          <ListItem>
            <div>
              <ListItemText secondary="Contacts Available" />
              <ListItemText
                primary={`${settings.contactsRemaining} of ${settings.contactsTotal}`}
                style={{ paddingLeft: 0, paddingTop: '8px' }}
              />
            </div>
          </ListItem>
        </List>
        <Divider light style={{ margin: '0 8px' }} />
        <Typography variant="caption" gutterBottom style={{ padding: '16px' }}>
          * An interest is sent when a {"Member's"} contact details are viewed.
        </Typography>
        <Divider light style={{ margin: '0 8px' }} />
        <DialogActions>
          <Button onClick={() => onAction('view_contact_ok_mobile')} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </div>
    );
  }
}

ViewContactModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  flashType: PropTypes.oneOf(['default', 'fatal', 'success', 'error', 'loading']).isRequired,
  flash: PropTypes.string.isRequired,
  hisHer: PropTypes.hisHer.isRequired,
  heShe: PropTypes.heShe.isRequired,
  himHer: PropTypes.himHer.isRequired,
  name: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  verificationRequested: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'free',
    'available',
    'availableOnVerification',
    'availableOnVerificationRequested',
    'availableOnRequest',
    'lockedMemberAccepted',
    'locked',
    'showFlash',
    'filtered',
    'profileCancelled',
    'member_declined',
    'profile_declined',
    'filteredMemberContacted',
    'member_blocked',
    'member_hidden',
    'availableOnMemberVerification',
  ]).isRequired,
  mobileStatus: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    contactsRemaining: PropTypes.string.isRequired,
    contactsTotal: PropTypes.string.isRequired,
  }).isRequired,
  contactPerson: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ViewContactModal;
