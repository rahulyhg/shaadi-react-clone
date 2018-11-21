import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AsterikSup = styled.sup`
  display: inline-block;
  font: 300 13px 'Roboto', sans-serif;
  margin: 2px 0 0 2px;
`;

const MandatoryLabel = props => (
  <Fragment>
    {props.children}
    <AsterikSup>*</AsterikSup>
  </Fragment>
);

MandatoryLabel.propTypes = {
  children: PropTypes.string.isRequired,
};

export default MandatoryLabel;
