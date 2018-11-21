import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse } from 'qs';

import PropTypes from '../../PropTypes';
import FacetBar from '../../components/FacetBar';
import MatchList from '../../components/MatchList';
import SuccessStories from '../../components/SuccessStories';
import InlineLogin from '../../components/InlineLogin';
import Pagination from '../../components/Common/Pagination';
import doOtherSearch from '../../actions/doOtherSearch';
import doProfileAction from '../../actions/doProfileAction';
import doDaTracking from '../../actions/doDaTracking';
import s from '../styles';
import ss from './styles';

import ContextProvider from '../../components/Common/Context';

const searchHeaderMsg = {
  'recently-joined': {
    preferred: 'New Members who match your Preferences',
    most_preferred: 'New Members who match most of your Preferences',
    default: 'New Members who match your Preferences',
  },
  near_me: { default: 'Members around your city who match most of your Preferences' },
  broader: { default: 'Members who match many of your Preferences' },
  reverse: { default: 'Members looking for matches like you' },
  '2-way': { default: "2-Way Matches: Profiles where both of you match each other's Partner Preferences" },
  discovery_newly_joined: { default: 'Recently Joined members that match many of your Preferences' },
  discovery_newly_joined_2way: { default: 'Recently Joined members that match many of your Preferences' },
  discovery_premium: { default: 'Recently upgraded Premium members' },
  discovery_premium_2way: { default: 'Recently upgraded Premium members' },
  discovery_recent_visitors: { default: 'Members who recently visited your Profile' },
  discovery_recent_visitors_two_way: { default: 'Members who recently visited your Profile' },
  preferred: { default: 'Members that match your Partner Preferences' },
  default: { default: 'Members that match your Partner Preferences' },
};

let searchForClearInterval;

