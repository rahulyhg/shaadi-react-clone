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
    search_type, // required: server-based, preferred, switch-to-preferred, switch-to-most_preferred, pagination, refine
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
      fieldset: 'most_preference,listing_view',
    },
  };

  // Pick up pp
  requests.pp = {
    method: 'get',
    relative_url: `/preferences/${uid}`,
    query: {
      profileids: uid,
      fieldset: 'partner,matches',
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

  if (search_type === 'switch-to-preferred' || search_type === 'switch-to-most_preferred') {
    // User wants to switch to a search type

    const type = search_type.replace('switch-to-', '');
    q.type = 'preferred';
    q.preferred_selection = type === 'preferred' ? undefined : type;

    requests.changePreferredSwitch = {
      method: 'put',
      relative_url: `/preferences/${uid}`,
      body: {
        data: {
          matches: {
            most_preference: type === 'most_preferred' ? 'Y' : 'N',
          },
        },
      },
    };
  }

  if (search_type === 'server-based') {
    // Auto choose search type
    q.type = 'preferred';

    requests.most = ww4.preferredSearch(q);
    requests.most.query.preferred_selection = 'most_preferred';

    q.preferred_selection = 'setting';

    requests.dependency = {
      most: {
        preferred: {
          criteria: {
            operator: 'lteq',
            operands: {
              'preferred.paginator.total_count': '50',
            },
          },
        },
      },
    };
  }

  requests.preferred = ww4.preferredSearch(q);
  return [q, requests];
};

const extract = data => {
  const pp = data.pp.data[Object.keys(data.pp.data)[0]] || {};
  if (pp.matches && ['Y', 'N'].includes(pp.matches.most_preference)) return data.preferred;
  if (data.most && Object.keys(data.most).length > 0) {
    const config = data.config.data.most_preference || {};
    const tCount = parseInt((config.config || config).trigger_count || 50, 10);
    if (parseInt(data.preferred.paginator.total_count || 0, 10) < tCount && parseInt(data.most.paginator.total_count || 0, 10) > 0) {
      return { ...data.most, tourShowable: true };
    }
  }
  return data.preferred;
};

const index = (logger, query, auth, config) => {
  const [q, requests] = createBatchRequest(auth, query);
  return batchRequestService(
    logger,
    { ...query, _debug: 'search_partner' },
    auth,
    requests,
    data =>
      decorators.preferredMatches(
        undefined,
        extract(data),
        q,
        data.self ? data.self.data[Object.keys(data.self.data)[0]] : undefined,
        data.pp.data[Object.keys(data.pp.data)[0]] || {},
        data.config.data || {},
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
