import withAuth from '../withAuth';
import guard from '../lib/guard';
import updateLanguage from './updateLangage';

export default (source, uid, type, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      const params = { source, self: auth.uid, type, dispatch, getState, history };
      // const { session } = getState();
      // const domain = `.${session.domain}`;
      switch (type) {
        case 'updateLanguage':
          guard.createCookie('slang', args[0], null, '/', '.shaadi.com');
          updateLanguage(uid, args, params, args[0] || {}, args[1] || {});
          break;
        default:
          console.log('TODO doMemberAction');
      }
    },
    { caller: 'doMemberAction', allowCache: true, delay: 1 },
  );
};
