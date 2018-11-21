import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  ReportMisuseWrapper,
  ReasonInput,
  Reason,
  ReasonActions,
  BlueText,
  ReportMisuseIcon,
  ReportOptions,
  MisuseMessage,
} from './styles';

class ViewContactConfirmModal extends React.PureComponent { //eslint-disable-line
  state = { reason: '', reasonText: '', error: false };

  onReasonChange = e => {
    this.setState({ reasonText: e.target.value, error: false });
  };

  resetReason = () => {
    this.setState({ reason: null });
  };

  handleChange = (event, value) => {
    this.setState({ reason: value });
  };

  reasons = [
    {
      category: 'cat1',
      name: 'Fake/Misleading Profile',
    },
    {
      category: 'cat2',
      name: 'Multiple Profiles',
    },
    {
      category: 'cat3',
      name: 'Phone number is incorrect',
    },
    {
      category: 'cat4',
      name: 'Photos are fake or obscene',
    },
    {
      category: 'cat5',
      name: 'Has sent abusive Emails / Chats',
    },
    {
      category: 'cat6',
      name: 'Is already married / engaged',
    },
    {
      category: 'cat7',
      name: 'Other misuse reasons',
    },
  ];

  render() {
    const { classes, onAction, name, onModalClose } = this.props;
    const { reason, reasonText } = this.state;
    return (
      <ReportMisuseWrapper>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={reason ? this.resetReason : onModalClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Reason for Reporting
            </Typography>
          </Toolbar>
        </AppBar>
        <MisuseMessage>
          <ReportMisuseIcon />
          <Typography variant="body1" color="inherit" className={classes.flex}>
            You are raising a complaint against
            <BlueText> {name} </BlueText>
            with Shaadi.com team
          </Typography>
        </MisuseMessage>
        {!reason && (
          <ReportOptions>
            <RadioGroup aria-label="reason" name="reason" value={reasonText} onChange={this.handleChange}>
              {this.reasons.map(item => <FormControlLabel key={item.category} value={item.name} control={<Radio />} label={item.name} />)}
            </RadioGroup>
          </ReportOptions>
        )}
        {!!reason && (
          <Reason>
            <Typography variant="body1">{reason}</Typography>
            <ReasonInput
              placeholder="Please provide us more details so that we can take appropriate action."
              value={reasonText}
              onChange={this.onReasonChange}
              error={this.state.error}
            />
            <ReasonActions>
              <Button variant="raised" onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                variant="raised"
                color="primary"
                onClick={() =>
                  this.state.reasonText !== ''
                    ? onAction('report_misuse_mobile_confirm', reason, reasonText)
                    : this.setState({ error: true })
                }
              >
                Report
              </Button>
            </ReasonActions>
          </Reason>
        )}
      </ReportMisuseWrapper>
    );
  }
}

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

ViewContactConfirmModal.propTypes = {
  name: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ViewContactConfirmModal);
