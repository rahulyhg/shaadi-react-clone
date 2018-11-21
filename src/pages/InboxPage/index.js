import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "InboxPage.desktop" */ './desktop'), Spinner);

const InboxPage = ({ windowWidth, type, action }) => windowWidth > 720 && <Desktop action={action} type={type} />;

InboxPage.propTypes = {
  action: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

const selector = state => ({
  windowWidth: state.view.width,
});

export default connect(selector, {})(InboxPage);
