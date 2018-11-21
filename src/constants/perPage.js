export default path => {
  switch (path) {
    case '/inbox/accepted/interests':
    case '/inbox/filteredout':
    case '/inbox/sent/interests':
    case '/inbox/archived/interests':
      return 10;
    case '/inbox/pending/recent-interests':
    case '/search/partner':
    case '/search/broader':
    case '/search/broader/viewed':
    case '/search/personal':
    case '/search/ematchmaker':
    case '/search/discovery/recently-joined':
    case '/search/discovery/recently-joined-viewed':
    case '/search/new-matches':
    case '/search/new-matches/viewed':
    case '/search/near-me':
    case '/search/near-me/viewed':
      return 20;
    default: {
      console.log('%c perPage', 'color: orange; font-size: 20px', path, 20);
      return 20;
    }
  }
};
