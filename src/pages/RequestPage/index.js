import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';

const Mobile = AsyncComponent(() => import(/* webpackChunkName: "RequestPage.mobile" */ './mobile'));
const RequestPage = ({ layout, type, action }) => layout !== 'desktop' && <Mobile action={action} type={type} />;

RequestPage.propTypes = {
  action: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(RequestPage);
