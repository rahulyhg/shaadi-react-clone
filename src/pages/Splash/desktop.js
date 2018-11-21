import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import onSplashInit from '../../actions/onSplashInit';

class Splash extends PureComponent {
  componentDidMount() {
    this.props.onSplashInit(this.props.history);
  }

  render() {
    return <p>...</p>;
  }
}

Splash.propTypes = {
  onSplashInit: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect((state, { history }) => ({ history }), { onSplashInit })(Splash));
