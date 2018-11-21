import React from 'react';
import PropTypes from 'prop-types';
import { MatchListContainer } from './styles';
import CardItem from './CardItem';
import { NoMatches } from '../Common/NoResult';

class MatchListMobile extends React.PureComponent {
  onMatchAction = uid => {
    this.actions = this.actions || [];
    this.actions[uid] = this.actions[uid] || ((type, ...args) => this.props.onAction(uid, type, ...args));
    return this.actions[uid];
  };

  buttonClick = () => this.props.onAction(null, 'discover_more');

  render() {
    const { items, profiles, shortlistItems, isMoreMatchesVisible, settings, gaEventActionLabel } = this.props;
    if (items.length === 0) {
      return (
        <NoMatches
          heading="NO MORE MATCHES"
          message="You have no more Matches in this section."
          buttonText="Discover more Matches"
          onAction={this.buttonClick}
          isButtonVisible={!isMoreMatchesVisible}
        />
      );
    }

    return (
      <MatchListContainer marginVerticle={this.props.isNavHidden || this.props.source === 'otherSearches' ? 0 : '80px'}>
        {items.map((item, index) => {
          const profile = profiles[item.uid];
          const source = (this.props.source && `&source=${this.props.source}`) || '';
          const sourceList = (this.props.sourceList && `&source_list=${this.props.sourceList}`) || '';
          const tempId = (profile.tempId && `&tempId=${profile.tempId}`) || '';
          const profileUrl = `/profile?profileid=${profile.uid}&pg_show_from=${this.props.page}&np=${this.props.np}&evt_ref=${
            this.props.evt_ref
          }&navigation=${this.props.page}&profileNumber=${index + 1}&pg_searchresults_id=${this.props.results_id}&datasrc=api&pg_ubt=${
            this.props.pg_ubt
          }${source}${sourceList}${tempId}`;

          const hasPhoto =
            ['noPhoto', 'photoComingSoon', 'photoUnderScreening', 'photoRequestSent'].indexOf(profile.flags.albumStatus) === -1;
          return (
            <CardItem
              key={item.uid}
              item={item}
              shortlistItems={shortlistItems}
              isPaidUser={settings.isPaidUser}
              profile={profile}
              hasPhoto={hasPhoto}
              profileUrl={profileUrl}
              onAction={this.onMatchAction(item.uid)}
              memberHidden={settings.isHidden}
              gaEventActionLabel={gaEventActionLabel}
            />
          );
        })}
      </MatchListContainer>
    );
  }
}

MatchListMobile.defaultProps = {
  np: 'search-result',
  source: '',
  sourceList: '',
  isNavHidden: false,
};

MatchListMobile.propTypes = {
  onAction: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ uid: PropTypes.string.isRequired })).isRequired,
  isMoreMatchesVisible: PropTypes.bool.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.basicProfile)).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  np: PropTypes.string,
  source: PropTypes.string,
  sourceList: PropTypes.string,
  evt_ref: PropTypes.string.isRequired,
  results_id: PropTypes.string.isRequired,
  pg_ubt: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  isNavHidden: PropTypes.bool,
  gaEventActionLabel: PropTypes.string.isRequired,
};

export default MatchListMobile;
