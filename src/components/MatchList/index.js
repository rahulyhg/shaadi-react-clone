/* eslint camelcase: 0 */

import React from 'react';
import cookie from 'cookie';
import PropTypes from '../../PropTypes';
import Tooltip from '../Common/Tooltip';
import MatchItem from './MatchItem';
import CardItem from './CardItem';
import SortDropdown from './SortDropdown';
import BroaderMatches from './BroaderMatches';
import InterestListBanner from './InterestListBanner';
import PremiumPlusCarousel from '../PremiumPlusCarousel';
import { createCookie } from '../../api/helpers';

import s from './styles';

const isNotSelectedTooltip = (para = { items: [{}] }) =>
  ((para.items.length > 0 && para.items[0].text) || '').includes('not selected any profile');

class MatchList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listStyle: props.listStyle,
      showUpgradeBanner: props.settings.showUpgradeBanner,
      showListToolTip: props.listStyle !== 'grid',
    };
    this.onListStyleChange = this.onListStyleChange.bind(this);
    this.onUpgradeClose = this.onUpgradeClose.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.closeListToolTip = this.closeListToolTip.bind(this);
    this.onTooltipClose = () => this.props.onAction(null, 'closeAllTooltips');
    this.onSaveSearch = () => this.props.onAction(null, 'saveSearch');
  }

  componentWillReceiveProps(props) {
    if (props.listStyle !== this.props.listStyle) {
      this.setState({ listStyle: props.listStyle });
    }
    if (!this.props.settings || this.props.settings.showUpgradeBanner !== props.settings.showUpgradeBanner) {
      this.setState({ showUpgradeBanner: props.settings.showUpgradeBanner });
    }
  }

  onListStyleChange(style) {
    this.setState({ listStyle: style });
    setTimeout(() => this.props.onListStyleChange(style), 1);
  }

  onUpgradeClose() {
    this.setState({ showUpgradeBanner: false });
    this.props.onAction(null, 'disableUpgradeBanner');
  }

  closeListToolTip() {
    this.setState({ showListToolTip: !this.state.showListToolTip });
  }

  renderItem(item, i) {
    const isSpotLight =
      ['basic_search', 'smart_search', 'whoisonline', 'specialcase_search', 'astrology_search'].includes(this.props.searchType) &&
      this.props.results.searchSpotlight &&
      this.props.results.searchSpotlight[0] &&
      this.props.results.searchSpotlight[0] === item.uid;
    return (
      <MatchItem
        key={item.uid}
        order={i + 1}
        type={this.state.listStyle}
        item={item}
        isSpotLight={isSpotLight}
        pg_ubt={this.props.results.pg_ubt}
        evt_ref={this.props.results.evt_ref}
        results_id={this.props.results.results_id}
        page={this.props.page}
        wwwBaseUrl={this.props.wwwBaseUrl}
        profile={this.props.profiles[item.uid]}
        settings={this.props.settings}
        tooltip={this.props.results.tooltip}
        shortlistItems={this.props.shortlistItems}
        onAction={this.props.onAction}
        onMatchSelectionChange={this.props.onMatchSelectionChange}
        daTracking={this.props.daTracking}
        searchType={this.props.searchType}
      />
    );
  }

  renderConnect() {
    if (this.props.results.tooltip.position === 'bulk' && this.props.results.tooltip.loading) {
      return (
        <s.ConnectWrapper isVisible={this.state.listStyle === 'list'}>
          <s.ArrowImg src="/assets/down-arrow-v2.gif" />
          <s.ConnectLoading />
        </s.ConnectWrapper>
      );
    }

    const isFail = this.props.results.tooltip.body.length > 0 && isNotSelectedTooltip(this.props.results.tooltip.body[0]);
    return (
      <s.ConnectWrapper isVisible={this.state.listStyle === 'list'}>
        <s.ArrowImg src="/assets/down-arrow-v2.gif" />
        <Tooltip
          isVisible={this.props.results.tooltip.position === 'bulk'}
          offset={isFail ? [-80, 0] : [-20, 0]}
          tooltip={this.props.results.tooltip}
          onClose={this.onTooltipClose}
          overlayClassName={isFail ? 'connectTooltip rc-tooltip-no-arrow' : 'connectTooltip'}
          placement={isFail ? 'right' : 'bottomLeft'}
        >
          <s.ConnectBtn onClick={this.props.onBulkConnect} title="Connect">
            {'Connect'}
          </s.ConnectBtn>
        </Tooltip>
      </s.ConnectWrapper>
    );
  }

  render() {
    const sortPosition = ['basic_search', 'smart_search', 'whoisonline', 'specialcase_search', 'astrology_search'].includes(
      this.props.searchType,
    )
      ? 'bottom'
      : 'top';
    const n = 3;
    const { page = 1 } = this.props;
    const cookies = cookie.parse(document.cookie);
    let isExtended = cookies.isExtended;
    if (!isExtended) {
      const randBool = ['true', 'false'];
      isExtended = randBool[Math.floor(Math.random() * randBool.length)];
      createCookie('isExtended', isExtended, 60 * 60 * 24);
    }
    isExtended = (isExtended === 'true' && true) || false;
    isExtended = page % 2 === 0 ? isExtended : !isExtended;
    let m = (page % 4) * 15 - (page % 4 - 1) * 20; // eslint-disable-line no-mixed-operators
    m = this.props.results.items.length < m ? 0 : m;
    if (!this.props.results.items.length && this.props.results.query.viewed === 'N') {
      return (
        <div>
          <s.MatchList isVisible>
            <s.List isGridPage={this.state.listStyle === 'grid'}>
              <BroaderMatches
                hasZero
                isRecentlyJoined={['recently-joined', 'recently-joined-viewed'].includes(this.props.searchType)}
                isVisible={
                  this.props.results.query.viewed === 'N' && (this.props.page === this.props.pageCount || this.props.pageCount === 0)
                }
                data={this.props.footerMatches}
                profiles={this.props.profiles}
              />
            </s.List>
            <s.LoadingWrapper isVisible={this.props.loading}>
              <s.ColorBg />
              <s.LoadingIndicator>
                <s.LoadingIcon />
                <s.LoadingText>Loading...</s.LoadingText>
              </s.LoadingIndicator>
            </s.LoadingWrapper>
          </s.MatchList>
        </div>
      );
    } else if (!this.props.results.items.length && this.props.results.query.viewed === 'Y') {
      return false;
    }

    const gridBucket =
      (this.props.settings.experiments && this.props.settings.experiments.grid_view && this.props.settings.experiments.grid_view.bucket) ||
      '';

    return (
      <div>
        <s.MatchList isVisible>
          {!this.props.isFeaturedResult && (
            <s.Header sortPosition={sortPosition}>
              {this.renderConnect()}
              {['basic_search', 'smart_search', 'whoisonline', 'specialcase_search', 'astrology_search'].includes(
                this.props.searchType,
              ) && <s.SaveSearch onClick={this.onSaveSearch}>{'Save this Search'}</s.SaveSearch>}
              <s.SortWrapper sortPosition={sortPosition}>
                <SortDropdown items={this.props.sortOrder} onChange={this.props.onSortChange} />
                {gridBucket === 'A' && (
                  <s.ListStyle>
                    <Tooltip
                      isVisible={this.state.listStyle === 'grid' && this.state.showListToolTip}
                      offset={[35, -10]}
                      overlayClassName={'connectTooltip listViewTooltip'}
                      tooltip={{
                        body: [
                          {
                            key: 'beh',
                            items: [
                              {
                                type: 'hybrid',
                                key: 'bleh',
                                text: 'Click here to see your results in list view',
                              },
                            ],
                          },
                        ],
                        title: '',
                      }}
                      placement="bottomRight"
                      trigger="click"
                      onClose={this.closeListToolTip}
                    >
                      <s.ListStyleBtn isListBtn onClick={() => this.onListStyleChange('list')} title="Regular View">
                        <s.ListStyleIcon icon="list" isActive={this.state.listStyle === 'list'} />
                      </s.ListStyleBtn>
                    </Tooltip>
                    <s.ListStyleBtn onClick={() => this.onListStyleChange('grid')} title="Gallery View">
                      <s.ListStyleIcon icon="grid" isActive={this.state.listStyle === 'grid'} />
                    </s.ListStyleBtn>
                  </s.ListStyle>
                )}
              </s.SortWrapper>
            </s.Header>
          )}
          {this.props.premiumCarouselBucket &&
            !this.props.isFeaturedResult &&
            !!this.props.featuredItems.items.length && (
              <PremiumPlusCarousel
                wwwBaseUrl={this.props.wwwBaseUrl}
                results={this.props.featuredItems}
                profiles={this.props.profiles}
                shortlistItems={this.props.shortlistItems}
                settings={this.props.settings}
                onMatchSelectionChange={this.props.onMatchSelectionChange}
                onAction={this.props.onAction}
                onFacetChangeCarousel={this.props.onFacetChangeCarousel}
                daTracking={this.props.daTracking}
              />
            )}
          <s.List isGridPage={this.state.listStyle === 'grid'}>
            {this.props.results.items.slice(0, n).map(this.renderItem)}
            {((this.state.listStyle === 'grid' && this.props.results.items.length >= 3) ||
              (this.state.listStyle === 'list' && this.props.results.items.length > 0)) &&
              this.props.searchPremiumBanner.isPremiumBannerVisible && (
                <InterestListBanner
                  premiumBannner={this.props.searchPremiumBanner.premiumBanner}
                  settings={this.props.settings}
                  type={this.state.listStyle}
                  wwwBaseUrl={this.props.wwwBaseUrl}
                />
              )}
            {m > n && this.props.results.items.slice(n, m).map(this.renderItem)}
            {m > n &&
              this.props.results.items.length > 0 &&
              !this.props.settings.hasUploadedPhoto && (
                <CardItem
                  pg_ubt={this.props.results.pg_ubt}
                  evt_ref={this.props.results.evt_ref}
                  results_id={this.props.results.results_id}
                  page={this.props.page}
                  wwwBaseUrl={this.props.wwwBaseUrl}
                  profile={this.props.profiles.self}
                  settings={this.props.settings}
                  onAction={this.props.onAction}
                  daTracking={this.props.daTracking}
                  searchType={this.props.searchType}
                  isExtended={isExtended}
                />
              )}
            {(m > n && this.props.results.items.slice(m).map(this.renderItem)) || this.props.results.items.slice(n).map(this.renderItem)}
            <BroaderMatches
              isVisible={
                this.props.results.query.viewed === 'N' && (this.props.page === this.props.pageCount || this.props.pageCount === 0)
              }
              isRecentlyJoined={['recently-joined', 'recently-joined-viewed'].includes(this.props.searchType)}
              data={this.props.footerMatches}
              profiles={this.props.profiles}
            />
          </s.List>
          <s.LoadingWrapper isVisible={this.props.loading}>
            <s.ColorBg />
            <s.LoadingIndicator>
              <s.LoadingIcon />
              <s.LoadingText>Loading...</s.LoadingText>
            </s.LoadingIndicator>
          </s.LoadingWrapper>
        </s.MatchList>
        {!this.props.loading &&
          ['basic_search', 'smart_search', 'specialcase_search', 'astrology_search'].includes(this.props.searchType) && (
            <s.SaveSearchLinkWrapper>
              <s.searchSaveIcon />
              <s.SaveSearchLink onClick={this.onSaveSearch}>Send me new profiles matching this search</s.SaveSearchLink>
              <s.searchGrayArrow />
            </s.SaveSearchLinkWrapper>
          )}
      </div>
    );
  }
}

