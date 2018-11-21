export default ({ uid }) => {
  const request = {
    method: 'get',
    url: `/recommendations/${uid}`,
    params: {
      type: 'daily_recommendations',
      _debug: 'daily20',
      profile_options:
        '{"fieldset":["basic","account","lifestyle","health_info","appearance","family","trait","origin","doctrine","location","profession","education","interests_and_more","verification"]}',
      photo_options:
        '{"fieldset":["count","photos"],"profile_photo":true,"size":["small","medium","semilarge", "120X120", "450X600", "250X310"], "blur":true, "thumb_param":"_nb"}',
      astro_options: '{"fieldset":["details"]}',
      contact_options: '{"fieldset":["details"]}',
      derived_options: '{"fieldset":["relationship_actions","chat_presence","chat_details","score","profile_views"]}',
      derived_text: '{"fieldset":["matching_data","family_details","horoscope_details","education","career","annualincome"]}',
    },
  };
  return request;
};
