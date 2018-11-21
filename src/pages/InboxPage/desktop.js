import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InlineLogin from '../../components/InlineLogin';
import FacetBar from '../../components/FacetBar';
import PropTypes from '../../PropTypes';
import SvgLoader from '../../components/Common/SvgLoader';
import onInboxInit from '../../actions/onInboxInit';
import doProfileAction from '../../actions/doProfileAction';
import s from './styles';
import NoResult from '../../components/Common/NoResult';
import Carousel from '../../components/Common/Carousel';
import SubNav from '../../components/SubNav';
import InboxList from '../../components/MatchList/InboxList';
import MatchItem from '../../components/MatchList/MatchItem';

class InboxPage extends React.PureComponent {
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
    };
    this.reqTitleMap = {
      connect_pending: 'Pending Invitations',
      connect_accepted: 'Accepted Invitations',
      connect_awaiting: 'Sent invitations',
      connect_filtered: 'Invitation from Filtered out Members',
      connect_deleted: 'Deleted Invitations',
    };
    this.subNavMap = {
      connect_pending: ['connect_pending', 'connect_filtered'],
      connect_filtered: ['connect_pending', 'connect_filtered'],
      request: ['request_pending', 'request_accepted', 'request_awaiting'],
    };
    this.subNavTitkeMap = {
      connect_pending: 'Pending Invitations',
      connect_filtered: 'Filtered Out',
      request_pending: 'Pending Requests',
      request_accepted: 'Accepted Requests',
      request_awaiting: 'Sent Requests',
    };
    this.onAction = this.onAction.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.changeList = this.changeList.bind(this);
    this.onNavClick = this.onNavClick.bind(this);
    this.carousalState = { activeSlide: 0 };
  }
  componentDidMount() {
    document.title = this.props.pageTitle;
    const { type, action } = this.props;
    const param = {
      type,
      action,
      listType: `${type}_${action}`,
    };

    this.changeList(param, {});
  }

  onPageChange(page) {
    window.scrollTo(0, 0);
    setTimeout(() => this.changeList({ page }), 10);
  }
  onListTypeChange(typeDesc) {
    this.changeList({ ...typeDesc, page: 1 });
    this.setState({ reqType: `${typeDesc.type}_${typeDesc.action}` });
  }
  onNavClick(listType) {
    const listTypeArr = listType.split('_');
    this.onListTypeChange({ type: listTypeArr[0], action: listTypeArr[1] });
  }
  onFacetChange = updatedFacet => {
    const cluster = updatedFacet.id;
    const values = updatedFacet.options.filter(i => i.isSelected).map(i => i.value);
    if (!values.length) {
      return;
    }
    window.scrollTo(0, 0);
    this.changeList({}, { cluster, values });
  };

  onFacetChangeStart = targetFacet => {
    const cluster = targetFacet.id;
    this.onAction(null, 'freezeInboxSearch', cluster);
  };
  onAction(...args) {
    this.props.doProfileAction('inbox', ...args);
  }
  userAction = source => (...args) => {
    this.props.doProfileAction(source, ...args);
  };
  changeList(queryParam, postParam = {}) {
    const { listType = this.props.listType } = queryParam;
    this.props.onInboxInit({ ...queryParam, listType }, postParam, window.location);
    this.setState({ reqType: listType });
  }

  renderItem = (item, i) => {
    const { requestType } = this.props;
    const ubt = `${this.props.featuredInvites.permalink}|${this.props.featuredInvites.results_id}|${item.uid}`;
    return (
      <MatchItem
        key={item.uid}
        order={i + 1}
        type="featuredCard"
        item={item}
        page={this.props.activePage}
        pg_ubt={window.btoa(unescape(encodeURIComponent(ubt)))}
        evt_ref={this.props.featuredInvites.evt_ref}
        results_id={this.props.featuredInvites.results_id}
        source={this.props.featuredInvites.source}
        permalink={this.props.featuredInvites.permalink}
        wwwBaseUrl={this.props.wwwBaseUrl}
        profile={this.props.profiles[item.uid]}
        settings={this.props.settings}
        onAction={this.userAction('featured')}
        requestType={requestType}
        tooltip={this.props.featuredInvites.tooltip}
      />
    );
  };
  render() {
    if (this.props.isLoggedOut) {
      return (
        <InlineLogin
          title={'Inbox'}
          path={this.props.location.pathname}
          wwwBaseUrl={this.props.wwwBaseUrl}
          message={
            'Here, you can view matching Profiles based on criteria specified by you in your partner requirements. You can set up to 20 different criteria like Age, Height, Community, Education, etc and get the best matches!'
          }
        />
      );
    }
    return (
      <s.InboxPage topSpace={this.props.topSpace} isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
        {!!this.props.featuredInvites.items.length && (
          <s.FeaturedWrap>
            <s.Title>Invitations matching your Preferences</s.Title>
            <Carousel
              onAction={this.onAction}
              width={940}
              maxComponentsInFrame={3}
              height={230}
              slidesCnt={this.props.featuredInvites.items.length}
              steps={1}
              source="inbox"
              stepsSize={315}
            >
              {this.props.featuredInvites.items.map(this.renderItem)}
            </Carousel>
          </s.FeaturedWrap>
        )}
        <s.InboxList>
          {['connect_pending', 'connect_filtered'].includes(this.state.reqType) || this.props.type === 'request' ? (
            <SubNav
              navList={this.props.type === 'request' ? this.subNavMap.request : this.subNavMap[this.state.reqType]}
              activeNav={this.state.reqType}
              onNavClick={this.onNavClick}
              counts={this.props.showTotal ? this.props.counts.total : this.props.counts.updated}
              listParams={this.subNavTitkeMap}
            />
          ) : (
            <s.InboxHeading>{`${this.reqTitleMap[this.state.reqType]}`}</s.InboxHeading>
          )}
          <s.ContentWrap>
            <s.LeftPanel>
              {!['connect_filtered'].includes(this.state.reqType) && (
                <FacetBar
                  source="inbox"
                  items={this.props.facets}
                  loading={this.props.loading}
                  frozenBy={this.props.frozenBy}
                  searchType={this.props.listType}
                  isHeaderBarVisible={this.props.isHeaderBarVisible}
                  onFacetChange={this.onFacetChange}
                  onFacetChangeStart={this.onFacetChangeStart}
                />
              )}
            </s.LeftPanel>
            <s.ListWrap>
              <s.LoadingWrapper isVisible={this.props.loading}>
                <SvgLoader isBigLoader isVisible />
              </s.LoadingWrapper>
              {!this.props.loading &&
                !!this.props.results.items.length && (
                  <InboxList
                    wwwBaseUrl={this.props.wwwBaseUrl}
                    loading={this.props.loading}
                    results={this.props.results}
                    profiles={this.props.profiles}
                    settings={this.props.settings}
                    onAction={this.userAction('inbox')}
                    requestType={this.props.requestType}
                    page={this.props.activePage}
                    Paginator={{
                      loading: this.props.loading,
                      currentPage: this.props.activePage,
                      pageCount: this.props.pageCount,
                      itemCount: this.props.itemCount,
                      onPageChange: this.onPageChange,
                      itemPerPage: this.props.itemPerPage,
                      source: 'inbox',
                    }}
                  />
                )}
              {!this.props.results.items.length &&
                !this.props.loading && <NoResult source="inbox" sourceType={this.state.reqType} count={this.props.counts} />}
            </s.ListWrap>
          </s.ContentWrap>
        </s.InboxList>
      </s.InboxPage>
    );
  }
}
InboxPage.defaultProps = {
  activePage: 0,
  pageCount: 0,
  itemCount: 0,
  itemPerPage: 0,
  counts: {},
  frozenBy: null,
  listType: undefined,
  showTotal: true,
  featuredInvites: {},
};
InboxPage.propTypes = {
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
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
  featuredInvites: PropTypes.shape({
    ...PropTypes.results,
    permalink: PropTypes.string.isRequired,
    evt_ref: PropTypes.string.isRequired,
    results_id: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
  }),
  counts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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
  pageTitle: PropTypes.string.isRequired,
  frozenBy: PropTypes.string,
  facets: PropTypes.arrayOf(PropTypes.shape(PropTypes.facet)).isRequired,
  listType: PropTypes.string,
  isHeaderBarVisible: PropTypes.bool.isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  showTotal: PropTypes.bool,
};
const selector = (state, { location }) => {
  const { chat, profiles, inbox, session, view } = state;
  const { wwwBaseUrl } = state.config.app;
  const { meta, results, pagination, facetBar, featuredInvites = {} } = inbox;
  return {
    location,
    settings: session.settings,
    isHeaderBarVisible: view.isHeaderBarVisible,
    isLoggedOut: session.isLoggedOut,
    isChatOpen: chat.settings.isOpen,
    topSpace: view.topSpace,
    windowWidth: view.width,
    wwwBaseUrl,
    profiles,
    loading: meta.loading,
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
    facets: facetBar,
    frozenBy: meta.frozenBy,
    listType: meta.listType,
    featuredInvites,
  };
};

export default withRouter(
  connect(selector, {
    onInboxInit,
    doProfileAction,
  })(InboxPage),
);
