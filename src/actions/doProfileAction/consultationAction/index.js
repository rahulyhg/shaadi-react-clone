/* eslint camelcase: 0 */
import requestModal from './requestModal';

export default (uid, args, params) => {
  const { source, self, type } = params;

  switch (type) {
    case 'callConsultantInvited':
    case 'callConsultant': {
      if (uid) {
        return requestModal(uid, args, params);
      }
      return null;
    }

    default:
      console.log('TO DO callconsultation', type, { source, uid, args, self });
      return null;
  }
};
