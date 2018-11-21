import alerts from '../../lib/alerts';
import { popup } from '../../lib/utils';
import { search as t } from '../../lib/content';

export default (uid, args, params) => {
  const { source, type, dispatch, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', flags: { horoscopeStatus: 'none' } };
  const settings = getState().session.settings;
  const { wwwBaseUrl } = getState().config.app;

  if (type !== 'showHoroscope') {
    console.log('%c TO DO horoscopeAction', 'font-size: 18px', type, source);
    return null;
  }

  switch (profile.flags.horoscopeStatus) {
    case 'locked':
    case 'none':
      return null;
    case 'availableOnRequest': {
      const tooltip = t.horoscope(profile.name, profile.hisHer);
      return alerts.show(dispatch, [source, 'horoscope', { uid }], tooltip);
    }
    case 'available':
      return popup(`${wwwBaseUrl}/horoscope/${profile.uid}/${settings.horoscopeStyle}`);
    default:
      return null;
  }
};
