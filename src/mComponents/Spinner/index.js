import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import CircularProgress from '../Common/Mui/CircularProgress';

const Spinner = ({ size, duration, color, thickness, ...props }) => (
  <Container {...props}>
    <CircularProgress {...{ size, duration, color, thickness }} />
  </Container>
);

Spinner.defaultProps = {
  style: {},
  size: 32,
  duration: '1s',
  color: 'primary',
  thickness: 2,
};

Spinner.propTypes = {
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  size: PropTypes.string,
  duration: PropTypes.string,
  color: PropTypes.string,
  thickness: PropTypes.number,
};

export default Spinner;
