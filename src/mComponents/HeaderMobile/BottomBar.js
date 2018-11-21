import React from 'react';
import PropTypes from 'prop-types';
import { BottomBarContainer } from './styles';

const BottomBar = props => {
  const children = React.Children.map(props.children, child => React.cloneElement(child, {}));
  return <BottomBarContainer length={children.length}>{children}</BottomBarContainer>;
};

BottomBar.defaultProps = {
  children: [],
};

BottomBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BottomBar;
