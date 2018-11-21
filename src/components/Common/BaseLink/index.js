import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const BaseLink = props => (props.to ? <s.HyperLink {...props} /> : <s.HyperAnchor {...props} />);

BaseLink.defaultProps = {
  styleMixin: [],
  to: '',
};

BaseLink.propTypes = {
  styleMixin: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  to: PropTypes.string,
};
export default BaseLink;
