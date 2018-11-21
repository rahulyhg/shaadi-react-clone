import PropTypes from 'prop-types';
import { parse } from 'qs';
import React from 'react';
import Message from '../Common/Message';
import { responseError } from './utils';

const ErrorMessage = ({ location }) => {
  const message = responseError(parse(location.search.slice(1)));
  return <Message>{message}</Message>;
};
ErrorMessage.propTypes = {
  location: PropTypes.shape(PropTypes.location).isRequired,
};
export default ErrorMessage;
