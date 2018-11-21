import { DA } from '../lib/utils';

export default (source, event, uid, args = {}) => (dispatch, getState) => {
  const { metadata, session } = getState();
  if (
    session.settings.experiments &&
    session.settings.experiments.track_events &&
    session.settings.experiments.track_events.bucket === 'B'
  ) {
    const daPayload = {
      memberlogin: session.uid,
      profileId: uid,
      event_referrer: metadata.event_referrer === '-' ? 'unknown' : metadata.event_referrer,
      event_loc: metadata.event_loc === '-' ? 'unknown' : metadata.event_loc,
      event_type: event || 'unknown',
    };
    DA.trackDefaultEvent(daPayload);
  }
};
