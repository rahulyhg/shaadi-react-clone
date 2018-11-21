import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';
import NotFound from '../NotFound';

const Mobile = AsyncComponent(() => import(/* webpackChunkName: "ChatHistoryPage.mobile" */ './mobile'), Spinner);

const ChatHistoryPage = ({ layout }) => (layout === 'desktop' ? <NotFound /> : <Mobile />);

ChatHistoryPage.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(ChatHistoryPage);
