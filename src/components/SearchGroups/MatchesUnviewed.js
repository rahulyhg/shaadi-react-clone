/* eslint camelcase: 0 */
import React from 'react';
import PropTypes from '../../PropTypes';
import s from './styles';
import Carousel from '../Common/Carousel';
import MatchItem from '../MatchList/MatchItem';

class MatchesUnviewed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(uid, i) {
    const item = this.props.searchResult.items[i];
    const { pg_ubt, results_id, evt_ref, tooltip, np, sourceList, source, count } = this.props.searchResult;
    return (
      <MatchItem
        key={item.uid}
        order={i + 1}
        type={'carousel'}
        item={item}
        hasMore={i === 20 && count > 21}
        pg_ubt={pg_ubt}
        evt_ref={evt_ref}
        results_id={results_id}
        np={np}
        source={source}
        sourceList={sourceList}
        page={0}
        wwwBaseUrl={this.props.wwwBaseUrl}
        profile={this.props.profiles[item.uid]}
        settings={this.props.settings}
        shortlistItems={this.props.shortlistItems}
        tooltip={tooltip}
        onAction={this.props.onAction}
        count={count}
        searchType={this.props.searchType}
        listUrl={this.props.listUrl}
        daTracking={this.props.daTracking}
      />
    );
  }

  render() {
    const height = (['ignored', 'blocked'].includes(this.props.searchType) && 338) || 418;
    const seeAllText = (this.props.searchType === 'shortlisted' && 'View all your Shortlists') || 'See All';

    const profiles = this.props.searchResult.items.map(result => result.uid);
    return (
      <s.searchGp data-test-selector={this.props.searchType}>
        <s.title>
          {this.props.searchInfo.title} <s.count>({this.props.searchResult.count})</s.count>
        </s.title>
        <s.header>{this.props.searchInfo.header}</s.header>
        <Carousel onAction={this.props.onAction} width={960} maxComponentsInFrame={4} height={height} slidesCnt={profiles.length} steps={1}>
          {profiles.map(this.renderItem)}
        </Carousel>
        <s.listingRedirection>
          <s.seeAllLink target="_blank" isExternal to={this.props.listUrl}>
            {seeAllText}
          </s.seeAllLink>
        </s.listingRedirection>
      </s.searchGp>
    );
  }
}

MatchesUnviewed.defaultProps = {
  daTracking: null,
};

MatchesUnviewed.propTypes = {
  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  searchInfo: PropTypes.shape({
    header: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    default_link: PropTypes.string,
    viewed_link: PropTypes.string,
  }).isRequired,
  searchResult: PropTypes.shape({
    ...PropTypes.results,
    pg_ubt: PropTypes.string.isRequired,
    results_id: PropTypes.string.isRequired,
    evt_ref: PropTypes.string.isRequired,
    tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
    permalink: PropTypes.string.isRequired,
    np: PropTypes.string.isRequired,
    sourceList: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,

  listUrl: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  daTracking: PropTypes.func,
};

export default MatchesUnviewed;
