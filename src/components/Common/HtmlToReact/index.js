/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React from 'react';

const HtmlToReact = ({ html }) => <span dangerouslySetInnerHTML={{ __html: html }} />;

HtmlToReact.defaultProps = {
  html: '',
};
HtmlToReact.propTypes = {
  html: PropTypes.string.isRequired,
};
export default HtmlToReact;
