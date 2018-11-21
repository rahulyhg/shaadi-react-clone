import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from '../../PropTypes';
import s from './styles';
import doProfileAction from '../../actions/doProfileAction';
import onMatchesGroupInit from '../../actions/onMatchesGroupInit';
import InlineLogin from '../../components/InlineLogin';
import SearchGroups from '../../components/SearchGroups';

class MatchesGroupPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderSections = this.renderSections.bind(this);
    this.grpInfo = {
      discover: { noMatchesText: 'Sorry, no more Matches. Search for your partner below.' },
      intents: { noMatchesText: 'Sorry, no matches viewed recently. Search for your partner below.' },
    };
  }

  componentDidMount() {
    this.props.onMatchesGroupInit({ grpType: this.props.grpType });
  }

  renderSections(searchType, results) {
    const myAction = src => (uid, type, ...args) => {
      this.props.doProfileAction(src, uid, type, ...args);
    };
    if ((results.remark && results.remark.messageCode) || results.items.length) {
      return (
        <SearchGroups
          key={searchType}
          searchType={searchType}
          searchResult={results}
          profiles={this.props.profiles}
          shortlistItems={this.props.shortlistItems}
          grpType={this.props.grpType}
          headerInfo={{ type: searchType }}
          wwwBaseUrl={this.props.wwwBaseUrl}
          loading={this.props.loading}
          settings={this.props.settings}
          onAction={myAction(searchType)}
        />
      );
    }
    return null;
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
    const { searchTypes, results } = this.props;

    return (
      <s.MatchesGroupWrapper topSpace={this.props.topSpace} isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
        {!this.props.loading &&
          (searchTypes.reduce((accum, type) => accum + results[type].items.length, 0) ? (
            <div>{searchTypes.map(type => this.renderSections(type, results[type]))}</div>
          ) : (
            <s.NoMoreMatches>
              {this.grpInfo[this.props.grpType].noMatchesText}
              <br />
              <s.searchLink to={`/search?search_type=smart_search`} isExternal>
                Search Now
              </s.searchLink>
            </s.NoMoreMatches>
          ))}
        <s.LoadingWrapper isVisible={this.props.loading}>
          <s.ColorBg />
          <s.LoadingIndicator>
            <s.LoadingIcon />
            <s.LoadingText>Loading...</s.LoadingText>
          </s.LoadingIndicator>
        </s.LoadingWrapper>
      </s.MatchesGroupWrapper>
    );
  }
}
MatchesGroupPage.propTypes = {
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  results: PropTypes.objectOf(
    PropTypes.shape({
      ...PropTypes.results,
      items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
      query: PropTypes.shape({
        viewed: PropTypes.string,
      }).isRequired,
    }),
  ).isRequired,
  grpType: PropTypes.string.isRequired,
  onMatchesGroupInit: PropTypes.func.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  loading: PropTypes.bool.isRequired,
  searchTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  doProfileAction: PropTypes.func.isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
};
const selector = (state, { location }) => {
  const { chat, profiles, session, view, discoverMatchesGroup } = state;
  const { meta, results } = discoverMatchesGroup;
  const { wwwBaseUrl } = state.config.app;

  return {
    location,
    settings: session.settings,

    isLoggedOut: session.isLoggedOut,
    isChatOpen: chat.settings.isOpen,
    topSpace: view.topSpace,
    windowWidth: view.width,
    shortlistItems: session.shortlists.items,
    wwwBaseUrl,
    profiles,
    loading: meta.loading,
    searchTypes: meta.discoverSearchType,
    results,
  };
};

export default withRouter(
  connect(selector, {
    doProfileAction,
    onMatchesGroupInit,
  })(MatchesGroupPage),
);
