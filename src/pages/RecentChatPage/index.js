import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';
import NotFound from '../../pages/NotFound';

const Mobile = AsyncComponent(() => import(/* webpackChunkName: "RecentChatPage.mobile" */ './mobile'), Spinner);

const RecentChatPage = ({ layout }) => (layout === 'desktop' ? <NotFound /> : <Mobile />);

RecentChatPage.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(RecentChatPage);
