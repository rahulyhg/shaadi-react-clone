/* eslint camelcase: 0 */
import types from '../../../action_types';
import api from '../../../api';
import apiAction from '../apiAction';
import apiAttachmentsUpload from '../../apiAttachmentsUpload';
import onSuccess from './onSuccess';
import onFail from './onFail';
import getCurrentFullDateTimestamp from '../../../helpers/getCurrentFullDateTimestamp';
import getCurrentFullDateStamp from '../../../helpers/getCurrentFullDateStamp';

export default (uid, args, params) => {
  const { source, self, type, dispatch, getState, history } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };

  const successFn = onSuccess(uid, args, params, history);
  const failFn = onFail(uid, args, params, history);
  // const selfProfile = getState().profiles.self || { uid: self, name: self };
  // const settings = getState().session.settings;

  switch (type) {
    case 'reportMisuse_confirm':
    case 'block': {
      const blockPayload = {
        ...params,
        type: 'blocked',
        fieldset: 'count',
        record_date: `between:${getCurrentFullDateStamp()}, ${getCurrentFullDateTimestamp()}`,
      };
      api
        .get('/profiles/blocked-count', { params: blockPayload })
        .then(response => {
          const hasExceededMaxRequests = response.data.data.count >= 20;
          if (!hasExceededMaxRequests && type === 'reportMisuse_confirm') {
            const from_action = source === 'modal/reportMisuse' ? 'report_misuse' : 'block';
            const [category, reasons] = args;
            const data = { category, reasons, metadata: { from_action, channel: 'web_profile' } };
            return apiAction(uid, 'misuse_reported', 'misuseReported', params, data, successFn, failFn);
          }
          const payload = {
            ...params,
            modal: 'blockMember',
            uid,
            name: getState().profiles[uid].name,
            source,
            hasExceededMaxRequests,
          };
          dispatch({ type: types.MODAL_SHOW, payload });
          return null;
        })
        .catch(error => error);
      return null;
    }
    case 'reportMisuse': {
      const payload = { ...params, modal: 'reportMisuse', uid, source, name: getState().profiles[uid].name };
      dispatch({ type: types.MODAL_SHOW, payload });
      return null;
    }
    case 'unblock': {
      dispatch({ type: types.MODAL_HIDE });
      const newState = profile.shortlists.count === 0 ? 'default' : 'shortlisted';
      return apiAction(uid, 'unblocked', newState, params, {}, successFn);
    }
    case 'block_confirm': {
      dispatch({ type: types.MODAL_HIDE });
      const reportMisuse = args[1];
      const data = { reportMisuse, metadata: { from_action: 'block' } };
      return apiAction(uid, 'blocked', 'blocked', params, data, successFn, failFn);
    }

    case 'reportMisuse_uploadAttachment': {
      const [files] = args;
      const data = { files, type: 'attachment', attachmentName: files.name };
      return apiAttachmentsUpload(uid, params, data);
    }
    case 'reportMisuse_upload': {
      const from_action = source === 'modal/reportMisuse' ? 'report_misuse' : 'block';
      const [attachmentURL, message, data] = args;
      const { helpdeskid } = data.data;
      const uploadData = { attachmentURL, message, helpdeskid, metadata: { from_action, channel: 'web_profile' } };
      if (attachmentURL !== '' || message !== '') {
        return apiAction(uid, 'misuse_upload', 'misuseReported', params, uploadData, successFn);
      }

      let nextUrl = '';
      if (source !== 'chat') {
        nextUrl = getState().profilePage.pagination.nextUrl || null;
      }
      const { status } = params;
      const payload = { ...uploadData, uid, source, type, [status || 'connectionStatus']: 'misuseReported', nextUrl };
      successFn(payload);
      break;
    }
    case 'reportMisuse_close': {
      let nextUrl = '';
      if (source !== 'chat') {
        nextUrl = getState().profilePage.pagination.nextUrl || null;
      }
      const { status } = params;
      const payload = { uid, source, type, [status || 'connectionStatus']: 'misuseReported', nextUrl };
      successFn(payload);
      break;
    }
    case 'reportMisuse_uploadReset': {
      const payload = { uid, type, source };
      dispatch({ type: types.ATTACHMENT_UPLOAD_RESET, payload });
      break;
    }
    default:
      console.log('TO DO eoiBlock', type, { source, uid, args, self });
      return null;
  }
  return false;
};
