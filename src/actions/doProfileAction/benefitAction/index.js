import eoiConnect from '../eoiConnect';
import doChatWindowAction from '../../doChatAction/doChatWindowAction';

export default (uid, args, params) => {
  const { source, type, getState } = params;
  const profile = getState().profiles[uid] || {};

  switch (type) {
    case 'sendEmail': {
      if (['default', 'shortlisted'].includes(profile.flags.connectionStatus)) {
        return eoiConnect(uid, args, { ...params, type: 'connect_from_send_email' });
      }
      return doChatWindowAction(uid, ['open'], params);
    }
    default: {
      console.log('%c TO DO benefitAction', 'font-size: 18px', type, source);
      return null;
    }
  }
};
