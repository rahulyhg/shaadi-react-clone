import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import LoadingDesktop from './loading';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "HeaderPartial.desktop" */ './desktop'), LoadingDesktop);
const Mobile = AsyncComponent(() => import(/* webpackChunkName: "HeaderPartial.mobile" */ './mobile'));

const HeaderPartial = ({ layout }) => (layout === 'desktop' ? <Desktop /> : <Mobile />);

HeaderPartial.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(HeaderPartial);
