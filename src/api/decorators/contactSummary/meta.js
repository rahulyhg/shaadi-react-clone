import { stringify } from 'qs';

const baseValue = {
  results_id: '',
  total: 0,
  page: 1,
  pages: 0,
  permaLink: '/inbox/contact-summary',
};

const getPermaLink = params => {
  const query = {
    pg_searchresults_id: params.key,
    page: params.page === 1 ? undefined : params.page,
  };
  return `${baseValue.permaLink}?${stringify(query)}`;
};

export default (base = baseValue, paginator = {}) => ({
  ...base,
  page: paginator.page,
  total: paginator.totalCount,
  pages: Math.ceil(paginator.totalCount / paginator.limitPerPage),
  results_id: paginator.key,
  permaLink: Number(paginator.page) === 1 ? baseValue.permaLink : getPermaLink(paginator),
});
