import requestService from '../services/requestService';
import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const lookupContact = ({ data }) => (data && data[Object.keys(data)[0]]) || {};

const show = (logger, query, auth) => {
  const { uid } = auth;
  const batchRequest = {};
  batchRequest.phoneSettingsList = ww4.phoneSettings(uid);

  batchRequest.preferences = {
    method: 'get',
    relative_url: `/preferences/${uid}`,
    query: {
      _debug: 'phone_setting_value',
      fieldset: 'privacy',
      profileids: uid,
      memberlogin: uid,
    },
  };
  return batchRequestService(logger, query, auth, batchRequest, dt => {
    const { phoneSettingsList, preferences } = dt;
    const phoneSettingsListRes = phoneSettingsList && lookupContact(phoneSettingsList);
    phoneSettingsListRes.preferences = preferences && preferences;
    return {
      phoneSettings: decorators.phoneSettings(undefined, phoneSettingsListRes, { uid }),
    };
  });
};

const save = (logger, data, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'put',
    url: `/preferences/${uid}`,
    data: {
      data: {
        privacy: {
          phone: data.answer,
        },
      },
    },
  };
  return requestService(logger, query, auth, request, d => d.data);
};

export default {
  show,
  save,
};
