import React from 'react';
import PropTypes from '../../../PropTypes';
import Absolute from '../../../theme/Absolute';
import s from './styles';

const Arrow = ({ id, ...props }) => (
  <Absolute alignItems="center" justifyContent="center" bottom={props.bottom} right="0" width="20px" height="20px" id={`btn-arrow-${id}`}>
    <s.ArrowButton type="button" tabIndex="-1" {...props} />
  </Absolute>
);

Arrow.defaultProps = {
  bottom: '0px',
  id: '',
};

Arrow.propTypes = {
  bottom: PropTypes.string,
  id: PropTypes.string,
};

export default Arrow;
