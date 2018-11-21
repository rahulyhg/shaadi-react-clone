export default (uid, { mobile_isd: mob_isd, stdCode: mob_std = '', mobile, mobile_country } = {}) => ({
  method: 'post',
  relative_url: `/contact/${uid}`,
  body: {
    data: {
      mob_isd,
      mob_std,
      mobile,
      mobile_country,
    },
  },
});
