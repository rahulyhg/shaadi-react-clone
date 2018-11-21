/* eslint-disable react/require-default-props */

import React from 'react';
import { connect } from 'react-redux';
import withReducer from '../../withReducer';
import shaadiDashBoard from '../../reducers/shaadiDashBoard';
import PropTypes from '../../PropTypes';
import onDashBoardInit from '../../actions/onDashBoardInit';
import doProfileAction from '../../actions/doProfileAction';

import { WidgetWrapper } from './styles';
import './styles.css';
import s from '../styles';

import Matches from '../../components/Matches';

const matchesTypes = {
  discovery_premium: {
    heading: 'Premium Matches',
    type: 'discovery_premium',
  },
  'recently-joined': {
    heading: 'New Matches for you',
    type: 'recently-joined',
  },
  discovery_recent_visitors: {
    heading: 'Recent Visitors',
    type: 'discovery_recent_visitors',
  },
  invites: {
    heading: 'Invitations',
    type: 'invites',
  },
};
class MyShaadiDashboardDesktop extends React.PureComponent {
  componentDidMount() {
    this.props.onDashBoardInit();
  }
  onAction = (uid, type, ...args) => {
    this.props.doProfileAction('my-shaadi', uid, type, ...args);
  };
  render() {
    return (
      <s.SearchPageWrapper topSpace={this.props.topSpace} isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
        <div>
          <WidgetWrapper type="listView">
            {['invites', 'discovery_recent_visitors'].filter(listType => this.props.dashBoardWidgets[listType]).map(type => (
              <WidgetWrapper key={type} type="carousal">
                <Matches
                  heading={matchesTypes[type].heading || ''}
                  profiles={this.props.profiles}
                  count={this.props.dashBoardWidgets[type].request_count}
                  results={this.props.dashBoardWidgets[type].data}
                  settings={this.props.settings}
                  onAction={this.onAction}
                  renderType="carousal"
                  widgetType={type}
                  paginator={this.props.dashBoardWidgets[type].paginator}
                />
              </WidgetWrapper>
            ))}
          </WidgetWrapper>
          <WidgetWrapper>
            {['discovery_premium', 'recently-joined'].filter(listType => this.props.dashBoardWidgets[listType]).map(type => (
              <WidgetWrapper key={type} type="single">
                <Matches
                  heading={matchesTypes[type].heading || ''}
                  profiles={this.props.profiles}
                  count={this.props.dashBoardWidgets[type].request_count}
                  results={this.props.dashBoardWidgets[type].data}
                  settings={this.props.settings}
                  onAction={this.onAction}
                  widgetType={type}
                  paginator={this.props.dashBoardWidgets[type].paginator}
                />
              </WidgetWrapper>
            ))}
          </WidgetWrapper>
        </div>
        <div style={{ width: '245px', border: '1px solid black' }}>
          <h1>Notification and header banner</h1>
        </div>
      </s.SearchPageWrapper>
    );
  }
}

MyShaadiDashboardDesktop.defaultProps = {};

MyShaadiDashboardDesktop.propTypes = {
  onDashBoardInit: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
};
MyShaadiDashboardDesktop.defaultProps = {};
MyShaadiDashboardDesktop.propTypes = {
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  dashBoardWidgets: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
};
MyShaadiDashboardDesktop.mapStateToProps = state => {
  const {
    inbox: { meta: { counts: { total: counts } } },
    profiles: { self: { gender, uid, name, photo } },
    profiles,
    shaadiDashBoard: dashBoard,
    session: { settings },
    chat,
    view,
  } = state;
  return {
    invitations: counts
      ? {
          accepted: counts.connect_accepted,
          received: counts.connect_pending,
          sent: counts.request_pending,
          acceptedByThem: counts.request_accepted,
        }
      : undefined,
    user: { gender, uid, name, photo },
    profiles,
    dashBoardWidgets: dashBoard.results,
    settings,
    isChatOpen: chat.settings.isOpen,
    topSpace: view.topSpace,
    windowWidth: view.width,
  };
};
export { MyShaadiDashboardDesktop };
export default withReducer('shaadiDashBoard', shaadiDashBoard)(
  connect(MyShaadiDashboardDesktop.mapStateToProps, { onDashBoardInit, doProfileAction })(MyShaadiDashboardDesktop),
);
