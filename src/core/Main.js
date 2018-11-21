import React from 'react';
import PropTypes from '../PropTypes';
import theme from '../theme/common';

const Main = props => (
  <div className="CoreMain" style={theme.main}>
    {props.children}
  </div>
);

Main.propTypes = {
  children: PropTypes.children.isRequired,
};

export default Main;
