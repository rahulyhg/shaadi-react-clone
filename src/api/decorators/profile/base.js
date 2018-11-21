import { strnorm } from '../utils';

const baseValue = {};

const inchesToFeet = inches => `${Math.floor(inches / 12)}' ${Math.round(inches % 12)}"`;
const isValidPayload = payload => payload.basic && payload.doctrine && payload.location && payload.appearance && payload.profession;

export default (baseline = baseValue, payload) => {
  if (isValidPayload(payload)) {
    const { basic, doctrine, location, appearance, profession, origin = {} } = payload;
    return {
      ...baseline,
      infoMap: [
        {
          key: 'info-0',
          label: 'Age / Height',
          value: `${basic.age}, ${inchesToFeet(appearance.height)}`,
        },
        {
          key: 'info-1',
          label: 'Religion/Community',
          value: `${doctrine.religion}, ${doctrine.caste}`,
        },
        {
          key: 'info-2',
          label: 'Mother Tounge',
          value: strnorm(doctrine.mother_tongue),
        },
        {
          key: 'info-3',
          label: 'Profession',
          value: strnorm(profession.occupation) || 'Not Specified',
        },
        {
          key: 'info-4',
          label: 'Location',
          value: `${location.city}, ${location.country}`,
        },
      ].filter(h => h.value),
      infoList: [
        {
          key: 'age-height',
          value: `${basic.age} yrs, ${inchesToFeet(appearance.height)}, ${doctrine.religion}, ${doctrine.mother_tongue}`,
        },
        {
          key: 'profession',
          value: strnorm(profession.occupation),
        },
        {
          key: 'location',
          value: `Lives in ${location.city}, ${location.country}`,
        },
        {
          key: 'grew up in',
          value: origin.grewup_in && `Grew up in ${origin.grewup_in.join(', ')}`,
        },
      ].filter(h => h.value),
      miniNriList: [
        {
          key: 'age-height',
          value: `${basic.age} yrs, ${inchesToFeet(appearance.height)}, ${doctrine.religion}, ${doctrine.mother_tongue}`,
        },
        {
          key: 'grew up in',
          value: origin.grewup_in && `Grew up in ${origin.grewup_in.join(', ')}`,
        },
        {
          key: 'location',
          value: `Lives in ${location.city}, ${location.country}`,
        },
      ].filter(h => h.value),
      miniList: [
        {
          key: 'age-height',
          value: `${basic.age} yrs, ${inchesToFeet(appearance.height)}, ${doctrine.religion}, ${doctrine.mother_tongue}`,
        },
        {
          key: 'religion-caste',
          value: doctrine.religion === doctrine.caste ? `Not Specified` : `${doctrine.caste}`,
        },
        {
          key: 'location',
          value: `Lives in ${location.city}, ${location.country}`,
        },
      ].filter(h => h.value),
      detailList: [
        {
          key: 'age-height',
          value: `${basic.age}, ${inchesToFeet(appearance.height)}`,
        },
        {
          key: 'religion-caste',
          value: doctrine.religion === doctrine.caste ? `${doctrine.religion}, Not Specified` : `${doctrine.religion}, ${doctrine.caste}`,
        },
        {
          key: 'profession',
          value: strnorm(profession.occupation) || 'Not specified',
        },
        {
          key: 'location',
          value: `${location.city}, ${location.country}`,
        },
      ],
      premiumInfo: [
        {
          key: 'age-height',
          value: `${basic.age} yrs, ${inchesToFeet(appearance.height)}, ${doctrine.religion}, ${doctrine.mother_tongue}`,
        },
        {
          key: 'location',
          value: `${location.city}, ${location.country}`,
        },
      ].filter(h => h.value),
    };
  }
  if (payload.profileBrief) {
    const { age, height, caste, city, country, religion, occupation } = payload.profileBrief;
    const formatHt = inchesToFeet(height);

    const ageHeight = {
      key: 'age-height',
      label: 'age_height',
      value: [age, formatHt].filter(val => val).join(' , '),
    };
    const religionComm = {
      key: 'religion-caste',
      label: 'religionComm',
      value: [religion, caste].filter(val => val).join(' , '),
    };
    const profession = {
      key: 'profession',
      label: 'profession',
      value: strnorm(occupation) || 'Not Specified',
    };
    const cityCountry = {
      key: 'location',
      label: 'city_country',
      value: [city, country].filter(val => val).join(' , '),
    };

    return {
      ...baseline,
      detailList: [ageHeight, religionComm, profession, cityCountry].filter(h => h.value),
    };
  }
  return null;
};
