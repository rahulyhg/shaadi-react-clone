import getLookUpRequest from './getLookUp';

export default ({ zipcode, countryCode }) =>
  getLookUpRequest({
    fieldset: 'google_cities',
    fq: { google_cities: { country_code: countryCode, zipcode: `like:${zipcode}` } },
    sort: { google_cities: ['zipcode', 'city_google'] },
    limit: { google_cities: 200 },
  });
