import React from 'react';
import PropTypes from 'prop-types';

import s from './styles';

const Wrapper = props => <s.Wrapper left={props.left}>{props.children}</s.Wrapper>;

Wrapper.propTypes = {
  left: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default Wrapper;
