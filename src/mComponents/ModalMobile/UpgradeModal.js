import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { UpgradeCloseButton, LockIconWrap, MobileIcon } from './styles';

const payLink = wwwBaseUrl => `${wwwBaseUrl}/payment?loc=profile&profileid=&source=sms`;

const UpgradeModal = ({ display_name, wwwBaseUrl, display_photo, onAction, onModalClose }) => (
  <div>
    <DialogContent>
      <UpgradeCloseButton onClick={onModalClose}>
        <IconButton aria-label="Delete">
          <CloseIcon />
        </IconButton>
      </UpgradeCloseButton>
      <LockIconWrap>
        <LockIcon style={{ fill: 'white' }} />
      </LockIconWrap>
      <Typography variant="body2" align="center">
        Upgrade Now to get full access
      </Typography>
      <List>
        <ListItem style={{ padding: 0 }}>
          <Avatar src={display_photo} />
          <div>
            <ListItemText primary={display_name} secondary="Mobile: xxx xxx xxxx" style={{ paddingLeft: '16px' }} />
            <ListItemText secondary="Email: xxxxxxx@xxxxx.com" />
          </div>
        </ListItem>
      </List>
      <br />
      <Divider light />
      <br />
      <Typography variant="body2" align="left" gutterBottom>
        <MobileIcon size={16} kind="2-layers" />
        Premium Benefits:
      </Typography>
      <Typography gutterBottom>
        <MobileIcon size={16} kind="tick2x" style={{ marginLeft: '20px' }} />
        Chat with your Matches
      </Typography>
      <Typography gutterBottom>
        <MobileIcon size={16} kind="tick2x" style={{ marginLeft: '20px' }} />
        View Contact Matches
      </Typography>
      <Typography gutterBottom>
        <MobileIcon size={16} kind="tick2x" style={{ marginLeft: '20px' }} />
        Promote your Profile to all Matches
      </Typography>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="raised" color="secondary" href={payLink(wwwBaseUrl)}>
          View Plans
        </Button>
      </div>
    </DialogContent>
  </div>
);

UpgradeModal.propTypes = {
  display_name: PropTypes.string.isRequired,
  display_photo: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default UpgradeModal;
