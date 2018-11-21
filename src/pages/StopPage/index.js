import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const StopPage = props => {
  let Responsive = AsyncComponent(() => import(/* webpackChunkName: "StopPage.responsive" */ './responsive'), Spinner);
  if (props.layout === 'mobile' && props.location.pathname === '/stop-page/phone-setting') {
    Responsive = AsyncComponent(() => import(/* webpackChunkName: "StopPage.responsive" */ './responsive'), null);
  }
  return <Responsive match={props.match} layout={props.layout} history={props.history} />;
};

StopPage.propTypes = {
  layout: PropTypes.string.isRequired,
  match: PropTypes.shape(PropTypes.match).isRequired,
  history: PropTypes.shape(PropTypes.history).isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(StopPage);
