import types from '../../action_types';
import errors from '../lib/errors';
import api from '../../api';

const phoneMisuseReasonMap = {
  married: 'Married / Engaged',
  wrongno: 'Wrong Number',
  unreachable: 'Not Reachable',
};

export default (uid, args, { dispatch, getState, type, source }) => {
  const data = {
    data: {
      category: 'Invalid Phone Number',
      message: (args.length > 0 && phoneMisuseReasonMap[args[0].reason]) || '',
      profileid: uid,
    },
  };
  const metadata = {
    from_action: 'report_invalid_phone_number',
    channel: 'web_profile',
    source,
  };

  dispatch({ type: types.MODAL_HIDE });

  api
    .post('/report-phone', { ...data, metadata })
    .then(response => {
      const reportPhoneresp = (response.data || {}).data;
      const contactQuota = (reportPhoneresp.quota || {}).contacts;
      const contactRemaining = contactQuota && contactQuota.total - contactQuota.used;
      const contactTotal = contactQuota && contactQuota.total;
      const content =
        'This phone number has been reported as invalid & will be investigated further. \n This contact has been added back to your balance.';
      dispatch({ type: types.MODAL_SHOW, payload: { modal: 'thankYouPage', uid, content } });
      dispatch({ type: types.CONTACT_EOI_SUCCESS, payload: { uid, contacts_total: contactTotal, contacts_remaining: contactRemaining } });
    })
    .catch(error => {
      dispatch({ type: types.REPORT_MISUSE_FAIL, payload: errors.clean(error) });
    });
};
