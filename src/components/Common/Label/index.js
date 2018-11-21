import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const Label = props => {
  const { isSeperate } = props;

  return (
    <s.Label id={`data_test_desc_${props.children.toLowerCase().replace(' ', '_')}`} isSeperate={isSeperate}>
      {props.children}
    </s.Label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  isSeperate: PropTypes.bool.isRequired,
};

export default Label;
