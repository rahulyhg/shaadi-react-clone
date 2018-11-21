import React, { PureComponent } from 'react';
import PropTypes from '../../PropTypes';
import detectLayout from '../../actions/onAppInit/detectLayout';

const withExitIntentLayer = ComposedComponent => {
  class withExitIntentLayerComponent extends PureComponent {
    componentDidMount = () => document.addEventListener('mouseleave', this.checkExitIntent, true);
    componentWillUnmount = () => document.removeEventListener('mouseleave', this.checkExitIntent);
    checkExitIntent = event =>
      event.clientY <= 0 && this.props.showExitIntentLayer({ type: 'regExitEvent', uid: (this.props.user && this.props.user.uid) || '' });
    render = () => <ComposedComponent {...this.props} />;
  }
  withExitIntentLayerComponent.propTypes = {
    showExitIntentLayer: PropTypes.func.isRequired,
    user: PropTypes.shape(PropTypes.shaadiUser).isRequired,
  };
  return detectLayout().layout === 'mobile' ? ComposedComponent : withExitIntentLayerComponent;
};

export default withExitIntentLayer;
