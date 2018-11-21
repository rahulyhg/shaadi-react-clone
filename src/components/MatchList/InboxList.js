/* eslint camelcase: 0 */

import React from 'react';
import PropTypes from '../../PropTypes';
import MatchItem from './MatchItem';
import s from './styles';
import Pagination from '../../components/Common/Pagination';

class InboxList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.closeListToolTip = this.closeListToolTip.bind(this);
    this.onTooltipClose = () => this.props.onAction(null, 'closeAllTooltips');
  }

  closeListToolTip() {
    this.setState({ showListToolTip: !this.state.showListToolTip });
  }

  renderItem(item, i) {
    const { requestType } = this.props;
    const listType = `${requestType.type}_${requestType.action}`;
    const ubt = `${this.props.results.permalink}|${this.props.results.results_id}|${item.requests[listType].requestKey}`;
    return (
      <MatchItem
        key={item.uid}
        order={i + 1}
        type="inboxCard"
        item={item}
        page={this.props.page}
        pg_ubt={window.btoa(unescape(encodeURIComponent(ubt)))}
        evt_ref={this.props.results.evt_ref}
        results_id={this.props.results.results_id}
        source={this.props.results.source}
        permalink={this.props.results.permalink}
        wwwBaseUrl={this.props.wwwBaseUrl}
        profile={this.props.profiles[item.uid]}
        settings={this.props.settings}
        onAction={this.props.onAction}
        requestType={requestType}
        tooltip={this.props.results.tooltip}
        shortlistItems={[]}
      />
    );
  }

  render() {
    return (
      <div>
        <s.InboxList isVisible={!!this.props.results.items.length}>
          <s.List>{this.props.results.items.map(this.renderItem)}</s.List>
          <Pagination {...this.props.Paginator} />
        </s.InboxList>
      </div>
    );
  }
}

InboxList.defaultProps = {
  profiles: {},
  items: [],
  listStyle: 'list',
  searchType: '',
};

InboxList.propTypes = {
  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  requestType: PropTypes.shape({
    type: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }).isRequired,
  Paginator: PropTypes.shape({
    loading: PropTypes.bool,
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    itemCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    itemPerPage: PropTypes.number.isRequired,
    source: PropTypes.string,
  }).isRequired,
  results: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uid: PropTypes.string.isRequired,
        justNow: PropTypes.bool.isRequired,
        photoLoading: PropTypes.bool.isRequired,
        eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
      }),
    ).isRequired,
    tooltip: PropTypes.shape({
      ...PropTypes.tooltip,
      body: PropTypes.array,
      loading: PropTypes.bool,
      position: PropTypes.oneOf(['none', 'bulk', 'list', 'photo', 'eoi', 'horoscope']),
    }).isRequired,
    permalink: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    evt_ref: PropTypes.string.isRequired,
    results_id: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,

  settings: PropTypes.shape({
    ...PropTypes.searchSettings,
    showUpgradeBanner: PropTypes.bool.isRequired,
    experiments: PropTypes.object,
  }).isRequired,

  onAction: PropTypes.func.isRequired,
};

export default InboxList;
