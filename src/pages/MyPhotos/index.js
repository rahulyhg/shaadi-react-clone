import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "MyPhotos.desktop" */ './desktop'), Spinner);
// const Mobile = AsyncComponent(() => import(/* webpackChunkName: "MyPhotos.mobile" */ './mobile'));

// const MyPhotos = ({ layout }) => (layout === 'desktop' ? <Desktop /> : <Mobile />);
const MyPhotos = ({ layout }) => <Desktop />;

MyPhotos.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(MyPhotos);
