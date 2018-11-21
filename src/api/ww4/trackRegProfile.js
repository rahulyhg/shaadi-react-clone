/* eslint camelcase: 0 */
const trackRegProfile = ({ uid, user, trackType, ptnr, session_id, field_name, event_name, field_value, errors, ...props }) => {
  const request = {
    method: 'post',
    url: `/track/${uid}/log?type=${trackType}&_debug=formEfficiency`,
    data: {},
  };
  const appendData = {
    type: trackType,
  };
  if (trackType === 'form-efficiency') {
    appendData.memberlogin = uid;
    appendData.ptnr = ptnr;
    appendData.session_id = session_id;
    appendData.form_name = 'frm_profile';
    appendData.field_name = field_name;
    appendData.event_name = event_name;
    appendData.field_value = field_value;
    appendData.field_value_count = '0';
    appendData.is_error_flag = 'N';
    appendData.timestamp_sec = Math.round(+new Date() / 1000);
    appendData.timestamp_milli_sec = Math.round(+new Date() / 1000);
  } else {
    const errorsArray = [];
    errors &&
      errors.forEach(i => {
        const errorsMap = {};
        errorsMap.memberlogin = uid;
        errorsMap.user = i.user || '';
        errorsMap.error_type = i.key || '';
        errorsMap.error_desc = i.error || '';
        errorsMap.user_err_value = i.value || '';
        errorsMap.page = 'REG PAGE 2 BLUR';
        errorsArray.push(errorsMap);
      });
    appendData.track = errorsArray;
  }

  request.data = { ...appendData };

  return request;
};

export default trackRegProfile;
