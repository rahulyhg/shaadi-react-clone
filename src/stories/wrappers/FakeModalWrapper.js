import React from 'react';
import PropTypes from 'prop-types';
import { LayerPartial } from '../../partials/LayerPartial/mobile';

export default class FakeConnectClickWrapper extends React.Component {
  static propTypes = {
    renderSection: PropTypes.func.isRequired,
  };
  state = { tempalte: 'none' };
  onAction = args => {
    this.setState({ template: 'upgrade' });
  };

  render() {
    const { template } = this.state;
    const { modalProps } = this.props; //eslint-disable-line
    return (
      <div style={{ width: '420px', fontFamily: 'sans-serif' }}>
        {this.props.renderSection(this.onAction, template)}
        <LayerPartial {...modalProps} template={template} />
      </div>
    );
  }
}
