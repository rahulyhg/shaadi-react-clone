import batchRequestService from '../services/batchRequestService';
import decorators from '../decorators';

const lookupContact = ({ data }) => (data && data[Object.keys(data)[0]]) || {};

const create = (logger, data, query, auth) => {
  const { uid } = auth;

  const batchRequest = {};
  batchRequest.contactLookupRequest = {
    method: 'get',
    relative_url: `/contacts/${uid}?_debug=contactLookup`,
    query: {
      profileids: data.id,
      fieldset: 'details',
      metadata: data.metadata,
    },
  };

  batchRequest.reportMisuseRequest = {
    method: 'get',
    relative_url: `/misuse/${uid}/phone?_debug=getReportMisuse`,
    query: {
      profileid: data.id,
    },
  };
  return batchRequestService(logger, query, auth, batchRequest, dt => {
    const { contactLookupRequest, reportMisuseRequest } = dt;
    const contactLookupRequestRes = contactLookupRequest && lookupContact(contactLookupRequest);
    contactLookupRequestRes.isMisuseReported = reportMisuseRequest && reportMisuseRequest.data;
    return {
      contactLookup: decorators.contactLookup(undefined, contactLookupRequestRes),
    };
  });
};

export default {
  create,
};