class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.onFacetChange = this.onFacetChange.bind(this);
    this.onFacetChangeStart = this.onFacetChangeStart.bind(this);
    this.onListStyleChange = this.onListStyleChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onProfileSelection = this.onProfileSelection.bind(this);
    this.onAction = this.onAction.bind(this);
    this.onBulkConnect = this.onBulkConnect.bind(this);
    this.onItemHoverDelayShow = this.onItemHoverDelayShow.bind(this);
    this.onItemHoverOutDelayHide = this.onItemHoverOutDelayHide.bind(this);
    this.onItemHover = this.onItemHover.bind(this);
    this.onItemHoverOut = this.onItemHoverOut.bind(this);
    this.discoveryCntBox = this.discoveryCntBox.bind(this);
    this.onFacetChangeCarousel = this.onFacetChangeCarousel.bind(this);
    this.daTracking = this.daTracking.bind(this);
    this.state = {
      profilesToConnect: [],
      searchCriteriaPopupVisible: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Partner Search - Free Matrimonial - Shaadi.com';
    const changes = this.props.searchType === 'recently-joined' ? { sort_type: 'recorddate' } : {};
    this.search(changes);
  }

  componentWillReceiveProps(props) {
    if (this.props.location.key !== props.location.key) {
      const link = `${props.location.pathname}${props.location.search}`;
      if (link !== this.props.results.permalink) {
        window.scrollTo(0, 0);
        props.doOtherSearch(props.location.pathname, parse(props.location.search.slice(1)), {});
      }
    }

    if (this.props.featuredItems.items.length === 0 && props.featuredItems.items.length > 1) {
      this.setState({ featuredItems: props.featuredItems });
    }
  }

  onAction(uid, type, ...args) {
    const { source = 'otherSearch' } = (args.length > 0 && args.filter(i => i.source)[0]) || {};
    this.props.doProfileAction(source, uid, type, ...args);
  }

  onListStyleChange(vtype) {
    this.search({ vtype });
  }

  onPageChange(page) {
    window.scrollTo(0, 0);
    setTimeout(() => this.search({ page }), 10);
  }

  onFacetChange(updatedFacet) {
    const cluster = updatedFacet.id;
    const values = updatedFacet.options.filter(i => i.isSelected).map(i => i.value);
    if (!values.length) {
      return;
    }
    window.scrollTo(0, 0);
    this.search({ cluster, values });
  }

  onFacetChangeStart(targetFacet) {
    const cluster = targetFacet.id;
    this.onAction(null, 'freezeOtherSearch', cluster);
  }

  onFacetChangeCarousel() {
    window.scrollTo(0, 0);
    this.search({ cluster: 'featured', values: ['Y'] });
  }

  onSortChange({ key }) {
    this.search({ sort_type: key });
  }

  onProfileSelection(uid, isSelected) {
    const { profilesToConnect } = this.state;
    this.setState({
      profilesToConnect: isSelected ? [...profilesToConnect, uid] : profilesToConnect.filter(p => p !== uid),
    });
  }

  onBulkConnect() {
    this.props.doProfileAction(
      'otherSearch',
      null,
      'bulkConnect',
      this.state.profilesToConnect.filter(uid => ['default', 'shortlisted'].includes(this.props.profiles[uid].flags.connectionStatus)),
    );
  }

  onItemHoverDelayShow() {
    clearInterval(searchForClearInterval);
    searchForClearInterval = setInterval(() => {
      this.setState({ searchCriteriaPopupVisible: true });
    }, 500);
  }

  onItemHoverOutDelayHide() {
    clearInterval(searchForClearInterval);
    this.setState({ searchCriteriaPopupVisible: false });
  }

  onItemHover() {
    clearInterval(searchForClearInterval);
    this.setState({ searchCriteriaPopupVisible: true });
  }

  onItemHoverOut() {
    this.setState({ searchCriteriaPopupVisible: false });
  }

  daTracking(event, args = {}) {
    this.props.doDaTracking('otherSearch', event, args.uid, args);
  }

  search(changes = {}) {
    this.props.doOtherSearch(this.props.location.pathname, parse(this.props.location.search.slice(1)), changes);
  }

  discoveryCntBox(searchType) {
    if (
      ![
        'discovery_premium',
        'discovery_recent_visitors',
        'discovery_premium_2way',
        'discovery_recent_visitors_two_way',
        'broader',
        'reverse',
      ].includes(searchType)
    ) {
      return null;
    }
    const premiumArr = ['discovery_premium', 'discovery_premium_2way'];
    const recentlyVisitorArr = ['discovery_recent_visitors', 'discovery_recent_visitors_two_way'];
    const broaderArr = ['broader'];
    const reverseArr = ['reverse'];

    return (
      <ss.DiscoverTabWrap>
        <ss.DiscoverTabLink to={'/search/discovery/recent-visitors'} isActive={recentlyVisitorArr.includes(this.props.searchType)}>
          Recent Visitors{' '}
        </ss.DiscoverTabLink>
        <ss.DiscoverTabLink to={'/search/discovery/premium'} isActive={premiumArr.includes(this.props.searchType)}>
          Premium Matches
        </ss.DiscoverTabLink>
        <ss.DiscoverTabLink to={'/search/broader'} isActive={broaderArr.includes(this.props.searchType)}>
          Members you may like
        </ss.DiscoverTabLink>
        <ss.DiscoverTabLink to={'/search/personal'} isActive={reverseArr.includes(this.props.searchType)}>
          Members looking for me
        </ss.DiscoverTabLink>
      </ss.DiscoverTabWrap>
    );
  }
  renderNoResMsg() {
    const typeViewMsg = {
      broader: 'Viewed Matches',
      'recently-joined': 'Viewed Matches',
      near_me: 'Viewed Matches',
      discovery_newly_joined: 'Recently Joined Matches',
      discovery_newly_joined_2way: 'Recently Joined Matches',
      discovery_premium: 'Premium Matches',
      discovery_premium_2way: 'Premium Matches',
      discovery_recent_visitors: 'Recent Visitors',
      discovery_recent_visitors_two_way: 'Recent Visitors',
    };

    const typeUnviewedMsg = {
      reverse: 'Currently, you have no Reverse Matches.',
      '2-way': 'Currently, you have no 2-Way Matches.',
      'recently-joined': 'Sorry, no new Matches that meet your Partner Preferences.',
      near_me: 'Sorry, no new Matches near you that meet your Preferences.',
    };

    if (this.props.searchType === 'broader' && this.props.results.query.viewed === 'N') {
      return (
        <ss.NoMatch>
          Currently, you have no new Broader Matches.{' '}
          <ss.BroaderViewLink to={`/search/broader/viewed`}>See Matches already viewed</ss.BroaderViewLink>
        </ss.NoMatch>
      );
    }
    return this.props.results.query.viewed === 'Y' ? (
      <ss.NoMatch>Currently, you have no {typeViewMsg[this.props.searchType]}.</ss.NoMatch>
    ) : (
      <ss.NoMatch>{typeUnviewedMsg[this.props.searchType] || 'Looks like you have viewed all the matches here.'}</ss.NoMatch>
    );
  }

  renderSearchResHeaderMsg() {
    if (['basic_search', 'smart_search', 'whoisonline', 'specialcase_search', 'astrology_search'].includes(this.props.searchType)) {
      const { searchCriteria, results_id } = this.props.results || [];
      const isKeyRequired = ['searchfor-specialCases', 'searchfor-doNotShowProfiles'];
      const excludeKey = ['searchfor-count', 'searchfor-astroProfile'];
      const criteriaData =
        (searchCriteria.length > 0 &&
          searchCriteria
            .filter(item => excludeKey.indexOf(item.key) < 0)
            .map(item => (isKeyRequired.indexOf(item.key) >= 0 && `${item.term} - ${item.value}`) || item.value)
            .join(', ')) ||
        ' ';
      const modifySearchLink = `/search?search_type=${this.props.searchType}&modify_srch=Y&pg_searchresults_id=${results_id}`; // eslint-disable-line camelcase
      return (
        <div>
          <ss.ResultText>Your Search Results</ss.ResultText>
          <ss.ResultSection>
            <ss.SearchFor onMouseEnter={this.onItemHoverDelayShow} onMouseLeave={this.onItemHoverOutDelayHide}>
              <ss.SearchCount>{searchCriteria.length > 0 && searchCriteria[0].value}</ss.SearchCount>
              <ss.Criteria>{`${criteriaData.substring(0, 70)}${criteriaData.length > 70 ? '...' : ''}`}</ss.Criteria>
              <ss.MoreDropdown>more</ss.MoreDropdown>
            </ss.SearchFor>
            <ss.ModifySearchLink isExternal to={modifySearchLink}>
              Modify Search
            </ss.ModifySearchLink>
          </ss.ResultSection>
        </div>
      );
    }
    return (
      <s.SubHeading isVisible={this.props.results.items.length > 0}>
        {(searchHeaderMsg[this.props.searchType] && searchHeaderMsg[this.props.searchType][this.props.preferredSelection || 'default']) ||
          `Members that match your Partner Preferences`}
        <br />
      </s.SubHeading>
    );
  }

  render() {
    const premiumCarouselBucket = !!(
      this.props.settings.experiments &&
      this.props.settings.experiments.premium_carousel &&
      this.props.settings.experiments.premium_carousel.bucket === 'C'
    );
    const isFeaturedResult =
      (premiumCarouselBucket &&
        this.props.facets &&
        this.props.facets
          .filter(f => f && f.id === 'featured')
          .map(f => f.options.filter(o => o && o.id === 'Y').map(o => o && o.isSelected)[0])[0]) ||
      false;

    let carouselHeaderMsg = '';
    let backToMatchesLink = '';
    const islocNearMe = this.props.location.pathname.indexOf('/search/near-me') !== -1;
    const isLocNewMatches = this.props.location.pathname.indexOf('/search/new-matches') !== -1;
    if (isFeaturedResult && (islocNearMe || isLocNewMatches)) {
      carouselHeaderMsg =
        islocNearMe === true
          ? `Featured Members around your city who match most of your Preferences`
          : `New Featured Members who match most of your Preferences`;

      backToMatchesLink =
        islocNearMe === true ? '/search/near-me?loc=top-nav' : isLocNewMatches === true ? '/search/new-matches?loc=top-nav' : '';
    }
    if (this.props.isLoggedOut) {
      return (
        <InlineLogin
          title={'Matches'}
          path={this.props.location.pathname}
          wwwBaseUrl={this.props.wwwBaseUrl}
          message={
            'Here, you can view matching Profiles based on criteria specified by you in your partner requirements. You can set up to 20 different criteria like Age, Height, Community, Education, etc and get the best matches!'
          }
        />
      );
    }
    const listStyle =
      this.props.settings.experiments &&
      this.props.settings.experiments.grid_view &&
      this.props.settings.experiments.grid_view.bucket === 'B'
        ? 'list'
        : this.props.listStyle;
    return (
      <ContextProvider similarProfiles={this.props.similarProfiles} profiles={this.props.profiles}>
        <s.SearchPageWrapper topSpace={this.props.topSpace} isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
          <s.SearchPartnerPage>
            <s.Sidebar>
              {!this.props.loading && this.discoveryCntBox(this.props.searchType)}
              <FacetBar
                items={this.props.facets}
                loading={this.props.loading}
                frozenBy={this.props.frozenBy}
                searchType={this.props.searchType}
                isHeaderBarVisible={this.props.isHeaderBarVisible}
                onFacetChange={this.onFacetChange}
                onFacetChangeStart={this.onFacetChangeStart}
              />
              <div id="facetBottom" />
              {!!this.props.results.items.length && (
                <SuccessStories wwwBaseUrl={this.props.wwwBaseUrl} stories={this.props.successStories} type={'search'} />
              )}
            </s.Sidebar>
            <s.SearchResults>
              {!this.props.loading && !carouselHeaderMsg && this.renderSearchResHeaderMsg()}
              {this.state.searchCriteriaPopupVisible && (
                <ss.SearchForMore>
                  <ss.SearchDetail onMouseEnter={this.onItemHover} onMouseLeave={this.onItemHoverOut}>
                    {this.props.results.searchCriteria.length > 0 &&
                      this.props.results.searchCriteria.filter(item => item.term !== 'count').map(item => (
                        <ss.Details key={item.key}>
                          <ss.ItemLable>{item.term}</ss.ItemLable>
                          <ss.ItemInfo>{item.value}</ss.ItemInfo>
                        </ss.Details>
                      ))}
                  </ss.SearchDetail>
                </ss.SearchForMore>
              )}
              {carouselHeaderMsg && (
                <s.SubHeading isVisible={this.props.results.items.length > 0}>
                  <s.CarouselBackWrapper>
                    <s.CarouselBackLeft>{carouselHeaderMsg}</s.CarouselBackLeft>
                    <s.CarouselBackLink isExternal to={backToMatchesLink}>
                      <s.CarouselBackArrow />Back to Matches
                    </s.CarouselBackLink>
                  </s.CarouselBackWrapper>
                </s.SubHeading>
              )}
              <s.NoDataWrapper isVisible={this.props.flash && !this.props.flash.toLowerCase().includes('error: (499) cancel')}>
                <span title={this.props.flash}>
                  {(this.props.flash || '').toLowerCase().includes('failed to connect')
                    ? 'Failed to connect...  Please check your network connection.'
                    : 'Oops...  Something went wrong. Please refresh and try again.'}
                </span>
              </s.NoDataWrapper>
              <ss.NoResultWrapper
                isVisible={!this.props.results.items.length && !this.props.loading && !this.props.flash}
                searchType={this.props.searchType}
              >
                {this.renderNoResMsg()}
              </ss.NoResultWrapper>
              {!!this.props.results.items.length && (
                <MatchList
                  searchType={this.props.searchType}
                  wwwBaseUrl={this.props.wwwBaseUrl}
                  loading={this.props.loading || !!this.props.frozenBy}
                  results={this.props.results}
                  page={this.props.activePage}
                  profiles={this.props.profiles}
                  shortlistItems={this.props.shortlistItems}
                  settings={this.props.settings}
                  listStyle={listStyle}
                  sortOrder={this.props.sortOrder}
                  onSortChange={this.onSortChange}
                  onListStyleChange={this.onListStyleChange}
                  onMatchSelectionChange={this.onProfileSelection}
                  onAction={this.onAction}
                  onBulkConnect={this.onBulkConnect}
                  footerMatches={this.props.footerMatches}
                  searchPremiumBanner={this.props.searchPremiumBanner}
                  daTracking={this.daTracking}
                />
              )}
              {!!this.props.results.items.length && (
                <Pagination
                  loading={this.props.loading || !!this.props.frozenBy}
                  currentPage={this.props.activePage}
                  pageCount={this.props.pageCount}
                  onPageChange={this.onPageChange}
                />
              )}
            </s.SearchResults>
          </s.SearchPartnerPage>
        </s.SearchPageWrapper>
      </ContextProvider>
    );
  }
}