MatchList.defaultProps = {
  profiles: {},
  items: [],
  listStyle: 'list',
  pageCount: 0,
  searchType: '',
  daTracking: null,
  featuredItems: {
    items: [],
  },
  onFacetChangeCarousel: null,
  isFeaturedResult: false,
  premiumCarouselBucket: 'A',
};

MatchList.propTypes = {
  loading: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  searchType: PropTypes.string,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,

  results: PropTypes.shape({
    tooltip: PropTypes.shape({
      ...PropTypes.tooltip,
      body: PropTypes.array,
      loading: PropTypes.bool,
      position: PropTypes.oneOf(['none', 'bulk', 'list', 'photo', 'eoi', 'horoscope']),
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uid: PropTypes.string.isRequired,
        justNow: PropTypes.bool.isRequired,
        photoLoading: PropTypes.bool.isRequired,
        eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
      }),
    ).isRequired,
    query: PropTypes.shape({
      viewed: PropTypes.string,
    }).isRequired,
    pg_ubt: PropTypes.string.isRequired,
    evt_ref: PropTypes.string.isRequired,
    results_id: PropTypes.string.isRequired,
    premiumBanner: PropTypes.object,
    searchSpotlight: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number,

  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  searchPremiumBanner: PropTypes.shape(PropTypes.premiumBanner).isRequired,

  footerMatches: PropTypes.shape(BroaderMatches.propTypes.data).isRequired,
  sortOrder: PropTypes.arrayOf(PropTypes.shape(PropTypes.sortOrderItem)).isRequired,
  listStyle: PropTypes.string,
  settings: PropTypes.shape({
    ...PropTypes.searchSettings,
    showUpgradeBanner: PropTypes.bool.isRequired,
    experiments: PropTypes.object,
    hasUploadedPhoto: PropTypes.bool.isRequired,
  }).isRequired,

  onSortChange: PropTypes.func.isRequired,
  onBulkConnect: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  onListStyleChange: PropTypes.func.isRequired,
  onMatchSelectionChange: PropTypes.func.isRequired,
  daTracking: PropTypes.func,
  featuredItems: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uid: PropTypes.string.isRequired,
        justNow: PropTypes.bool.isRequired,
        photoLoading: PropTypes.bool.isRequired,
        eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
      }),
    ),
  }),
  onFacetChangeCarousel: PropTypes.func,
  isFeaturedResult: PropTypes.bool,
  premiumCarouselBucket: PropTypes.bool,
};

export default MatchList;
