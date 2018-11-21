import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Wrapper from '../../../theme/Wrapper';

export default props => (
  <Wrapper color="#ff5a60" height="calc(100vh - 55px)" alignItems="center" justifyContent="center" display="flex">
    <CircularProgress size={24} color="inherit" />
  </Wrapper>
);