SearchPage.defaultProps = {
  flash: null,
  frozenBy: null,
  searchType: null,
  preferredSelection: null,
  allLinkCount: {
    matches: 0,
    recommendations: 0,
    discovery_newly_joined: 0,
    discovery_premium: 0,
    discovery_recent_visitors: 0,
    discovery_newly_joined_2way: 0,
    discovery_premium_2way: 0,
    discovery_recent_visitors_two_way: 0,
  },
  similarProfiles: {},
};

SearchPage.propTypes = {
  flash: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  frozenBy: PropTypes.string,
  isLoggedOut: PropTypes.bool.isRequired,
  isHeaderBarVisible: PropTypes.bool.isRequired,
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  searchType: PropTypes.string,
  preferredSelection: PropTypes.string,

  footerMatches: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  successStories: PropTypes.shape(PropTypes.successStories).isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  featuredItems: PropTypes.shape({
    ...PropTypes.results,
    permalink: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
    query: PropTypes.shape({
      viewed: PropTypes.string,
    }).isRequired,
  }).isRequired,

  settings: PropTypes.shape(PropTypes.settings).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,

  results: PropTypes.shape({
    ...PropTypes.results,
    permalink: PropTypes.string.isRequired,
    searchCriteria: PropTypes.array.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
    query: PropTypes.shape({
      viewed: PropTypes.string,
    }).isRequired,
  }).isRequired,

  facets: PropTypes.arrayOf(PropTypes.shape(PropTypes.facet)).isRequired,

  activePage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  sortOrder: PropTypes.arrayOf(PropTypes.shape(PropTypes.sortOrderItem)).isRequired,
  listStyle: PropTypes.oneOf(['list', 'grid']).isRequired,

  doOtherSearch: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  doDaTracking: PropTypes.func.isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  searchPremiumBanner: PropTypes.shape(PropTypes.premiumBanner).isRequired,
  similarProfiles: PropTypes.shape(),
};

