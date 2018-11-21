import React from 'react';
import PropTypes from 'prop-types';

import s from './styles';

const Wrapper = props => (
  <s.Wrapper source={props.source} left={props.left}>
    {props.children}
  </s.Wrapper>
);

Wrapper.defaultProps = {
  source: 'default',
};
Wrapper.propTypes = {
  left: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  source: PropTypes.string,
};
export default Wrapper;
