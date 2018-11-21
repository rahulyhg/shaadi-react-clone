const getState = {
  display_name: '',
  horoscope_status: '',
  memberlogin: '',
  phone: '',
  photo: '',
  photo_password: null,
  profile_privacy: '',
  shortlist_setting: '',
  sms_alert: 0,
  visitors_setting: '',
};

const getAction = (type, data = {}) => ({
  type,
  payload: {
    data: {
      privacy: {
        display_name: data.display_name || '',
        horoscope_status: data.horoscope_status || '',
        memberlogin: data.memberlogin || '',
        phone: data.phone || '',
        photo: data.photo || '',
        photo_password: data.photo_password || null,
        profile_privacy: data.profile_privacy || '',
        shortlist_setting: data.shortlist_setting || '',
        sms_alert: data.sms_alert || 0,
        visitors_setting: data.visitors_setting || '',
      },
    },
  },
});

const factory = { getState, getAction };

it('should export state and action', () => {
  expect(Object.keys(factory).length).toEqual(2);
});

export default factory;
