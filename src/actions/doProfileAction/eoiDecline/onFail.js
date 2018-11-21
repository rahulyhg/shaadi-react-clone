/* eslint camelcase: 0 */
import types from '../../../action_types';
import alerts from '../../lib/alerts';
import { search as t } from '../../lib/content';

export default (uid, args, params) => (payload, { error }) => {
  const { source, dispatch } = params;

  dispatch({ type: types.EOI_FAIL, payload });

  const tooltip = error.type === 'formatted' ? t.error({ error }) : t.loudError({ error }, 'Error');
  if (source !== 'profile') {
    alerts.show(dispatch, [source, 'eoi', { uid }], tooltip, 10);
  }
  return null;
};
