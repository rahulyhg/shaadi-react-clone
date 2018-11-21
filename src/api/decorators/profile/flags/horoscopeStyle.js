/* eslint camelcase: 0 */
const Styles = {
  'south indian': 0,
  'north indian': 1,
  'east indian': 3,
  kerala: 4,
};
export default ({ astro }) => {
  if (astro && astro.details) {
    const { language_format, horoscope_style } = astro.details;

    return `l/${language_format}/hs/${Styles[(horoscope_style || '').toLowerCase()] || 1}`;
  }
  return 'l/ENG/hs/1';
};
