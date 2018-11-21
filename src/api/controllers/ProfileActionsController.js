import batchRequestService from '../services/batchRequestService';
import requestService from '../services/requestService';
import consentRequest from '../ww4/consent';
import ww4 from '../ww4';
import decorators from '../decorators';
import getCurrentFullDateTimestamp from '../../helpers/getCurrentFullDateTimestamp';

const paramsGenerator = {
  default: p => ({}),
  accept: (p, from) => ({
    from,
    to: p.uid,
    type: 'connect',
  }),
  decline: (p, from) => ({
    from,
    to: p.uid,
    type: 'connect',
  }),
  delete: (p, from) => ({
    from,
    to: p.uid,
    type: 'connect',
  }),
  remind: (p, from) => ({
    from,
    to: p.uid,
    type: 'connect',
  }),
  cancel: (p, from) => ({
    from,
    to: p.uid,
    type: 'connect',
  }),
  delete_requests: (p, memberLogin) => {
    switch (p.direction) {
      case 'in':
        return {
          from: p.uid,
          to: memberLogin,
          type: p.requestType,
        };
      case 'out':
        return {
          from: memberLogin,
          to: p.uid,
          type: p.requestType,
        };
      default: {
        return {};
      }
    }
  },
};

const dataGenerator = {
  default: p => ({
    data: {
      type: p.type,
    },
    metadata: p.metadata || {},
  }),
  accept: (p, from) => ({
    data: {
      action: 'accepted',
    },
    message: {
      personalized_message: p.text,
    },
  }),
  decline: (p, from) => ({
    data: {
      action: 'declined',
    },
    message: {
      personalized_message: p.text,
    },
  }),
  remind: (p, from) => ({
    data: {
      action: 'send_reminder',
    },
    message: {
      personalized_message: p.text,
    },
  }),
  delete: (p, from) => ({
    data: {
      action: 'deleted',
      deleted_by_to: getCurrentFullDateTimestamp(),
    },
  }),
  delete_requests: (p, memberLogin) => {
    switch (p.direction) {
      case 'in':
        return {
          data: {
            action: 'deleted',
            deleted_by_to: getCurrentFullDateTimestamp(),
          },
        };
      case 'out':
        return {
          data: {
            action: 'deleted',
            deleted_by_from: getCurrentFullDateTimestamp(),
          },
        };
      default: {
        return {};
      }
    }
  },
  photoaccess: (p, from) => ({
    data: {
      from,
      to: p.uid,
      type: p.type,
    },
  }),
  photo: (p, from) => ({
    data: {
      from,
      to: p.uid,
      type: p.type,
    },
  }),
  connect: (p, from) => ({
    data: {
      from,
      to: p.uid,
      type: p.type,
    },
    message: {
      personalized_message: p.text,
    },
  }),
  shortlisted: (p, from, isShortlistDeleted) => {
    if (p.list_ids.length === 0) {
      return {
        data: {
          type: p.type,
          profileids: [p.uid],
          list_id: p.prev_list_ids,
        },
      };
    }
    const deletedItems = p.prev_list_ids && p.list_ids ? p.prev_list_ids.filter(list => p.list_ids.indexOf(list) === -1) : [];
    if (deletedItems.length > 0 && isShortlistDeleted) {
      return {
        data: {
          type: p.type,
          profileids: [p.uid],
          list_id: deletedItems,
        },
      };
    }
    return {
      data: {
        lists: (p.list_ids || []).map(lid => ({ list_id: parseInt(lid, 10) })),
        type: p.type,
        profileid: p.uid,
      },
    };
  },
  ignored: (p, from) => ({
    data: {
      type: p.type,
      profileid: p.uid,
    },
  }),
  blocked: (p, from) => ({
    data: {
      type: p.type,
      profileid: p.uid,
    },
  }),
  unblocked: (p, from) => ({
    data: {
      type: 'blocked',
      profileids: p.uid,
    },
  }),
  misuse_reported: (p, from) => ({
    data: {
      profileid: p.uid,
      category: `Member Misuse - ${p.category}`,
      message: `${p.reasons}`,
    },
  }),
  misuse_upload: (p, from) => ({
    data: {
      profileid: p.uid,
      attachment_url: p.attachmentURL,
      message: p.message,
      helpdeskid: p.helpdeskid,
    },
  }),
  cancel: (p, from) => ({
    data: {
      action: 'cancelled',
    },
  }),
  skip: (p, from) => ({
    data: {
      type: p.type,
      profileid: p.uid,
    },
  }),
};

const postParams = (data, from) => {
  const base = paramsGenerator.default(data, from);
  const specific = paramsGenerator[data.type] ? paramsGenerator[data.type](data, from) : {};
  return { ...base, ...specific };
};

