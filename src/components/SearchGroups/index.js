/* eslint camelcase: 0 */
import React from 'react';
import PropTypes from '../../PropTypes';

import MatchesUnviewed from './MatchesUnviewed';
import MatchesViewed from './MatchesViewed';
import ExceptionCases from './ExceptionCases';
import { getGroupItemsInfo, getExceptionInfo } from './utils';

class SearchGroups extends React.PureComponent {
  constructor(props) {
    super(props);
    const searchResult = props.searchResult;
    this.profiles = searchResult.items.map(result => result.uid);
  }

  render() {
    const { headerInfo, searchResult, profiles, wwwBaseUrl, settings, onAction, loading, shortlistItems, daTracking } = this.props;
    const response_type = searchResult.remark.messageCode || searchResult.response_type;

    const searchInfo = getGroupItemsInfo(headerInfo.type);
    const listUrl = `${searchInfo.default_link}?pg_searchresults_id=${searchResult.results_id}`;
    const searchType = this.props.searchType;
    switch (response_type) {
      case 'viewed': {
        return (
          <MatchesViewed
            onAction={onAction}
            shortlistItems={shortlistItems}
            loading={loading}
            wwwBaseUrl={wwwBaseUrl}
            settings={settings}
            searchInfo={searchInfo}
            searchResult={searchResult}
            profiles={profiles}
            searchType={searchType}
          />
        );
      }
      case 'unviewed': {
        return (
          <MatchesUnviewed
            onAction={onAction}
            shortlistItems={shortlistItems}
            loading={loading}
            searchType={searchType}
            wwwBaseUrl={wwwBaseUrl}
            settings={settings}
            searchInfo={searchInfo}
            searchResult={searchResult}
            profiles={profiles}
            listUrl={listUrl}
            daTracking={daTracking}
          />
        );
      }
      default: {
        const exceptionInfo = getExceptionInfo(response_type, headerInfo.type);

        return exceptionInfo && <ExceptionCases exceptionType={response_type} exceptionInfo={exceptionInfo} searchInfo={searchInfo} />;
      }
    }
  }
}

SearchGroups.defaultProps = {
  daTracking: null,
};

SearchGroups.propTypes = {
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  loading: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  searchResult: PropTypes.shape({
    ...PropTypes.results,
    permalink: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
    response_type: PropTypes.string.isRequired,
  }).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  headerInfo: PropTypes.shape({
    count: PropTypes.number,
    type: PropTypes.string.isRequired,
  }).isRequired,
  daTracking: PropTypes.func,
};
export default SearchGroups;
