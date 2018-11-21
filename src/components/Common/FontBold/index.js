import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const FontBold = props => <s.Bold>{props.children}</s.Bold>;

FontBold.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]).isRequired,
};
export default FontBold;
