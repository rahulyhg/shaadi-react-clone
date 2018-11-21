import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "MyShaadiDashboard.desktop" */ './desktop'), Spinner);

const MyShaadiDashboard = ({ layout }) => (layout === 'desktop' ? <Desktop key={1} /> : <Desktop key={2} />);
MyShaadiDashboard.propTypes = { layout: PropTypes.string.isRequired };

const selector = ({ view: { layout } }) => ({ layout });
export default connect(selector, {})(MyShaadiDashboard);
