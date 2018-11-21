import React from 'react';
import PropTypes from 'prop-types';
import { TopBarContainer } from './styles';

const TopBar = props => {
  const children = React.Children.map(props.children, child => React.cloneElement(child, {}));

  return <TopBarContainer>{children}</TopBarContainer>;
};

TopBar.defaultProps = {
  children: [],
};

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TopBar;
