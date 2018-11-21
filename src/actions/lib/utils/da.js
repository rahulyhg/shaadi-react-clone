const sendSnowPlowEvent = (memberlogin, profileid, event_referrer, event_loc, event_type) => {
  console.log(
    'Snowplow Data : ',
    `event_type: ${event_type}, memberlogin: ${memberlogin}, profileid: ${profileid}, event_referrer: ${event_referrer}, event_loc: ${event_loc}`,
  );

  const nonRealTimeEvents = ['photo_card_seen', 'photo_card_seen_2', 'photo_card_submit', 'photo_card_submit_2'];

  const isRealTime = !nonRealTimeEvents.includes(event_type);
  const environment = (isRealTime && 'production-realtime') || 'production';
  const daSchema = (isRealTime && 'viewed_unviewed') || 'profile_completion';
  const data = (isRealTime && {
    memberlogin,
    profile_id: profileid,
    event_type,
    platform: 'web-react',
    event_referrer,
    event_loc,
  }) || {
    event_type,
    listing_type: event_referrer,
    os: 'web-react',
  };

  window.da(`trackUnstructEvent:${environment}`, {
    schema: `iglu:com.shaadi/${daSchema}/jsonschema/1-0-0`,
    data,
  });
};

const trackDefaultEvent = args => {
  const { memberlogin, profileId, event_referrer, event_loc, event_type } = args;
  sendSnowPlowEvent(memberlogin, profileId, event_referrer, event_loc, event_type);
};

export default {
  trackDefaultEvent,
};
