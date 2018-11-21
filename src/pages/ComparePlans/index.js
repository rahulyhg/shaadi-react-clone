import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import('./desktop'), Spinner);
const Mobile = AsyncComponent(() => import('./mobile'));

const ComparePlansPage = ({ layout }) => (layout === 'desktop' ? <Desktop /> : <Mobile />);

ComparePlansPage.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(ComparePlansPage);
