import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "ChatPartial.desktop" */ './desktop'), null);

const ChatPartial = ({ layout, canShowChat }) => (canShowChat && layout === 'desktop' ? <Desktop /> : null);

ChatPartial.propTypes = {
  layout: PropTypes.string.isRequired,
  canShowChat: PropTypes.bool.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
  canShowChat: state.session.canShowChat,
});

export default connect(selector, {})(ChatPartial);
