import React, { PureComponent } from 'react';
import api from '../../api';

const withAPI = ComposedComponent => {
  class withAPIComponent extends PureComponent {
    getDraftProfile = ({ id, xDomain }) => api.get('/profile/:id/draft', { id }, { xDomain, disableDecorate: true });
    getExitIntentLayer = (requestedLayers = []) => api.get('/layers/me', { params: { types: requestedLayers } });
    getRegExitIntentLayer = () => this.getExitIntentLayer(['regExitIntent']);
    render = () => (
      <ComposedComponent
        {...this.props}
        getDraftProfile={this.getDraftProfile}
        getRegExitIntentLayer={this.getRegExitIntentLayer}
        getExitIntentLayer={this.getExitIntentLayer}
      />
    );
  }
  return withAPIComponent;
};

export default withAPI;
