/* eslint no-confusing-arrow: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import FamilyForm from './FamilyForm';
import AstroForm from './AstroForm';

const GamifiedForm = props =>
  props.kind === 'family' && props.isVisible ? (
    <FamilyForm {...props} />
  ) : props.kind === 'astro' && props.isVisible ? (
    <AstroForm {...props} />
  ) : (
    <span />
  );

GamifiedForm.defaultProps = {
  kind: 'family',
  isVisible: true,
  onOpen: () => {},
};

GamifiedForm.propTypes = {
  kind: PropTypes.oneOf(['family', 'astro']).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  uid: PropTypes.string.isRequired,
};

export default GamifiedForm;
