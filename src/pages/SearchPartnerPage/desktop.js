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
import Switch from '../../components/Common/Switch';
import Tooltip from '../../components/Common/Tooltip';
import doPreferredSearch from '../../actions/doPreferredSearch';
import doProfileAction from '../../actions/doProfileAction';
import doDaTracking from '../../actions/doDaTracking';
import s from '../styles';
import ContextProvider from '../../components/Common/Context';

class SearchPartnerPage extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.onFacetChange = this.onFacetChange.bind(this);
    this.onFacetChangeStart = this.onFacetChangeStart.bind(this);
    this.onListStyleChange = this.onListStyleChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onProfileSelection = this.onProfileSelection.bind(this);
    this.onIncludeMoreMatchesChange = this.onIncludeMoreMatchesChange.bind(this);
    this.onFacetChangeCarousel = this.onFacetChangeCarousel.bind(this);

    this.onAction = this.onAction.bind(this);
    this.daTracking = this.daTracking.bind(this);
    this.onBulkConnect = this.onBulkConnect.bind(this);

    this.state = {
      profilesToConnect: [],
      isMoreMatchesSelected: props.isMoreMatchesSelected,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Partner Search - Free Matrimonial - Shaadi.com';
    if (this.props.location.search.indexOf('carouselSeeAll=clicked') !== -1) {
      this.search({ cluster: 'featured', values: ['Y'] });
    } else {
      this.search();
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.isMoreMatchesSelected !== props.isMoreMatchesSelected) {
      this.setState({
        isMoreMatchesSelected: props.isMoreMatchesSelected,
      });
    }
    if (this.props.showMoreMatchesTour) {
      this.setState({ isMoreMatchesSelected: true });
    }
    if (this.props.location.key !== props.location.key) {
      const link = `${props.location.pathname}${props.location.search}`;
      if (link !== this.props.results.permalink) {
        window.scrollTo(0, 0);
        props.doPreferredSearch(props.location.pathname, parse(props.location.search.slice(1)), {});
      }
    }
    if (this.props.featuredItems.items.length === 0 && props.featuredItems.items.length > 1) {
      this.setState({ featuredItems: props.featuredItems });
    }
  }

  onAction(uid, type, ...args) {
    const { source = 'preferredSearch' } = (args.length > 0 && args.filter(i => i.source)[0]) || {};
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
    this.onAction(null, 'freezeSearch', cluster);
  }

  onFacetChangeCarousel() {
    window.scrollTo(0, 0);
    this.search({ cluster: 'featured', values: ['Y'] });
  }

  onIncludeMoreMatchesChange() {
    if (this.props.loading || this.props.frozenBy) {
      return;
    }
    const isMoreMatchesSelected = !this.state.isMoreMatchesSelected;
    this.onFacetChangeStart({ id: 'moreMatches' });
    setTimeout(
      () =>
        this.search({
          cluster: 'moreMatches',
          values: [isMoreMatchesSelected ? 'most_preferred' : 'preferred'],
        }),
      500,
    );
    setTimeout(() => this.setState({ isMoreMatchesSelected }), 400);
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
      'preferredSearch',
      null,
      'bulkConnect',
      this.state.profilesToConnect.filter(uid => ['default', 'shortlisted'].includes(this.props.profiles[uid].flags.connectionStatus)),
    );
  }

  daTracking(event, args = {}) {
    this.props.doDaTracking('preferredSearch', event, args.uid, args);
  }

  search(changes = {}) {
    this.props.doPreferredSearch(
      this.props.location.pathname,
      parse(this.props.location.search.slice(1)),
      this.state.isMoreMatchesSelected,
      changes,
    );
  }

  render() {
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

    const premiumCarouselBucket = !!(
      this.props.settings.experiments &&
      this.props.settings.experiments.premium_carousel_web &&
      this.props.settings.experiments.premium_carousel_web.bucket === 'B'
    );

    const isFeaturedResult =
      (premiumCarouselBucket &&
        this.props.facets &&
        this.props.facets
          .filter(f => f && f.id === 'featured')
          .map(f => f.options.filter(o => o && o.id === 'Y').map(o => o && o.isSelected)[0])[0]) ||
      false;

    const noMatchestxt =
      this.props.results.query.viewed === 'N'
        ? 'Sorry, no new Matches that meet your Partner Preferences.'
        : 'Currently, you have no Viewed Matches.';
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
              <FacetBar
                items={this.props.facets}
                loading={this.props.loading}
                frozenBy={this.props.frozenBy}
                isHeaderBarVisible={this.props.isHeaderBarVisible}
                onFacetChange={this.onFacetChange}
                onFacetChangeStart={this.onFacetChangeStart}
              />
              <div id="facetBottom" />
              <SuccessStories wwwBaseUrl={this.props.wwwBaseUrl} stories={this.props.successStories} type={'search'} />
            </s.Sidebar>
            <s.SearchResults>
              <s.SubHeading isVisible>
                <s.CarouselBackWrapper>
                  <s.CarouselBackLeft>
                    {isFeaturedResult
                      ? 'Premium Plus members who match your Preferences'
                      : this.state.isMoreMatchesSelected
                        ? 'Members who match most of your Preferences'
                        : 'Members who match your Preferences'}
                    &nbsp;
                    {!isFeaturedResult && (
                      <s.SubHeadingLink isExternal to="/my-shaadi/partner-profile">
                        Edit
                      </s.SubHeadingLink>
                    )}
                  </s.CarouselBackLeft>
                  {isFeaturedResult && (
                    <s.CarouselBackLink isExternal to="/search/partner?loc=top-nav">
                      <s.CarouselBackArrow />Back to Matches
                    </s.CarouselBackLink>
                  )}
                </s.CarouselBackWrapper>
                {!isFeaturedResult && (
                  <s.IncludeMatches isVisible={this.props.isMoreMatchesVisible} className="matchesTourWrap">
                    <s.IncludeStatus hasMoreMatches={this.state.isMoreMatchesSelected}>
                      {this.state.isMoreMatchesSelected ? 'On' : 'Off'}
                    </s.IncludeStatus>
                    <Switch value={this.state.isMoreMatchesSelected} onChange={this.onIncludeMoreMatchesChange} />
                    Include more Matches
                    <Tooltip
                      isQuestionMark
                      offset={[0, -5]}
                      overlay={
                        <span>
                          Get more Matches by including Profile that match <strong>most</strong> of your Preferences.
                        </span>
                      }
                    />
                  </s.IncludeMatches>
                )}
              </s.SubHeading>
              <s.NoDataWrapper isVisible={this.props.flash && !this.props.flash.toLowerCase().includes('error: (499) cancel')}>
                <span title={this.props.flash}>
                  {(this.props.flash || '').toLowerCase().includes('failed to connect')
                    ? 'Failed to connect...  Please check your network connection.'
                    : 'Oops...  Something went wrong. Please refresh and try again.'}
                </span>
              </s.NoDataWrapper>
              <s.NoDataWrapper isVisible={!this.props.results.items.length && !this.props.loading && !this.props.flash}>
                {noMatchestxt}
              </s.NoDataWrapper>
              <MatchList
                searchType={'preferred'}
                wwwBaseUrl={this.props.wwwBaseUrl}
                loading={this.props.loading || !!this.props.frozenBy}
                results={this.props.results}
                pageCount={this.props.pageCount}
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
                featuredItems={this.props.featuredItems}
                onFacetChangeCarousel={this.onFacetChangeCarousel}
                isFeaturedResult={isFeaturedResult}
                premiumCarouselBucket={premiumCarouselBucket}
              />
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

SearchPartnerPage.defaultProps = {
  flash: null,
  frozenBy: null,
  similarProfiles: {},
};

SearchPartnerPage.propTypes = {
  flash: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  frozenBy: PropTypes.string,
  isLoggedOut: PropTypes.bool.isRequired,
  isMoreMatchesVisible: PropTypes.bool.isRequired,
  isMoreMatchesSelected: PropTypes.bool.isRequired,
  showMoreMatchesTour: PropTypes.bool.isRequired,
  isHeaderBarVisible: PropTypes.bool.isRequired,
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,

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

  doPreferredSearch: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,

  location: PropTypes.shape(PropTypes.location).isRequired,
  searchPremiumBanner: PropTypes.shape(PropTypes.premiumBanner).isRequired,
  doDaTracking: PropTypes.func.isRequired,
  similarProfiles: PropTypes.shape(),
};

const selector = (state, { location }) => {
  const { chat, preferredSearch, successStories, profiles, session, view, similarProfiles } = state;
  const { meta, results, footerMatches, facetBar, pagination, featuredProfiles } = preferredSearch;
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

    flash: meta.flash,
    loading: meta.loading,
    frozenBy: meta.frozenBy,
    isMoreMatchesSelected: meta.isMoreMatchesSelected,
    isMoreMatchesVisible: meta.isMoreMatchesVisible,
    showMoreMatchesTour: meta.showMoreMatchesTour,
    featuredItems: featuredProfiles,
    results,
    facets: facetBar,

    activePage: pagination.activePage,
    pageCount: pagination.pageCount,
    sortOrder: preferredSearch.sortOrder.items,
    listStyle: meta.listStyle,
    searchPremiumBanner: session.searchPremiumBanner,
    similarProfiles,
  };
};

export default withRouter(
  connect(selector, {
    doPreferredSearch,
    doProfileAction,
    doDaTracking,
  })(SearchPartnerPage),
);
