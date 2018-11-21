/* eslint camelcase: 0 */

import batchRequestService from '../services/batchRequestService';
import requestService from '../services/requestService';
import decorators from '../decorators';

const show = (logger, query, auth) => {
  const { id } = query;
  const { ubt, per_page, results_id, page, number, evt_ref, source, tempId = '', featured } = query.q || {};

  if (ubt) {
    const request = {
      method: 'get',
      url: `/profiles/${auth.uid}/prevnext?_debug=queue-ubt`,
      params: {
        ubt,
        profileid: id,
        limit: 1,
        limit_per_page: per_page,
        evt_ref,
        source,
        featured,
        decorator: { name: 'pagination' },
      },
    };
    return requestService(logger, query, auth, request, d => decorators.profileQueue(undefined, undefined, d.data));
  }

  if (results_id) {
    const request = {
      method: 'get',
      url: `/profiles/${auth.uid}/prevnext?_debug=queue-ubt`,
      params: {
        key: results_id,
        profileid: tempId || id,
        limit: 1,
        limit_per_page: per_page,
        evt_ref,
        source,
        featured,
        decorator: { name: 'pagination' },
      },
    };
    return requestService(logger, query, auth, request, d => decorators.profileQueue(undefined, undefined, d.data));
  }

  const [int_per_page, int_page, int_number] = [per_page, page, number].map(i => parseInt(i || '1', 10));

  const requests = {
    queue: {
      method: 'get',
      relative_url: `/searches/${auth.uid}`,
      query: {
        type: 'pagination',
        page: int_page,
        limit_per_page: int_per_page,
        result_options: '{"fieldset":["profileids","count"]}',
        key: results_id,
      },
    },
  };

  if (int_page !== 1 && int_number <= 1) {
    requests.prevQueue = {
      ...requests.queue,
      query: {
        ...requests.queue.query,
        page: int_page - 1,
      },
    };
  }

  if (int_number >= int_per_page - 1) {
    requests.nextQueue = {
      ...requests.queue,
      query: {
        ...requests.queue.query,
        page: int_page + 1,
      },
    };
  }

  return batchRequestService(logger, query, auth, requests, d =>
    decorators.profileQueue(undefined, { ...d, id, int_number, int_page, int_per_page }),
  );
};

const index = (logger, query, auth) => {
  const { id, limit } = query;
  const { ubt, per_page, results_id, page, number, evt_ref, source, tempId = '', featured } = query.q || {};

  if (ubt) {
    const request = {
      method: 'get',
      url: `/profiles/${auth.uid}/prevnext?_debug=bulk-ubt`,
      params: {
        ubt,
        profileid: id,
        limit,
        limit_per_page: per_page,
        evt_ref,
        source,
        featured,
      },
    };
    return requestService(logger, query, auth, request, d => decorators.bulkQueue(undefined, query, undefined, d.data));
  }

  if (results_id) {
    const request = {
      method: 'get',
      url: `/profiles/${auth.uid}/prevnext?_debug=bulk-results_id`,
      params: {
        key: results_id,
        profileid: tempId || id,
        limit,
        limit_per_page: per_page,
        evt_ref,
        source,
        featured,
      },
    };
    return requestService(logger, query, auth, request, d => decorators.bulkQueue(undefined, query, undefined, d.data));
  }

  const [int_per_page, int_page, int_number] = [per_page, page, number].map(i => parseInt(i || '1', 10));

  const requests = {
    queue: {
      method: 'get',
      relative_url: `/searches/${auth.uid}`,
      query: {
        type: 'pagination',
        page: int_page,
        limit_per_page: int_per_page,
        result_options: '{"fieldset":["profileids","count"]}',
        key: results_id,
      },
    },
  };

  if (int_page !== 1 && int_number <= 1) {
    requests.prevQueue = {
      ...requests.queue,
      query: {
        ...requests.queue.query,
        page: int_page - 1,
      },
    };
  }

  if (int_number >= int_per_page - 1) {
    requests.nextQueue = {
      ...requests.queue,
      query: {
        ...requests.queue.query,
        page: int_page + 1,
      },
    };
  }

  return batchRequestService(logger, query, auth, requests, d =>
    decorators.bulkQueue(undefined, query, { ...d, id, int_number, int_page, int_per_page }),
  );
};

export default {
  show,
  index,
};
