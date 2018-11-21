import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsterikSup } from '../styles';

const MandatoryLabel = props => (
  <Fragment>
    {props.label}
    <AsterikSup>*</AsterikSup>
  </Fragment>
);

MandatoryLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default MandatoryLabel;
