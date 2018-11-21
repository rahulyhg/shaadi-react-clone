import requestService from '../services/requestService';
import decorators from '../decorators';

const updateMatchesSwitch = (logger, data, query, auth) => {
  const request = {
    method: 'put',
    url: `/preferences/${auth.uid}`,
    data,
  };

  return requestService(logger, query, auth, request, d => d.data);
};

// @author: Anush Shukla
const getPhotoPrivacySettings = (logger, params, auth) => {
  const { uid } = auth;
  const url = `/preferences/${uid}`;
  const method = 'get';
  const request = {
    method,
    params,
    url,
  };
  return requestService(logger, params, auth, request, d => d);
};

// @author: Anush Shukla
const updatePhotoPrivacySettings = (logger, data, params, auth) => {
  const { uid } = auth;
  const url = `/preferences/${uid}`;
  const method = 'put';
  const request = {
    method,
    params,
    data,
    url,
  };
  return requestService(logger, params, auth, request, d => d);
};

const updateLanguageSettings = (logger, data, query, auth) => {
  const request = {
    method: 'put',
    url: `/preferences/${auth.uid}?debug=lang`,
    data,
  };
  return requestService(logger, query, auth, request, d => d.data);
};

const getLanguageSettings = (logger, params, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/preferences/${uid}?debug=lang&profileids=${uid}&fieldset=display_settings`,
  };
  return requestService(logger, params, auth, request, d => {
    const appLanguageData = d.data[Object.keys(d.data)[0]];
    return decorators.multilingual(undefined, appLanguageData);
  });
};

export default {
  updateMatchesSwitch,
  getPhotoPrivacySettings,
  updatePhotoPrivacySettings,
  updateLanguageSettings,
  getLanguageSettings,
};
