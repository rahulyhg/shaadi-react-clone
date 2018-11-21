export default (pathname, cluster, values, queryparams) => {
  const { matches } = {
    ...queryparams,
  };
  let isTwoway = matches === 'twoways';
  const savedsearchName = (queryparams && queryparams.savedsearch_name) || '';

  if (['matches'].includes(cluster)) {
    isTwoway = values[0] === '2-way';
  }

  switch (pathname) {
    case '/search/new-matches':
    case '/search/new-matches/viewed':
      return {
        name: 'recently-joined',
        pathname,
        showRecentViewFacet: true,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/near-me':
    case '/search/near-me/viewed':
      return {
        name: 'near_me',
        pathname,
        showRecentViewFacet: true,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/broader':
    case '/search/broader/viewed':
      return {
        name: 'broader',
        pathname,
        showRecentViewFacet: true,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/personal':
      return {
        name: 'reverse',
        pathname,
        showRecentViewFacet: false,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/ematchmaker':
      return {
        name: '2-way',
        pathname,
        showRecentViewFacet: false,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/discovery/recently-joined':
    case '/search/discovery/recently-joined-viewed':
      return {
        name: isTwoway ? 'discovery_newly_joined_2way' : 'discovery_newly_joined',
        pathname,
        showRecentViewFacet: true,
        showMatchesFacet: true,
        setMatchesFacetValue: isTwoway ? '2-way' : 'All',
      };
    case '/search/discovery/premium':
    case '/search/discovery/premium-viewed':
      return {
        name: isTwoway ? 'discovery_premium_2way' : 'discovery_premium',
        pathname,
        showRecentViewFacet: true,
        showMatchesFacet: true,
        setMatchesFacetValue: isTwoway ? '2-way' : 'All',
      };
    case '/search/discovery/recent-visitors':
    case '/search/discovery/recent-visitors-viewed':
      return {
        name: isTwoway ? 'discovery_recent_visitors_two_way' : 'discovery_recent_visitors',
        pathname,
        showRecentViewFacet: true,
        showMatchesFacet: true,
        setMatchesFacetValue: isTwoway ? '2-way' : 'All',
      };
    case '/search/basic_search':
      return {
        name: 'basic_search',
        savedsearchName,
        pathname,
        showRecentViewFacet: false,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/smart_search':
      return {
        name: 'smart_search',
        savedsearchName,
        pathname,
        showRecentViewFacet: false,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/online':
      return {
        name: 'whoisonline',
        savedsearchName,
        pathname,
        showRecentViewFacet: false,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/specialcase':
      return {
        name: 'specialcase_search',
        savedsearchName,
        pathname,
        showRecentViewFacet: false,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    case '/search/astro':
      return {
        name: 'astrology_search',
        savedsearchName,
        pathname,
        showRecentViewFacet: false,
        showMatchesFacet: false,
        setMatchesFacetValue: '',
      };
    default:
      return {
        name: 'preferred',
        pathname,
        showRecentViewFacet: true,
        showMatchesFacet: true,
        setMatchesFacetValue: isTwoway ? '2-way' : 'All',
      };
  }
};
