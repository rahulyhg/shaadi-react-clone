/* global window */
import PropTypes from 'prop-types';
import React from 'react';
import { stringify } from 'qs';
import Typography from '@material-ui/core/Typography';
import { Container, LoginLink } from './styles';

const InlineLogin = props => (
  <Container style={props.styles}>
    <Typography variant="title" gutterBottom>
      {props.title}
    </Typography>
    <Typography variant="body1" gutterBottom>
      {props.message}
    </Typography>
    <br />
    <Typography variant="subheading" color="error" gutterBottom>
      To use this section, register or login
    </Typography>
    <Typography variant="body2">
      Existing member?&nbsp;
      <LoginLink to={`${props.wwwBaseUrl}/registration/user/login?${stringify({ go: window.location.pathname })}`} isExternal>
        Login
      </LoginLink>
    </Typography>
    <Typography variant="body2">
      Not a Shaadi.com member?&nbsp;
      <LoginLink to={`${props.wwwBaseUrl}/registration/user`} isExternal>
        Register Now
      </LoginLink>
    </Typography>
  </Container>
);

InlineLogin.defaultProps = {
  styles: {},
};

InlineLogin.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  styles: PropTypes.shape({}),
};

export default InlineLogin;
