import React, { PureComponent } from 'react';
import Spinner from '../Spinner';
import constants from '../../constants/constants';
import PropTypes from '../../PropTypes';

const RedirectToLoginIfLoggedOut = ComposedComponent => {
  class RedirectToLoginIfLoggedOutComponent extends PureComponent {
    componentDidMount = () => this.props.session.user.isLoggedOut && this.props.history.push(constants.URI.loginPage);
    componentDidUpdate = () => this.props.session.user.isLoggedOut && this.props.history.push(constants.URI.loginPage);
    render = () => (this.props.session.isLoggedOut ? <Spinner /> : <ComposedComponent {...this.props} />);
  }

  RedirectToLoginIfLoggedOutComponent.propTypes = {
    session: PropTypes.shape(PropTypes.reducerSession).isRequired,
    history: PropTypes.shape(PropTypes.history).isRequired,
  };

  return RedirectToLoginIfLoggedOutComponent;
};

export default RedirectToLoginIfLoggedOut;
