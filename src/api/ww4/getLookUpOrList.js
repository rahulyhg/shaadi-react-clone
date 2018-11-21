export default ({ fieldset, fq = {}, uri, sort = {}, limit = {} }) => ({
  method: 'get',
  url: `/${uri}`,
  query: { fieldset, fq, sort, limit },
  params: { fieldset, fq, sort, limit },
});
