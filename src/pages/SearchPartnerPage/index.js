import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "SearchPartnerPage.desktop" */ './desktop'), Spinner);
const Mobile = AsyncComponent(() => import(/* webpackChunkName: "SearchPartnerPage.mobile" */ './mobile'));

const SearchPartnerPage = ({ layout }) => (layout === 'desktop' ? <Desktop /> : <Mobile />);

SearchPartnerPage.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(SearchPartnerPage);
