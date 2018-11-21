// /* eslint camelcase: 0 */
export default uid => ({
  method: 'get',
  url: `/surveys/csat/${uid}`,
  params: {
    _debug: 'csat_survey',
  },
});
