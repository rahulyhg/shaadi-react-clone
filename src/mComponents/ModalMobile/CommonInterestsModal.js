import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { CommonInterestsIcon, MobileIcon, Description } from './styles';

const CommonInterestsModal = ({ items, himHer }) => (
  <div>
    <CommonInterestsIcon kind="satisfied_active" style={{ display: 'none', marginLeft: '20px' }} />
    <DialogTitle>You & {himHer}:</DialogTitle>
    <DialogContent>
      {items.map(item => (
        <Typography key={item.key} gutterBottom>
          <Description>
            <MobileIcon kind="tick2x" size={14} />
            <React.Fragment>{item.desc}</React.Fragment>
          </Description>
        </Typography>
      ))}
    </DialogContent>
  </div>
);

CommonInterestsModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  himHer: PropTypes.string.isRequired,
};

export default CommonInterestsModal;
