import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from '../../PropTypes';

class EoiMobileDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.actions = {
      defaultProvisional: [
        { key: 'none', label: 'Loading Shortlists...' },
        { key: 'ignore_mobile', label: "Don't Show Again" },
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      default: [
        { key: 'addToShortlist_mobile', label: 'Add to Shortlist' },
        { key: 'ignore_mobile', label: "Don't Show Again" },
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      misuseReporteds: [{ key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' }],
      blocked: [{ key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' }],
      ignored: [
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      contacted: [
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      theyContacted: [
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      cancelled: [
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      declined: [
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      accepted: [
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      theyAccepted: [
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
      shortlisted: [
        { key: 'removeFromShortlist_mobile', label: 'Remove from Shortlist' },
        { key: 'ignore_mobile', label: "Don't Show Again" },
        { key: 'blockConfirm_mobile', label: 'Block Profile' },
        { key: 'report_misuse_confirm_mobile', label: 'Report Profile/Photo' },
      ],
    };
  }

  onAction = key => event => {
    event.stopPropagation();
    const args = [];
    if (key === 'addToShortlist_mobile') {
      args.push(this.props.shortlistItems.slice(0, 1).map(i => i.id));
    }
    this.props.onAction(key, ...args);
    this.props.handleClose(event);
  };

  render() {
    const { connectionStatus, shortlists } = this.props;
    let actionKey = Object.keys(this.actions).includes(connectionStatus) ? connectionStatus : 'default';
    if (actionKey === 'default') {
      if (shortlists.ready) {
        actionKey = shortlists.count > 0 ? 'shortlisted' : 'default';
      } else {
        actionKey = 'defaultProvisional';
      }
    }
    const actions = this.actions[actionKey];
    return actions.map(item => (
      <MenuItem key={item.key} no-pan="true" onClick={this.onAction(item.key)}>
        {item.label}
      </MenuItem>
    ));
  }
}

EoiMobileDropdown.defaultProps = {
  membershipLevel: 'free',
  onAction: () => {},
};

EoiMobileDropdown.propTypes = {
  handleClose: PropTypes.func.isRequired,
  onAction: PropTypes.func,
  connectionStatus: PropTypes.oneOf([
    'accepted',
    'blocked',
    'cancelled',
    'contacted',
    'declined',
    'default',
    'ignored',
    'misuseReported',
    'filteredContacted',
    'shortlisted',
    'theyAccepted',
    'theyContacted',
    'theyDeclined',
  ]).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shortlists: PropTypes.shape({
    ready: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

export default EoiMobileDropdown;
