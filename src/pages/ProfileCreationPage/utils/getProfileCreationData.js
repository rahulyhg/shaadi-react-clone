import cookie from 'cookie';
import device from '../../../helpers/device';
import getStep1FormData from './getStep1FormData';
import getStep2FormData from './getStep2FormData';
import getStep3FormData from './getStep3FormData';
import getStep4FormData from './getStep4FormData';

export const getEduction = education => {
  if (!education.education_stream) {
    return education.education;
  }
  return `${education.education} - ${education.education_stream}`;
};

export default (form, user) => {
  const { location, origin, metadata, basic, family, doctrine, 'astro-details': astroDetails } = getStep1FormData(form);
  const { education, profession } = getStep2FormData(form);
  const { appearance, lifestyle } = getStep3FormData(form);
  const { trait, health_info, 'contact-details': contactData } = getStep4FormData(form);
  const cookies = cookie.parse(document.cookie);
  return {
    profileData: {
      account: {
        posted_by: user.postedBy, // @todo this should not be required in create profile API
      },
      basic: {
        ...user.basic,
        ...basic,
      },
      metadata,
      trait,
      health_info,
      family,
      appearance,
      lifestyle,
      location: {
        ...location,
        country: user.country, // @todo this should not be required in create profile API
        google_city_id: undefined,
        zip_status: undefined,
      },
      origin: {
        ethnicity: origin.ethnicity,
        grewup_in: form.grewUpIn.values ? form.grewUpIn.values.split(',') : [user.country],
      },
      doctrine: {
        ...doctrine,
        mother_tongue: user.motherTongue,
        religion: user.religion, // @todo this should not be required in create profile API
      },
      education: {
        ...education,
        // @todo have the API concatenate the below value with education stream as it being a part of business logic
        education: getEduction(education),
        college_1: form.college1.value,
        college_2: form.college2.value,
      },
      profession: {
        ...profession,
        industry: form.workingAs.industry,
      },
    },
    metaData: {
      ip_country_name: '',
      user_agent: window.navigator.userAgent,
      cro_login: '',
      device_id: cookies.mid,
      source: device.platform,
      abtme_hid: form.description.suggestedValue,
      google_city_id: form.zip.googleCityId,
      // discussed the following with Bhushan
      entry_point_referrer: cookies.firstPtnr,
      // @todo get UTC time from the server
      reg_page2_start_time: Math.floor(new Date().getTime() / 1000),
      previous_page_url: document.referrer,
      landing_page_url: document.URL,
      landing_page_name: 'reg flow',
      posted_url: '',
    },
    astroData: {
      ...astroDetails,
      sarpa_dosham: form.doshamTypes.value.includes('sarpa_dosham') ? 'Y' : '',
      kaalsarpa_dosham: form.doshamTypes.value.includes('kaalsarpa_dosham') ? 'Y' : '',
      rahu_dosham: form.doshamTypes.value.includes('rahu_dosham') ? 'Y' : '',
      ketu_dosham: form.doshamTypes.value.includes('ketu_dosham') ? 'Y' : '',
      kalathra_dosham: form.doshamTypes.value.includes('kalathra_dosham') ? 'Y' : '',
    },
    contactData,
  };
};
