export default function({ data: { google_cities = [] } = {} } = {}) {
  return google_cities.map(item => {
    const { id: googleCityId, zipcode: code, country_code, locality, state_code, state, country, city_google } = item || {};
    let label = `${code} - `;
    label += locality && country_code === 'IN' ? `${locality} , ${city_google}` : city_google;
    if (state_code && country_code !== 'GB') {
      label += `, ${state_code}`;
    } else if (state && country_code !== 'GB') {
      label += `, ${state}`;
    } else {
      label += `, ${country}`;
    }
    return { label, googleCityId, code, postal: label };
  });
}
