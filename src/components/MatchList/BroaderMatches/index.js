/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));

const titleMaster = {
  broader: {
    '0': 'However, you may be interested in these Profiles that are similar to your Preferences.',
    '1': 'You may be interested in these Profiles that are similar to your Preferences.',
  },
  recently: {
    '0': 'However, check out these Recently Joined profiles that meet many of your Preferences.',
    '1': 'You can check out these Recently Joined profiles that meet many of your Preferences.',
  },
};
const linkToMaster = {
  broader: '/search/broader',
  recently: '/search/discovery/recently-joined',
};
const evtRefMaster = {
  broader: encode64('widget-preferred_broader_matches'),
  recently: encode64('widget-new_matches_recently_joined'),
};

const pgUBTMaster = {
  broader: encode64('/search/broader||20'),
  recently: encode64('/search/discovery/recently-joined||20'),
};

const matchesText = {
  broader: 'More',
  recently: 'Recently Joined',
};

const BroaderMatches = props => {
  if (!props.isVisible) {
    return null;
  }
  if (props.data.count < 5) {
    return null;
  }
  const masterKey = (props.isRecentlyJoined && 'recently') || 'broader';
  return (
    <s.BroaderMatches>
      <s.Title>{titleMaster[masterKey][(props.hasZero && '0') || '1']}</s.Title>
      <s.Content>
        {props.data.items.map(match => (
          <s.MatchLink
            target="_blank"
            to={`/profile?profileid=${match.uid}&pg_searchresults_id=${props.data.results_id}&pg_show_from=&np=search-result&evt_ref=${
              evtRefMaster[masterKey]
            }&datasrc=api&pg_ubt=${pgUBTMaster[masterKey]}`}
            key={match.uid}
          >
            <s.Photo src={props.profiles[match.uid].thumbnail} />
          </s.MatchLink>
        ))}
        <s.BroaderWrapper>
          &&nbsp;
          <s.BroaderLink to={linkToMaster[masterKey]}>
            <s.BroaderCount>{props.data.count - 4}</s.BroaderCount>
            <s.BroaderText>{matchesText[masterKey]}</s.BroaderText>
          </s.BroaderLink>
        </s.BroaderWrapper>
      </s.Content>
    </s.BroaderMatches>
  );
};

BroaderMatches.defaultProps = {
  isRecentlyJoined: false,
  hasZero: false,
};

BroaderMatches.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  isRecentlyJoined: PropTypes.bool,
  hasZero: PropTypes.bool,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    results_id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uid: PropTypes.string.isRequired,
      }),
    ).isRequired,
    count: PropTypes.number,
  }).isRequired,
};

export default BroaderMatches;
