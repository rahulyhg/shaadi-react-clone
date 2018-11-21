import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Box, Wrapper } from './styles';
import PropTypes from '../../PropTypes';
import AppBar from '../../mComponents/AppBar';
import RequestSummary from '../../mComponents/RequestSummary';
import { selector, MapAction, InboxPage } from '../InboxPage/mobile';
import fetchRequestSummary from '../../actions/doInboxAction/fetchRequestSummary';

class RequestPage extends React.PureComponent {
  componentDidMount() {
    if (`${this.props.type}_${this.props.action}` === 'request_pending') {
      this.props.fetchRequestSummary();
    }
  }
  onBack = () => {
    this.props.history.push('/inbox/pending/requests');
  };
  reqTitleMap = {
    request_accepted: 'Accepted Requests',
    request_awaiting: 'Sent Requests',
  };

  renderSections = type => {
    const title = `${this.props.type}_${this.props.action}`;
    const { requestSummary } = this.props;
    switch (type) {
      case 'header': {
        return (
          this.reqTitleMap[title] && (
            <AppBar
              title={this.reqTitleMap[title]}
              onBack={this.onBack}
              styles={{ backgroundColor: 'rgb(252, 91, 99)', position: 'fixed', top: 0 }}
            />
          )
        );
      }
      case 'RequestSummary': {
        const summaryBoxCount = Object.keys(this.props.requestSummary.detail).length;
        return (
          title === 'request_pending' &&
          !!Object.keys(this.props.requestSummary.detail).length && (
            <Wrapper>
              <Box type="topWrapper">
                {Object.keys(this.props.requestSummary.detail).map((reqType, index) => (
                  <Box type="Info" key={reqType}>
                    <RequestSummary
                      style={{ width: summaryBoxCount > 1 ? '202px' : `calc(100vw - 38px)`, marginLeft: `${index === 0 ? '9px' : '0'}` }}
                      infoType={reqType}
                      InfoData={requestSummary.detail[reqType]}
                      history={this.props.history}
                    />
                  </Box>
                ))}
              </Box>
            </Wrapper>
          )
        );
      }
      default:
        return null;
    }
  };
  render() {
    const title = `${this.props.type}_${this.props.action}`;
    const dockedHeader = title === 'request_pending' && Object.keys(this.props.requestSummary.detail).length;
    return (
      <InboxPage {...this.props} renderSections={this.renderSections} isDocked={!!this.reqTitleMap[title]} requestPanel={!!dockedHeader} />
    );
  }
}
const mapToStateProps = state => {
  const { requestSummary } = state;
  return {
    ...selector(state),

    requestSummary,
  };
};
RequestPage.defaultProps = {
  requestSummary: {},
};
RequestPage.propTypes = {
  type: PropTypes.oneOf(['connect', 'request']).isRequired,
  action: PropTypes.oneOf(['pending', 'accepted', 'awaiting', 'filtered', 'deleted']).isRequired,
  fetchRequestSummary: PropTypes.func.isRequired,
  requestSummary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.shape(PropTypes.history).isRequired,
};

export default withRouter(connect(mapToStateProps, { ...MapAction, fetchRequestSummary })(RequestPage));
