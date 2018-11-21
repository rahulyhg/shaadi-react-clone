import types from '../../../action_types';
import apiGetConsultation from '../apiGetConsultation';

const defaultTypes = {
  callConsultant: 'callConsultant',
};

export default (uid, args, params) => {
  const { type, dispatch } = params;

  const contactno = '';
  const name = '';
  const memberEnquiryCount = 0;
  const submitted = false;

  const payload = {
    modal: 'callConsultant',
    type,
    contactno,
    name,
    uid,
    submitted,
    memberEnquiryCount,
  };
  dispatch({
    type: types.MODAL_SHOW,
    payload,
  });

  apiGetConsultation(defaultTypes[type] || type, uid, params);

  return null;
};
