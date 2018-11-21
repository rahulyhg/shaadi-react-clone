import React from 'react';
import PropTypes from '../../../PropTypes';

const HtmlSelect = props => <select accept="image/*" multiple={props.multiple} onChange={props.onChange} />;

HtmlSelect.defaultProps = {
  multiple: false,
  onChange() {},
};

HtmlSelect.propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

export default HtmlSelect;
