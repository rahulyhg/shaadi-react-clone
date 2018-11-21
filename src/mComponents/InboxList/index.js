/* eslint-disable import/no-named-as-default */
import PropTypes from 'prop-types';
import React from 'react';
import { InboxListContainer } from './styles';
import Card from './Card';
import NoResult from '../../components/Common/NoResult';
import Spinner from '../../components/Spinner';

import { getProfileUrl } from './utils';

class InboxList extends React.PureComponent {
  state = { noResult: false };

  onInboxAction = uid => {
    this.actions = this.actions || [];
    this.actions[uid] = this.actions[uid] || ((type, ...args) => this.props.onAction(uid, type, ...args));
    return this.actions[uid];
  };
  actionTaken = 0;
  updateActionTaken = () => {
    this.actionTaken = this.actionTaken + 1;
    const { results, Paginator, listType } = this.props;
    if (results.items.length - this.actionTaken <= 2) {
      const recordResult = this.props.fillNewRecords(listType, Paginator);
      if (!recordResult) {
        this.setState({ noResult: true });
      } else {
        this.setState({ noResult: false });
      }
    }
  };

  renderItem(item, i) {
    const { profiles, settings, gaEventActionLabel } = this.props;
    return (
      <Card
        key={item.uid}
        getProfileUrl={getProfileUrl(this.props)}
        item={item}
        profile={profiles[item.uid]}
        onAction={this.onInboxAction(item.uid)}
        isBothPartyPayUser={settings.isBothPartyPayUser}
        isPaidUser={settings.isPaidUser}
        updateActionTaken={this.updateActionTaken}
        memberHidden={settings.isHidden}
        gaEventActionLabel={gaEventActionLabel}
      />
    );
  }

  render() {
    const { items } = this.props.results;
    const { currentPage, pageCount } = this.props.Paginator;
    const showLoader = currentPage < pageCount;
    return (
      <React.Fragment>
        <InboxListContainer>{items.map((listItem, index) => this.renderItem(listItem, index))}</InboxListContainer>
        {!this.props.freshLoading &&
          showLoader && (
            <div>
              <Spinner style={{ padding: '0 0 14px' }} />
            </div>
          )}
        {(!items.length || this.actionTaken >= items.length || this.state.noResult) &&
          !this.props.loading && <NoResult source="inbox" platform="mobile" sourceType={this.props.listType} count={this.props.counts} />}
      </React.Fragment>
    );
  }
}
InboxList.defaultProps = {
  counts: {},
  fillNewRecords: () => {},
};
InboxList.propTypes = {
  loading: PropTypes.bool.isRequired,
  listType: PropTypes.string.isRequired,
  freshLoading: PropTypes.bool.isRequired,
  results: PropTypes.shape({
    results_id: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    evt_ref: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
  }).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  onAction: PropTypes.func.isRequired,
  Paginator: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    itemCount: PropTypes.number.isRequired,
    itemPerPage: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
  counts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fillNewRecords: PropTypes.func,
  gaEventActionLabel: PropTypes.string.isRequired,
};
export default InboxList;
