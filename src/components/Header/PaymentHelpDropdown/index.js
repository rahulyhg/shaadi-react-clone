import React from 'react';
import s from './styles';

class PaymentHelpDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onToggleDropdown = this.onToggleDropdown.bind(this);
    this.state = {
      showDropDown: 'none',
      arrowIcon: 'down',
    };
  }

  onToggleDropdown(e) {
    e.stopPropagation();
    const updateState = {};
    updateState.showDropDown = this.state.showDropDown === 'none' ? 'block' : 'none';
    updateState.arrowIcon = this.state.arrowIcon === 'down' ? 'up' : 'down';
    if (Object.keys(updateState).length) {
      this.setState(updateState);
    }
  }
  render() {
    return (
      <s.HelpSection onClick={e => this.onToggleDropdown(e)}>
        <s.HelpLink>Help</s.HelpLink>
        <s.ArrowLink icon={this.state.arrowIcon} />
        <s.HelpDropdown show={this.state.showDropDown}>
          <s.HelpDropList isExternal to="/customer-relations/faq/call?hlp=emVuZGhlbHA%3D" rel="noopener noreferrer" target="_blank">
            <s.HelpDeskLink>Help Desk</s.HelpDeskLink>
          </s.HelpDropList>
          <s.HelpDropList isExternal to="/customer-relations/faq/privacy-tips" rel="noopener noreferrer" target="_blank">
            <s.HelpDeskLink>Be Safe Online</s.HelpDeskLink>
          </s.HelpDropList>
        </s.HelpDropdown>
      </s.HelpSection>
    );
  }
}

export default PaymentHelpDropdown;
