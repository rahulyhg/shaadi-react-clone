export default form => ({
  location: {
    zip_code: form.zip.code,
    state: form.state.value,
    city: form.city.value,
    district: form.district.value || form.city.value, // @todo have API decide this
    living_since: form.livingSince.value,
    residency_status: form.residencyStatus.value,
    google_city_id: form.zip.googleCityId,
    zip_status: form.zipStatus.checked ? 'N' : 'Y',
  },
  origin: {
    grewup_in: form.grewUpIn.values.split(','),
    ethnicity: form.ethnicity.value,
  },
  metadata: {
    domain: form.regionalSite.url,
  },
  basic: {
    marital_status: form.maritalStatus.value,
  },
  family: {
    children: form.haveChildren.value,
    no_of_kids: form.noOfChildren.value,
  },
  doctrine: {
    // @todo have API decide this
    caste: form.caste.value || form.caste.religion,
    sub_caste: form.subCasteOther.value || form.subCaste.value,
    caste_no_bar: form.casteNoBar.checked ? 'Yes' : '',
    gotra: form.gotraOther.value || form.gotra.value,
  },
  'astro-details': {
    birth_star_nakshatra: form.nakshatra.actualValue,
    moon_sign: form.rashi.actualValue,
    manglik: form.suddhaJadhagam.value === 'Yes' ? 'No' : form.dosham.value,
    other_dosham: form.doshamTypes.value.replace(',', '|'),
    suddha_jadhagam: form.suddhaJadhagam.value,
  },
});
