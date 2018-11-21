import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Dialog from '../Common/Mui/Dialog/';
import DialogTitle from '../Common/Mui/Dialog/Title';
import DialogActions from '../Common/Mui/Dialog/Actions';
import DialogContent from '../Common/Mui/Dialog/Content';
import { AlertLink } from './styles';
import PropTypes from '../../PropTypes';

class ProfileAlert extends React.PureComponent {
  handleAlertClose = () => {
    this.props.onAction('closeAllTooltips');
  };

  render() {
    const { tooltip } = this.props;
    const alertOpen = tooltip.key !== 'none';
    const { title, body } = tooltip;
    return (
      <Dialog
        open={alertOpen}
        onClose={this.handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title ? <DialogTitle>{title}</DialogTitle> : null}
        <DialogContent style={{ paddingBottom: 0 }}>
          <Typography variant="subheading" color="textSecondary">
            {body.map(para =>
              para.items.map(
                item =>
                  item.type === 'link' ? (
                    <AlertLink to={item.url} isExternal>
                      &nbsp;{item.text}&nbsp;
                    </AlertLink>
                  ) : (
                    item.text
                  ),
              ),
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAlertClose} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ProfileAlert.defaultProps = {};

ProfileAlert.propTypes = {
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ProfileAlert;