const selector = (state, { location }) => {
  const { chat, otherSearch, successStories, profiles, session, view, similarProfiles } = state;
  const { meta, results, footerMatches, facetBar, pagination, searchType, match, featuredProfiles } = otherSearch;
  const { wwwBaseUrl } = state.config.app;

  return {
    location,
    settings: session.settings,

    isLoggedOut: session.isLoggedOut,
    isChatOpen: chat.settings.isOpen,
    topSpace: view.topSpace,
    windowWidth: view.width,
    isHeaderBarVisible: view.isHeaderBarVisible,
    successStories,

    wwwBaseUrl,
    profiles,
    footerMatches,
    shortlistItems: session.shortlists.items,
    allLinkCount: results.allLinkCount,
    flash: meta.flash,
    loading: meta.loading,
    frozenBy: meta.frozenBy,
    results,
    facets: facetBar,
    searchType: searchType.name,
    match,
    featuredItems: featuredProfiles,

    activePage: pagination.activePage,
    pageCount: pagination.pageCount,
    sortOrder: otherSearch.sortOrder.items,
    listStyle: meta.listStyle,
    preferredSelection: meta.preferredSelection,
    searchPremiumBanner: session.searchPremiumBanner,
    similarProfiles,
  };
};

export default withRouter(
  connect(selector, {
    doOtherSearch,
    doProfileAction,
    doDaTracking,
  })(SearchPage),
);
