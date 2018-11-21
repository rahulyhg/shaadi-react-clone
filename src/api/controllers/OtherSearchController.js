/* eslint camelcase: 0 */
import decorators from '../decorators';
import ww4 from '../ww4';
import batchRequestService from '../services/batchRequestService';

const createBatchRequest = (
  {
    uid, // required: member id
  },
  {
    per_page, // required: limit per page
    format, // required: server-based, list or grid
    search_type, // required: server-based, broader, reverse, 2-way, pagination, refine
    results_id, // optional: search key (required for pagination and refine, must be absent otherwise)
    page, // optional: page no
    viewed, // optional: Y or N
    sort, // optional: score, recorddate, logindate
    refined_cluster, // optional: facet key
    refined_values, // optional: facet values as an array
    file_extension,
  },
) => {
  const requests = {};

  // Pick up config
  requests.config = {
    method: 'get',
    relative_url: `/config/user/${uid}`,
    query: {
      fieldset: 'listing_view',
    },
  };

  // Pick up pp
  requests.pp = {
    method: 'get',
    relative_url: `/preferences/${uid}`,
    query: {
      profileids: uid,
      fieldset: 'partner,contact_filter',
    },
  };

  // Search
  const q = {
    uid,
    results_id: ['refine', 'pagination'].includes(search_type) ? `${results_id}` : undefined,
    type: search_type,
    page: parseInt(`${page}`, 10) > 0 ? parseInt(`${page}`, 10) : undefined,
    limit_per_page: per_page,
    viewed,
    sort: sort || 'score',
    view: format,
    refined_cluster,
    refined_values,
    file_extension,
  };

  if (format === 'server-based') {
    // Auto choose list or grid
    q.view = undefined;

    requests.self = {
      method: 'get',
      relative_url: `/profiles/${uid}`,
      query: {
        options: {
          profile: {
            fieldset: ['location'],
          },
        },
      },
    };
  }

  requests.search = ww4.otherSearch(q);

  return [q, requests];
};

const extract = data => data.search;

const index = (logger, query, auth, config) => {
  const [q, requests] = createBatchRequest(auth, query);

  return batchRequestService(
    logger,
    { ...query, _debug: 'other_search' },
    auth,
    requests,
    data =>
      decorators.otherSearch(
        undefined,
        extract(data),
        q,
        data.self ? data.self.data[Object.keys(data.self.data)[0]] : undefined,
        data.pp.data[Object.keys(data.pp.data)[0]] || {},
      ),
    data => {
      if (extract(data).remark && extract(data).remark.messageCode) {
        return {
          code: 'invalid_search_result',
          message: extract(data).remark.messageCode,
        };
      }
      return null;
    },
    { cancelToken: config.CancelToken },
  );
};

export default {
  index,
};