const postBody = (data, from, isShortlistDeleted) => {
  const base = dataGenerator.default(data, from);
  const specific = dataGenerator[data.type] ? dataGenerator[data.type](data, from, isShortlistDeleted) : {};
  return { ...base, ...specific };
};

const method = ({ type, list_ids, prev_list_ids }, isShortlistDeleted) => {
  if (['accept', 'decline', 'delete', 'remind', 'cancel', 'misuse_upload', 'delete_requests'].includes(type)) {
    return 'put';
  }
  if (type === 'shortlisted' && list_ids.length === 0) {
    return 'delete';
  }

  if (isShortlistDeleted && type === 'shortlisted' && prev_list_ids.some(p => list_ids.indexOf(p) === -1)) {
    return 'delete';
  }

  if (type === 'unblocked') {
    return 'delete';
  }
  return 'post';
};

const service = ({ type, list_ids }) => {
  if (type === 'misuse_reported' || type === 'misuse_upload') {
    return 'misuse';
  }
  if (['accept', 'decline', 'delete', 'remind', 'connect', 'photoaccess', 'photo', 'cancel', 'delete_requests'].includes(type)) {
    return 'requests';
  }
  return 'intents';
};

const create = (logger, data, query, auth) => {
  const { uid } = auth;
  const requests = {
    [data.type]: {
      method: method(data),
      relative_url: `/${service(data)}/${uid}`,
      body: postBody(data, uid),
      query: postParams(data, uid),
    },
  };

  if (data.loadSimilarProfile) {
    requests.dependency = {};

    requests.similarProfile = ww4.similarProfile.batchRequest({ uid, type: 'similar_profile', profileid: data.uid });

    requests.dependency.similarProfile = {
      [data.type]: {
        criteria: {
          operator: 'eq',
          operands: {
            [`${[data.type]}.code`]: '200',
          },
        },
      },
    };
  }

  if (
    data.prev_list_ids &&
    data.list_ids &&
    data.prev_list_ids.length > 0 &&
    data.list_ids.length > 0 &&
    data.prev_list_ids.some(p => data.list_ids.indexOf(p) === -1)
  ) {
    requests.deletedShortListed = {
      method: method(data, true),
      relative_url: `/${service(data)}/${uid}`,
      body: postBody(data, uid, true),
      query: postParams(data, uid),
    };
  }

  if (data.sendPassword && data.sendPassword !== 'false') {
    requests.sendPassword = {
      method: 'put',
      relative_url: `/requests/${uid}`,
      body: { data: { action: 'send_accepted' } },
      query: {
        from: data.uid,
        to: uid,
        type: 'photoaccess',
      },
    };
  }

  if (data.driveLayer) {
    if (data.driveLayer.type === 'photo') {
      requests.driveLayer = {
        method: 'get',
        relative_url: `/prompt/${uid}/drive-layer`,
        query: {
          fieldset: 'private_photo',
        },
      };
    }

    if (data.driveLayer.type === 'firstStep') {
      const driveLayerFor = data.type === 'accept' ? 'accepted' : 'invitation';
      requests.driveLayer = {
        method: 'get',
        relative_url: `/prompt/${uid}/drive-layer`,
        query: {
          fieldset: 'payment',
          interest_type: driveLayerFor,
        },
      };
      requests.layerDiscount = {
        method: 'get',
        relative_url: `/prompt/${uid}/discount`,
        query: {
          campaign_id: data.driveLayer.campaign || '',
        },
      };
    }
  }

  return batchRequestService(logger, query, auth, requests, d => {
    if (!data.loadSimilarProfile) return d;
    const { similarProfile = { data: [] } } = d;
    return {
      ...d,
      similarProfile: decorators.similarProfile(data.uid, similarProfile),
    };
  });
};

const updateLayerShown = (logger, data, query, auth) => {
  const { uid } = auth;

  let requests = {};
  if (data.channel === 'firstPhotoUpload') {
    requests = {
      driveLayer: {
        method: 'put',
        relative_url: `/prompt/${uid}/drive-layer`,
        body: {
          data: {
            private_photo: {},
          },
        },
      },
    };
  } else {
    const driveLayerFor = data.connectionType === 'accept' ? 'accepted' : 'invitation';
    requests = {
      driveLayer: {
        method: 'put',
        relative_url: `/prompt/${uid}/drive-layer`,
        body: {
          data: {
            payment: {
              interest_type: driveLayerFor,
            },
          },
        },
      },
    };
  }

  return batchRequestService(logger, query, auth, requests, d => d);
};

const verificationConsent = (logger, data, query, auth) => requestService(logger, query, auth, consentRequest(auth.uid, data));

export default {
  create,
  updateLayerShown,
  verificationConsent,
};
