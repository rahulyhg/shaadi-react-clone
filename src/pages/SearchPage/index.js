import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "SearchPage.desktop" */ './desktop'), Spinner);
const Mobile = AsyncComponent(() => import(/* webpackChunkName: "SearchPage.mobile" */ './mobile'));

const SearchPage = ({ layout }) => (layout === 'desktop' ? <Desktop /> : <Mobile />);

SearchPage.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(SearchPage);
