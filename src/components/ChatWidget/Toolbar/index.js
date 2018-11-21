/* eslint no-alert: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const StatusLabels = {
  online: 'I am Online',
  invisible: 'Invisible',
  offline: 'Go Offline',
};

class Toolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
    };
    this.toggleStatusDropdown = this.toggleStatusDropdown.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.toggleChatInterface = this.toggleChatInterface.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  changeStatus(status) {
    this.toggleStatusDropdown();
    if (status === 'offline') {
      const out = window.confirm('Are you sure you want to go offline?');
      if (!out) {
        return;
      }
    }
    this.props.changeSettings('status', status);
  }

  toggleStatusDropdown() {
    const isDropdownOpen = !this.state.isDropdownOpen;
    this.setState({ isDropdownOpen });
  }

  toggleChatInterface() {
    this.props.changeSettings('activeTab', 'none');
    this.props.changeSettings('isOpen', false);
  }

  toggleSound() {
    this.props.changeSettings('sounds', this.props.chatSettings.sounds === 'on' ? 'off' : 'on');
  }

  render() {
    const props = this.props;
    return (
      <s.Toolbar>
        <s.LeftSection>
          <s.StatusDropdown>
            <s.Status isDropdownOpen={this.state.isDropdownOpen} onClick={this.toggleStatusDropdown}>
              <s.StatusText>
                <s.StatusIcon icon={props.chatSettings.status} />&nbsp;
                {StatusLabels[props.chatSettings.status]}
              </s.StatusText>
              <s.DropdownIcon icon={this.state.isDropdownOpen ? 'dropdownOpen' : 'dropdown'} />
            </s.Status>
            <s.Dropdown isVisible={this.state.isDropdownOpen}>
              {Object.keys(StatusLabels)
                .filter(key => key !== props.chatSettings.status)
                .map(status => (
                  <s.StatusToggleBtn key={status} onClick={() => this.changeStatus(status)}>
                    <s.DropdownStatusIcon icon={status} />
                    {StatusLabels[status]}
                  </s.StatusToggleBtn>
                ))}
            </s.Dropdown>
          </s.StatusDropdown>
          <s.SoundsBtn chatSounds={props.chatSettings.sounds} onClick={this.toggleSound} />
        </s.LeftSection>
        <s.MinimiseBtn onClick={this.toggleChatInterface} />
      </s.Toolbar>
    );
  }
}

Toolbar.propTypes = {
  chatSettings: PropTypes.shape({
    status: PropTypes.oneOf(['invisible', 'online', 'offline']).isRequired,
    sounds: PropTypes.oneOf(['on', 'off']).isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  changeSettings: PropTypes.func.isRequired,
};

export default Toolbar;
