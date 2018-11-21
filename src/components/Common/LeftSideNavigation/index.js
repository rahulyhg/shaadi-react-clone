import React from 'react';
import LinksBox from '../LinksBox';
import OtherLinks from '../OtherLinks';
import SearchByProfileId from '../SearchByProfileId';
import s from './styles';

const LeftSideNavigation = () => {
  const links = {
    linksHeading: {
      text: 'Quick Links',
      isHeading: true,
    },
    shortlistsAndMore: {
      text: 'Shortlists & more',
      link: '/profile/shortlist/index',
    },
    newMatches: {
      text: 'New Matches',
      link: '/search/new-matches?loc=top-nav',
    },
    myMatches: {
      text: 'My Matches',
      link: '/search/partner',
    },
    nearMe: {
      text: 'Near Me',
      link: '/search/near-me',
    },
    addSavedSearches: {
      text: 'Add Saved Searches',
      link: '/search?search_type=smart_search',
    },
    myHelp: {
      text: 'My Help',
      link: '/customer-relations/faq/call',
    },
  };
  return (
    <s.LeftNavigation>
      <LinksBox links={links} />
      <SearchByProfileId />
      <OtherLinks />
    </s.LeftNavigation>
  );
};

export default LeftSideNavigation;
