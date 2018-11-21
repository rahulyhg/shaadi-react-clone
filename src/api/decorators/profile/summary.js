/* eslint camelcase: 0 */
import { inchesToFeet, strnorm, arrnorm } from '../utils';

const baseValue = {};

const isValidPayload = payload =>
  payload.account && payload.appearance && payload.basic && payload.doctrine && payload.location && payload.profession && payload.trait;

export default (baseline = baseValue, payload, extra) => {
  if (isValidPayload(payload)) {
    const { basic, account, doctrine, location, appearance, profession, trait, other, family, education } = payload;
    const { origin } = payload;
    const ageHeightInfo = {
      key: 'age_height',
      label: 'Age / Height',
      value: `${basic.age}, ${inchesToFeet(appearance.height)}`,
    };

    const maritalStatusInfo = {
      key: 'marital_status',
      label: 'Marital Status',
      value: `${basic.marital_status}`,
    };
    if (basic.marital_status.toLowerCase() !== 'never married') {
      maritalStatusInfo.value = `${maritalStatusInfo.value} (Children: ${family.children})`;
    }
    const religionInfo = {
      key: 'religion',
      label: 'Religion',
      value: `${doctrine.religion}`,
    };

    const motherTongueInfo = {
      key: 'mother_tongue',
      label: 'Mother Tongue',
      value: strnorm(doctrine.mother_tongue),
    };

    const communityInfo = {
      key: 'community',
      label: 'Community',
      value: `${doctrine.caste}`,
    };
    if (strnorm(doctrine.sub_caste, 2)) {
      communityInfo.value = `${communityInfo.value}, ${strnorm(doctrine.sub_caste, 2)}`;
    }
    const nakshatraInfo = {
      key: 'nakshatra',
      label: 'Nakshatra',
      value:
        (payload.derived_text &&
          payload.derived_text.horoscope_details &&
          payload.derived_text.horoscope_details.astro_gamification &&
          !payload.derived_text.horoscope_details.astro_gamification.is_astro_gamified &&
          strnorm(payload.derived_text.horoscope_details.nakshatra, 2)) ||
        '',
    };

    const gothraInfo = {
      key: 'gothra',
      label: 'Gothra',
      value: strnorm(doctrine.gotra, 2),
    };

    const locationInfo = {
      key: 'location',
      label: 'Location',
      value: `${location.city}, ${location.country}`,
    };

    const cityInfo = {
      key: 'city',
      label: 'city',
      value: location.city === 'Other' ? (location.state === 'Other' ? `${location.country}` : `${location.state}`) : `${location.city}`,
    };

    const locationNriInfo = {
      key: 'location_nri_info',
      label: 'Location',
      value: `${location.city},${location.state}, ${location.country}`,
    };

    const grewupInInfo = {
      key: 'info-6',
      label: 'Grew up in',
      value: `${origin.grewup_in.join(', ')}`,
    };

    const educationInfo = {
      key: 'education',
      label: 'Education',
      value: strnorm(education.education),
    };
    const professionInfo = {
      key: 'profession',
      label: 'Profession',
      value: strnorm(profession.occupation) || 'Not Specified',
    };

    // New description for card
    const ageHeightInfoList = {
      key: 'age_height_list',
      label: 'Age / Height',
      value: `${basic.age} yrs, ${inchesToFeet(appearance.height)}`,
    };

    const religionCasteInfoList = {
      key: 'religion_caste_list',
      label: 'Religion',
      value: `${doctrine.religion}, ${doctrine.caste}`,
    };

    // NRI
    const religionMotherTongueInfoList = {
      key: 'religion_mother_tongue_list',
      label: 'Mother Tongue',
      value: `${doctrine.religion}, ${motherTongueInfo.value}`,
    };

    const locationNriInfoList = {
      key: 'location_nri_info_list',
      label: 'Location',
      value: `Lives in ${location.city},${location.state}, ${location.country}`,
    };

    const grewupInInfoList = {
      key: 'grew_up_in_info',
      label: 'Grew up in',
      value: `Grew up in ${origin.grewup_in.join(', ')}`,
    };

    let ppShowMaritalStatus = false;
    let ppShowCommunity = false;
    const ppShowGothra = false;
    const partner = (extra.partner || {}).partner ? extra.partner.partner : extra.partner || {};
    if (partner && Object.keys(partner).length > 0) {
      ppShowMaritalStatus = partner.marital_status && arrnorm(partner.marital_status).join(',') !== 'Never Married';
      ppShowCommunity =
        partner.caste &&
        arrnorm(partner.caste)
          .filter(c => c !== null)
          .filter(c => c.caste !== c.religion).length > 0;
    }

    return {
      ...baseline,
      shortBio: trait.about_me,
      createdBy: account.posted_by,
      profileCreatedBy: (['Parent / Guardian'].includes(account.posted_by) && 'Parent') || account.posted_by,
      shortlistCount: other && other.shortlist_count !== undefined ? other.shortlist_count || 0 : -1,
      infoMap: [
        ageHeightInfo,
        ppShowMaritalStatus ? maritalStatusInfo : null,
        religionInfo,
        motherTongueInfo,
        communityInfo,
        nakshatraInfo,
        ppShowGothra ? gothraInfo : false,
        locationInfo,
        ppShowMaritalStatus ? null : educationInfo,
        professionInfo,
      ].filter(h => h && h.value),
      infoMapNonIndian: [
        ageHeightInfo,
        ppShowMaritalStatus ? maritalStatusInfo : null,
        religionInfo,
        motherTongueInfo,
        ppShowCommunity ? communityInfo : null,
        locationNriInfo,
        grewupInInfo,
        ppShowMaritalStatus ? null : educationInfo,
        professionInfo,
      ].filter(h => h && h.value),
      infoMapIndian: [ageHeightInfoList, maritalStatusInfo, religionCasteInfoList, locationInfo, motherTongueInfo, professionInfo].filter(
        h => h && h.value,
      ),
      infoMapNri: [
        ageHeightInfoList,
        professionInfo,
        religionMotherTongueInfoList,
        locationNriInfoList,
        educationInfo,
        grewupInInfoList,
      ].filter(h => h && h.value),
      infoMapPremiumCarousel: [cityInfo].filter(h => h && h.value),
    };
  }
  if (payload.profileBrief) {
    const { age, height, mother_tongue, caste, city, country, education, religion, occupation } = payload.profileBrief;
    const { source = '' } = extra;
    const ageText = age && `${age} yrs`;
    const formatHt = inchesToFeet(height);
    const ageHeight = {
      key: 'info-0',
      label: 'age_height_mt_caste',
      value: [ageText, formatHt].filter(val => val).join(' , '),
    };
    const ageHeightCaste = {
      key: 'info-0',
      label: 'age_height_caste',
      value: [ageText, formatHt, caste].filter(val => val).join(' , '),
    };
    const ageHeightReligion = {
      key: 'info-0',
      label: 'age_height_religion',
      value: [ageText, formatHt, religion].filter(val => val).join(' , '),
    };
    const mothertongueCaste = {
      key: 'info-1',
      label: 'mt_caste',
      value: [mother_tongue, caste].filter(val => val).join(' , '),
    };
    const mothertongueReligion = {
      key: 'info-1',
      label: 'mt_religion',
      value: [mother_tongue, religion].filter(val => val).join(' , '),
    };
    const cityCountry = {
      key: 'info-2',
      label: 'city_country',
      value: [city, country].filter(val => val).join(' , '),
    };
    const educationInfo = {
      key: 'info-3',
      label: 'education',
      value: strnorm(education) || '',
    };

    const profession = {
      key: 'info-5',
      label: 'profession_income',
      value: [strnorm(occupation)].filter(val => val).join(' , '),
    };
    const infoArr = [cityCountry, educationInfo, profession];

    const ageHtLocation = {
      key: 'info-6',
      label: 'age_height_mt_caste',
      value: [ageText, formatHt, city].filter(val => val).join(' , '),
    };

    const getAgeHeight = isNri => {
      if (source !== 'similarProfile') return ageHeight;
      if (isNri) return ageHeightReligion;
      return ageHeightCaste;
    };

    return {
      ...baseline,
      infoMapInboxIndian: [getAgeHeight(false), mothertongueCaste, ...infoArr].filter(h => h.value),
      infoMapInboxNri: [getAgeHeight(true), mothertongueReligion, ...infoArr].filter(h => h.value),
      infoMapFeaturedNri: [ageHtLocation, mothertongueReligion, educationInfo].filter(h => h.value),
      infoMapFeatured: [ageHtLocation, mothertongueCaste, educationInfo].filter(h => h.value),
    };
  }
  return null;
};
