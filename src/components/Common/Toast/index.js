import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const Toast = props => (
  <s.Toast isVisible={props.isVisible}>
    <s.Content>{props.children}</s.Content>
    <s.CloseBtn onClick={props.onToastCloseClick} />
  </s.Toast>
);

Toast.defaultProps = {
  isVisible: false,
};

Toast.propTypes = {
  children: PropTypes.element.isRequired,
  isVisible: PropTypes.bool,
  onToastCloseClick: PropTypes.func.isRequired,
};

export default Toast;
