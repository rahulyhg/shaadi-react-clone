import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const Message = ({ children }) => <React.Fragment>{children && <s.message>{children}</s.message>}</React.Fragment>;

Message.propTypes = {
  children: PropTypes.string.isRequired,
};
export default Message;
