import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';

const addSlash = base => (`${base}`.endsWith('/') ? `${base}` : `${base}/`);

const NotFound = ({ base, t }) => (
  <div style={{ padding: '60px 0', textAlign: 'center' }}>
    <h1>{t.title}</h1>
    <p>{t.description}</p>
    <a href={`${addSlash(base)}my-shaadi`}>{t.redirectText}</a>
  </div>
);

NotFound.propTypes = {
  t: PropTypes.t.isRequired,
  base: PropTypes.string.isRequired,
};

const selector = (state, { intl }) => ({ base: state.config.app.wwwBaseUrl, t: intl.messages.default.notFound });

export default injectIntl(connect(selector, {})(NotFound));
