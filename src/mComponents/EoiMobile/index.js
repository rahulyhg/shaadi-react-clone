import React from 'react';

import Dialog from '../Common/Mui/Dialog';
import DialogActions from '../Common/Mui/Dialog/Actions';
import DialogContentText from '../Common/Mui/Dialog/ContentText';
import DialogContent from '../Common/Mui/Dialog/Content';
import MaterialButton from '../Common/Mui/Button';
import Tooltip from '../../components/Common/Tooltip';

import PropTypes from '../../PropTypes';
import { Toolbar, Button, Icon, Title, DescLink, Desc } from './styles';
import { getAction, getMessages, redirectionLinkMap } from './eoiConfig';
import { GA } from './../../actions/lib/utils';

let dialogSingleton = null;

class EoiMobile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.actions = getAction(props);
    this.state = {
      alertOpen: true,
      showTooltip: {},
    };
  }

  // componentWillReceiveProps(props) {
  //   if (this.props.justNow && !props.justNow) {
  //     this.setState({ alertOpen: true });
  //   }
  // }
  onAction = (key, isDisabled = false, showTooltip = false) => event => {
    event.stopPropagation();
    if (isDisabled && showTooltip) {
      this.handleTooltipOpen(key);
      return false;
    }
    switch (key) {
      case 'add_photo':
      case 'verify_contact':
        window.location.href = redirectionLinkMap[key] || '';
        break;
      default: {
        this.props.onAction(key);
        this.trackGaActionEvent(key);
      }
    }
    return false;
  };

  handleLinkAction = key => {
    this.props.onAction(key);
    this.trackGaActionEvent(key);
  };

  handleClose = () => {
    dialogSingleton = null;
    // this.setState({ alertOpen: false });
    this.props.onAction('clear_JustNow');
  };

  handleTooltipOpen = key => {
    const tooltipStatus = { ...this.state.showTooltip };
    Object.keys(tooltipStatus).forEach(value => {
      tooltipStatus[value] = false;
    });
    this.setState({ showTooltip: { ...tooltipStatus, [key]: true } });
    setTimeout(() => {
      this.handleTooltipClose(key);
    }, 1500);
  };

  handleTooltipClose = key => {
    this.setState({ showTooltip: { ...this.state.showTooltip, [key]: false } });
  };

  trackGaActionEvent = key => {
    GA.trackEoiEvent(key, this.props.gaEventActionLabel || this.props.actionSource);
  };

  wrapTooltip = (Component, item, id) => {
    if (item.showTooltip) {
      return (
        <Tooltip
          isVisible={this.state.showTooltip[item.key]}
          trigger="click"
          placement="top"
          overlayClassName="rc-tooltip-dark-invite rc-tooltip-placement-top"
          offset={[0, 4]}
          overlay={<span>{item.title}</span>}
          getTooltipContainer={() => document.getElementById(id)}
          onClose={() => this.handleTooltipClose(item.key)}
        >
          {Component}
        </Tooltip>
      );
    }
    return Component;
  };
  renderMessage = (connectionStatus, uid, onAction, gender) => {
    const isMale = gender === 'Male';
    this.messages = getMessages({ source: this.props.source, isMale });
    const message = this.messages[connectionStatus] || {};
    const { title, description, link, action, color } = message;
    let descriptionLink;
    if (link) {
      descriptionLink = (
        <DescLink no-pan="true" onClick={() => this.handleLinkAction(action)} passThrough={['onClick', 'no-pan']}>
          {link}
        </DescLink>
      );
    }
    return (
      !!Object.keys(message).length && (
        <div style={(connectionStatus === 'member_hidden' && { background: '#fcebec', borderRadius: '3px' }) || {}}>
          {this.renderAlert(this.props.justNowText)}
          <Title>{title}</Title>
          <Desc style={(color && { color }) || {}}>
            {description} {descriptionLink}
          </Desc>
        </div>
      )
    );
  };

  renderButtons = (items, uid, onAction, buttonSuffix, isPaidUser) => (
    <Toolbar id={`cta_${uid}`} source={this.props.source}>
      {this.renderAlert(this.props.justNowText)}
      {items.map((item, index) =>
        this.wrapTooltip(
          <Button
            source={this.props.source}
            key={item.key}
            actionType={item.key}
            no-pan="true"
            onClick={this.onAction(item.key, item.isDisabled, item.showTooltip)}
            passThrough={['onClick', 'no-pan']}
          >
            <Icon
              type={item.icon}
              no-pan="true"
              buttonSuffix={`${index <= 2 && (item.checkMembership && !isPaidUser) ? '' : `${buttonSuffix}`}${
                item.isDisabled ? '_disabled' : ''
              }`}
              imageExt={item.extension || 'png'}
            />
            {item.label}
          </Button>,
          item,
          `cta_${uid}`,
        ),
      )}
    </Toolbar>
  );

  renderAlert = justNowText => {
    if (!justNowText || dialogSingleton) {
      return null;
    }
    if (this.state.alertOpen) {
      dialogSingleton = justNowText;
    }
    return (
      <Dialog
        open={this.state.alertOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{justNowText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MaterialButton onClick={this.handleClose} color="secondary" autoFocus>
            Ok
          </MaterialButton>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { onAction, justNow, uid, gender, justNowText, membershipLevel, membershipTags, isPaidUser, memberHidden = false } = this.props;
    const { connectionStatus } = this.props;

    if (memberHidden) {
      return this.renderMessage('member_hidden', uid, onAction, gender);
    }

    if (justNow && !justNowText && connectionStatus !== 'default') {
      return this.renderMessage(connectionStatus, uid, onAction, gender);
    }

    if (Object.keys(this.actions).includes(connectionStatus)) {
      const buttonSuffix =
        membershipTags.indexOf('vip') !== -1 ? '_vip' : membershipLevel.indexOf('Premium') !== -1 || isPaidUser ? '_premium' : '';
      return this.renderButtons(this.actions[connectionStatus], uid, onAction, buttonSuffix, isPaidUser);
    }

    return (
      <div>
        {this.renderAlert(justNowText)}
        {this.renderMessage(connectionStatus, uid, onAction, gender)}
      </div>
    );
  }
}

EoiMobile.defaultProps = {
  connectionStatus: 'default',
  onAction: () => {},
  justNow: false,
  justNowText: '',
  canSendRemind: true,
  canCancelInvite: true,
  membershipLevel: 'free',
  membershipTags: '',
  source: 'default',
  memberHidden: false,
  actionSource: 'default',
  gaEventActionLabel: 'na&na',
};

EoiMobile.propTypes = {
  uid: PropTypes.string.isRequired,
  onAction: PropTypes.func,
  justNow: PropTypes.bool,
  isPaidUser: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  gender: PropTypes.oneOf(['Male', 'Female']).isRequired,
  connectionStatus: PropTypes.oneOf([
    'accepted',
    'blocked',
    'cancelled',
    'contacted',
    'declined',
    'default',
    'ignored',
    'misuseReported',
    'shortlisted',
    'theyAccepted',
    'theyContacted',
    'theyDeclined',
    'theyHidden',
    'disabled',
    'none',
    'add_photo',
  ]),
  membershipLevel: PropTypes.string,
  membershipTags: PropTypes.string,
  source: PropTypes.string,
  memberHidden: PropTypes.bool,
  actionSource: PropTypes.string,
  gaEventActionLabel: PropTypes.string,
};

export default EoiMobile;
