/* eslint camelcase: 0 */

import { searchParams } from '../utils';
import perPage from '../../../constants/perPage';

let per_page = `${perPage('/search/partner') || 20}`;

describe('doOtherSearch/utils', () => {
  describe('searchParams', () => {
    describe('GET without pg_searchresults_id', () => {
      // cases for broader
      it('works when user visits /search/broader', () => {
        per_page = perPage('/search/broader');
        const target = { path: '/search/broader', query: {}, changes: {}, searchList_type: 'broader' };
        const expQ = { search_type: 'broader', viewed: 'N', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/broader/viewed', () => {
        per_page = perPage('/search/broader/viewed');
        const target = { path: '/search/broader/viewed', query: {}, changes: {}, searchList_type: 'broader' };
        const expQ = { search_type: 'broader', viewed: 'Y', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/broader/viewed?page=4&sort_type=xyz&vtype=grid', () => {
        per_page = perPage('/search/broader/viewed');
        const target = {
          path: '/search/broader/viewed',
          query: { sort_type: 'xyz', page: '4', vtype: 'grid' },
          changes: {},
          searchList_type: 'broader',
        };
        const expQ = { search_type: 'broader', viewed: 'Y', sort: 'xyz', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      // cases for reverse
      it('works when user visits /search/personal', () => {
        per_page = perPage('/search/personal');
        const target = { path: '/search/personal', query: {}, changes: {}, searchList_type: 'reverse' };
        const expQ = { search_type: 'reverse', viewed: 'N', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/personal?page=2&sort_type=xyz&vtype=grid', () => {
        per_page = perPage('/search/personal');
        const target = {
          path: '/search/personal',
          query: { sort_type: 'xyz', page: '2', vtype: 'grid' },
          changes: {},
          searchList_type: 'reverse',
        };
        const expQ = { search_type: 'reverse', viewed: 'N', sort: 'xyz', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      // cases for 2-way
      it('works when user visits /search/ematchmaker', () => {
        per_page = perPage('/search/ematchmaker');
        const target = { path: '/search/ematchmaker', query: {}, changes: {}, searchList_type: '2-way' };
        const expQ = { search_type: '2-way', viewed: 'N', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/ematchmaker?page=2&sort_type=xyz&vtype=grid', () => {
        per_page = perPage('/search/ematchmaker');
        const target = {
          path: '/search/ematchmaker',
          query: { sort_type: 'xyz', page: '2', vtype: 'grid' },
          changes: {},
          searchList_type: '2-way',
        };
        const expQ = { search_type: '2-way', viewed: 'N', sort: 'xyz', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
      // cases for discovery
      it('works when user visits /search/discovery/recently-joined', () => {
        per_page = perPage('/search/discovery/recently-joined');
        const target = { path: '/search/discovery/recently-joined', query: {}, changes: {}, searchList_type: 'recently_joined' };
        const expQ = { search_type: 'recently_joined', viewed: 'N', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/discovery/recently-joined-viewed', () => {
        per_page = perPage('/search/discovery/recently-joined-viewed');
        const target = { path: '/search/discovery/recently-joined-viewed', query: {}, changes: {}, searchList_type: 'recently_joined' };
        const expQ = { search_type: 'recently_joined', viewed: 'Y', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/discovery/recently-joined-viewed?matches=twoways', () => {
        per_page = perPage('/search/discovery/recently-joined-viewed');
        const target = {
          path: '/search/discovery/recently-joined-viewed',
          query: { matches: 'twoways' },
          changes: {},
          searchList_type: 'recently_joined_2way',
        };
        const expQ = { search_type: 'recently_joined_2way', viewed: 'Y', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('User selects two way / all', () => {
      it('works when twoway matches is clicked)', () => {
        per_page = perPage('/search/discovery/recently-joined');
        const target = {
          path: '/search/discovery/recently-joined',
          query: { pg_searchresults_id: 'abcde', page: '10', vtype: 'grid' },
          changes: { cluster: 'matches', values: ['2-way'] },
          searchList_type: 'recently_joined_2way',
        };

        const expQ = { search_type: 'recently_joined_2way', viewed: 'N', format: 'grid', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when all is selected)', () => {
        per_page = perPage('/search/discovery/recently-joined');
        const target = {
          path: '/search/discovery/recently-joined',
          query: { pg_searchresults_id: 'abcde', vtype: 'list', spn: 'list', matches: 'twoways' },
          changes: { cluster: 'matches', values: ['All'] },
          searchList_type: 'recently_joined',
        };

        const expQ = { search_type: 'recently_joined', viewed: 'N', format: 'list', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('User selects recently viewed', () => {
      it('works when recentlyViewed is clicked (/search/broader?pg_searchresults_id=abcde&page=13&vtype=grid)', () => {
        per_page = perPage('/search/broader');
        const target = {
          path: '/search/broader',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid' },
          changes: { cluster: 'recentlyViewed', values: ['Y'] },
          searchList_type: 'broader',
        };

        const expQ = { search_type: 'broader', viewed: 'Y', format: 'grid', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('User selects some facet', () => {
      it('works when marital status is selected (/search/broader?pg_searchresults_id=abcde&page=13&vtype=list)', () => {
        per_page = perPage('/search/broader');
        const target = {
          path: '/search/broader',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'list' },
          changes: { cluster: 'maritalstatus', values: ['Never Married', 'Divorced', 'Awaiting Divorce', 'Annulled'] },
          searchList_type: 'broader',
        };

        const expQ = {
          results_id: 'abcde',
          search_type: 'refine',
          refined_cluster: 'maritalstatus',
          refined_values: ['Never Married', 'Divorced', 'Awaiting Divorce', 'Annulled'],
          viewed: 'N',
          format: 'list',
          per_page: '20',
        };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });
  });
});
