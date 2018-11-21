import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "DailyRecommendationPage.desktop" */ './desktop'), Spinner);
const Mobile = AsyncComponent(() => import(/* webpackChunkName: "DailyRecommendationPage.mobile" */ './mobile'));

const DailyRecommendationsPage = ({ layout }) => (layout === 'desktop' ? <Desktop /> : <Mobile />);

DailyRecommendationsPage.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(DailyRecommendationsPage);
