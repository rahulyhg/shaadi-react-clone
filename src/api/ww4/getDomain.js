import getList from './getList';

export default ({ motherTongue: mother_tongue, draftMatrimonyDomain: draft_matrimony_domain, listType: list_type }) =>
  getList({
    fieldset: 'mt_domain',
    fq: {
      mt_domain: {
        mother_tongue,
        draft_matrimony_domain,
        list_type,
      },
    },
  });
