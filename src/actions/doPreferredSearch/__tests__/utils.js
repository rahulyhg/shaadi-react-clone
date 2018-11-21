/* eslint camelcase: 0 */

import { searchParams } from '../utils';
import perPage from '../../../constants/perPage';

const per_page = `${perPage('/search/partner') || 20}`;

describe('doPreferredSearch/utils', () => {
  describe('searchParams', () => {
    describe('GET without pg_searchresults_id', () => {
      it('works when user visits /search/partner', () => {
        const target = { path: '/search/partner', query: {}, changes: {}, isMostPreferred: false };
        const expQ = { search_type: 'server-based', viewed: 'N', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/partner/viewed', () => {
        const target = { path: '/search/partner/viewed', query: {}, changes: {}, isMostPreferred: false };
        const expQ = { search_type: 'server-based', viewed: 'Y', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/partner/viewed?matches=twoways', () => {
        const target = { path: '/search/partner/viewed', query: { matches: 'twoways' }, changes: {}, isMostPreferred: false };
        const expQ = { search_type: '2-way', viewed: 'Y', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/partner/viewed?page=4&sort_type=xyz&vtype=grid', () => {
        const target = {
          path: '/search/partner/viewed',
          query: { sort_type: 'xyz', page: '4', vtype: 'grid' },
          changes: {},
          isMostPreferred: false,
        };
        const expQ = { search_type: 'server-based', viewed: 'Y', sort: 'xyz', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('GET with pg_searchresults_id', () => {
      it('works when user visits /search/partner?pg_searchresults_id=abcde', () => {
        const target = { path: '/search/partner', query: { pg_searchresults_id: 'abcde' }, changes: {}, isMostPreferred: false };
        const expQ = { search_type: 'pagination', viewed: 'N', results_id: 'abcde', format: 'server-based', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/partner?pg_searchresults_id=abcde&page=13&vtype=grid', () => {
        const target = {
          path: '/search/partner',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid' },
          changes: {},
          isMostPreferred: false,
        };
        const expQ = { search_type: 'pagination', viewed: 'N', results_id: 'abcde', page: '13', format: 'grid', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when user visits /search/partner?pg_searchresults_id=abcde&page=13&vtype=grid&sort_type=xyz', () => {
        const target = {
          path: '/search/partner',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid', sort_type: 'xyz' },
          changes: {},
          isMostPreferred: false,
        };
        const expQ = { search_type: 'pagination', viewed: 'N', results_id: 'abcde', page: '13', format: 'grid', sort: 'xyz', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('should ignore matches and viewed when user visits /search/partner/viewed?pg_searchresults_id=abcde&page=13&vtype=grid&matches=twoways&sort_type=abc', () => {
        const target = {
          path: '/search/partner',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid', matches: 'twoways', sort_type: 'abc' },
          changes: {},
          isMostPreferred: false,
        };
        const expQ = { search_type: 'pagination', viewed: 'N', results_id: 'abcde', page: '13', format: 'grid', sort: 'abc', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('User clicks most matches switch', () => {
      it('works when most matches is switched on (/search/partner/viewed?pg_searchresults_id=abcde&page=13&vtype=grid&sort_type=recorddate)', () => {
        const target = {
          path: '/search/partner/viewed',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid', sort_type: 'recorddate' },
          changes: { cluster: 'moreMatches', values: ['most_preferred'] },
          isMostPreferred: true,
        };

        const expQ = { search_type: 'switch-to-most_preferred', viewed: 'Y', format: 'grid', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when most matches is switched off (/search/partner/viewed?pg_searchresults_id=abcde&page=13&vtype=grid)', () => {
        const target = {
          path: '/search/partner/viewed',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid' },
          changes: { cluster: 'moreMatches', values: ['preferred'] },
          isMostPreferred: false,
        };

        const expQ = { search_type: 'switch-to-preferred', viewed: 'Y', format: 'grid', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('User selects two way / all', () => {
      it('works when twoway matches is clicked (/search/partner?pg_searchresults_id=abcde&page=13&vtype=grid)', () => {
        const target = {
          path: '/search/partner',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid' },
          changes: { cluster: 'matches', values: ['2-way'] },
          isMostPreferred: false,
        };

        const expQ = { search_type: '2-way', viewed: 'N', format: 'grid', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });

      it('works when all is selected (/search/partner?pg_searchresults_id=abcde&vtype=list&spn=list&matches=twoways)', () => {
        const target = {
          path: '/search/partner',
          query: { pg_searchresults_id: 'abcde', vtype: 'list', spn: 'list', matches: 'twoways' },
          changes: { cluster: 'matches', values: ['preferred'] },
          isMostPreferred: true,
        };

        const expQ = { search_type: 'server-based', viewed: 'N', format: 'list', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('User selects recently viewed', () => {
      it('works when recentlyViewed is clicked (/search/partner?pg_searchresults_id=abcde&page=13&vtype=grid)', () => {
        const target = {
          path: '/search/partner',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'grid' },
          changes: { cluster: 'recentlyViewed', values: ['Y'] },
          isMostPreferred: true,
        };

        const expQ = { search_type: 'server-based', viewed: 'Y', format: 'grid', per_page };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });

    describe('User selects some facet', () => {
      it('works when marital status is selected (/search/partner?pg_searchresults_id=abcde&page=13&vtype=list)', () => {
        const target = {
          path: '/search/partner',
          query: { pg_searchresults_id: 'abcde', page: '13', vtype: 'list' },
          changes: { cluster: 'maritalstatus', values: ['Never Married', 'Divorced', 'Awaiting Divorce', 'Annulled'] },
          isMostPreferred: false,
        };

        const expQ = {
          results_id: 'abcde',
          search_type: 'refine',
          refined_cluster: 'maritalstatus',
          refined_values: ['Never Married', 'Divorced', 'Awaiting Divorce', 'Annulled'],
          viewed: 'N',
          format: 'list',
          per_page,
        };

        const q = searchParams(target);
        expect(q).toMatchObject(expQ);
        expect(expQ).toMatchObject(q);
      });
    });
  });
});
