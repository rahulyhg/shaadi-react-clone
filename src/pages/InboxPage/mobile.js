/* eslint-disable import/no-named-as-default */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from '../../PropTypes';
import Spinner from '../../components/Spinner';
import onInboxInit from '../../actions/onInboxInit';
import doProfileAction from '../../actions/doProfileAction/mobile';
import doModalAction from '../../actions/doModalAction/mobile';
import { Container, Header, Title, Filter, Scrollbar, SpinnerContainer } from './stylesMobile';
import InboxList from '../../mComponents/InboxList';
import ProfileAlert from '../../mComponents/ProfileAlert';

export class InboxPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { type, action } = props;
    this.state = {
      param: {
        type,
        action,
        listType: `${type}_${action}`,
      },
      reqType: `${type}_${action}`,
      docHeader: false,
      counts: {},
    };
    this.headerRef = null;
    this.reqTitleMap = {
      connect_pending: 'Pending Invitations',
      connect_accepted: 'Accepted Invitations',
      connect_awaiting: 'Sent invitations',
      connect_filtered: 'Filtered Out Invitation',
      connect_deleted: 'Deleted Invitations',
      request_pending: 'Pending Requests',
      request_accepted: 'Accepted your Requests',
      request_awaiting: 'Sent Requests',
    };
    this.actionTaken = {};
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    document.title = this.props.pageTitle;
    const { type, action } = this.props;
    const param = {
      type,
      action,
      listType: `${type}_${action}`,
      page: 1,
    };
    this.changeList(param, {});
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }
  onPageChange = page => {
    this.changeList({ page });
  };

  onAction = (type, uid, ...args) => {
    this.props.doProfileAction('inbox', uid, type, ...args);
  };

  fetchNextList = (listType = this.props.listType) => {
    const nextlistMap = {
      connect_pending: { type: 'connect', action: 'filtered', page: 1 },
    };
    return nextlistMap[listType];
  };

  fillNewRecords = (listType, { currentPage = this.props.activePage, pageCount = this.props.pageCount }) => {
    const nextPage = currentPage + 1;
    if (nextPage <= pageCount) {
      this.changeList({ page: nextPage });
      return true;
    } else if (this.fetchNextList(listType)) {
      this.changeList(this.fetchNextList(listType));
      return true;
    }
    return false;
  };
  handleOnScroll = event => {
    if (!this.props.requestPanel && this.headerRef && this.headerRef.getBoundingClientRect().top <= 200) {
      this.setState({ docHeader: true });
    } else {
      this.setState({ docHeader: false });
    }

    const targetNode = event.target.documentElement;
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    if (scrollTop > 0 && scrollTop + targetNode.clientHeight + 200 >= targetNode.scrollHeight) {
      this.fillNewRecords(this.props.listType, {});
    }
  };
  userAction = source => (...args) => {
    this.props.doProfileAction(source, ...args);
  };
  changeList = (queryParam, postParam = {}) => {
    const { listType = this.props.listType } = queryParam;
    this.props.onInboxInit({ ...queryParam, listType }, postParam, window.location);
  };
  displayFilters = (reqType = this.state.reqType) => {
    this.props.doModalAction(reqType, null, 'filters');
  };
  renderToast = () => {
    const toast = this.props.toast.message; //eslint-disable-line
    return ReactDOM.createPortal(
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!toast}
        autoHideDuration={6000}
        style={{ position: 'fixed', bottom: '0px' }}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{toast}</span>}
        action={[]}
      />,
      document.getElementById('portal-full-screen'),
    );
  };

  render() {
    const { results, listType, meta } = this.props;
    const { listInfo } = results;
    let updatedresult = { [this.state.reqType]: results };
    if (listType === 'connect_filtered' && Object.keys(listInfo).length) {
      const newResultSet = [...results.items];
      const splitIndex = listInfo.connect_filtered.index;
      const firstListSet = newResultSet.splice(0, splitIndex);
      updatedresult = {
        connect_pending: { ...results, listType: 'connect_pending', items: firstListSet },
        connect_filtered: { ...results, listType: 'connect_filtered', items: newResultSet },
      };
    }
    const pagination = {
      loading: this.props.loading,
      currentPage: this.props.activePage,
      pageCount: this.props.pageCount,
      itemCount: this.props.itemCount,
      onPageChange: this.onPageChange,
      itemPerPage: this.props.itemPerPage,
      source: 'inbox',
    };
    return (
      <Container isDocked={this.props.isDocked}>
        {this.props.renderSections('header')}
        <Scrollbar
          isDocked={this.props.isDocked}
          style={{ marginTop: `${this.props.requestPanel ? '0' : `${this.props.isDocked ? '90px' : '44px'}`}` }}
        >
          {Object.keys(updatedresult).map((value, index) => (
            <Fragment key={`${value}`}>
              {index === 0 && this.props.renderSections('RequestSummary')}

              <Header
                isDocked={this.props.isDocked}
                isVisible={!this.props.freshLoading}
                docHeader={index === 0 && !this.props.requestPanel ? !this.state.docHeader : this.state.docHeader}
              >
                <Title>{`${this.reqTitleMap[value]} ${(meta.listCount && meta.listCount[value] && `(${meta.listCount[value]})`) ||
                  ''}`}</Title>
                {value !== 'connect_filtered' && <Filter onClick={() => this.displayFilters()} />}
              </Header>
              {(index > 0 || this.props.requestPanel) && <div style={{ position: 'relative' }} ref={node => (this.headerRef = node)} />}

              <InboxList
                wwwBaseUrl={this.props.wwwBaseUrl}
                loading={this.props.loading}
                results={updatedresult[value]}
                profiles={this.props.profiles}
                settings={this.props.settings}
                onAction={this.userAction('inbox')}
                requestType={this.props.requestType}
                page={this.props.activePage}
                Paginator={pagination}
                fillNewRecords={this.fillNewRecords}
                listType={value}
                counts={this.props.counts}
                freshLoading={this.props.freshLoading}
              />
            </Fragment>
          ))}

          <ProfileAlert tooltip={results.tooltip} onAction={this.onAction} />
        </Scrollbar>
        {this.props.freshLoading && (
          <SpinnerContainer isFixed={this.props.freshLoading} style={{ marginTop: `${this.props.requestPanel ? '20px' : '0'}` }}>
            <Spinner style={{ padding: '0 0 14px' }} />
          </SpinnerContainer>
        )}

        {this.renderToast()}
      </Container>
    );
  }
}
InboxPage.defaultProps = {
  activePage: 0,
  pageCount: 0,
  itemCount: 0,
  itemPerPage: 0,
  counts: {},
  listType: undefined,
  showTotal: true,
  renderSections: () => {},
  isDocked: false,
  requestPanel: false,
};
InboxPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  freshLoading: PropTypes.bool.isRequired,
  isDocked: PropTypes.bool,
  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  results: PropTypes.shape({
    ...PropTypes.results,
    permalink: PropTypes.string.isRequired,
    evt_ref: PropTypes.string.isRequired,
    results_id: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
  }).isRequired,

  requestType: PropTypes.shape({
    type: PropTypes.oneOf(['connect', 'request']).isRequired,
    action: PropTypes.oneOf(['pending', 'accepted', 'awaiting', 'filtered', 'deleted']).isRequired,
  }).isRequired,
  activePage: PropTypes.number,
  pageCount: PropTypes.number,
  itemCount: PropTypes.number,
  itemPerPage: PropTypes.number,
  type: PropTypes.oneOf(['connect', 'request']).isRequired,
  action: PropTypes.oneOf(['pending', 'accepted', 'awaiting', 'filtered', 'deleted']).isRequired,
  onInboxInit: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  doModalAction: PropTypes.func.isRequired,
  renderSections: PropTypes.func,
  pageTitle: PropTypes.string.isRequired,
  listType: PropTypes.string,
  counts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  meta: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    freshLoading: PropTypes.bool.isRequired,
    counts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  requestPanel: PropTypes.bool,
};
const selector = state => {
  const { profiles, inbox, session, mView } = state;
  const { wwwBaseUrl } = state.config.app;
  const { meta, results, pagination } = inbox;
  return {
    settings: session.settings,
    isLoggedOut: session.isLoggedOut,
    wwwBaseUrl,
    profiles,
    loading: meta.loading,
    freshLoading: meta.freshLoading,
    results,
    meta,
    showTotal: meta.showTotal,
    counts: meta.counts,
    activePage: pagination.activePage,
    pageCount: pagination.pageCount,
    itemCount: pagination.total,
    itemPerPage: pagination.itemPerPage,
    requestType: meta.requestType,
    pageTitle: meta.pageTitle,
    listType: meta.listType,
    toast: mView.toast,
  };
};
const MapAction = {
  onInboxInit,
  doProfileAction,
  doModalAction,
};
export { selector, MapAction };
export default withRouter(connect(selector, MapAction)(InboxPage));
