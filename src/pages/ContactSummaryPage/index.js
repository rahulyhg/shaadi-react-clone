import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "ContactSummaryPage.desktop" */ './desktop'), Spinner);

const ContactSummaryPage = ({ layout }) => (layout === 'desktop' ? <Desktop /> : '');

ContactSummaryPage.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(ContactSummaryPage);
