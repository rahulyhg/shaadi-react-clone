import React from 'react';

export default class FakeConnectClickWrapper extends React.Component {
  state = { toast: null };
  onAction = args => {
    const toast = 'Invitation Sent';
    this.setState({ toast });
  };

  render() {
    const { toast } = this.state;
    return <div style={{ width: '420px' }}>{this.props.renderSection(this.onAction, toast)}</div>; //eslint-disable-line
  }
}
