import requestService from '../services/requestService';
import decorators from '../decorators';

const index = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `/stories/getlist`,
    params: {
      type: 'success_stories',
      fieldset: 'id,small_desc,title,photo1',
      fq: { success_stories: { status: 'Activated', to_be_displayed: ['Y'] } },
      sort: { success_stories: ['-id'] },
      limit_per_page: 3,
    },
  };

  return requestService(logger, query, auth, request, d => decorators.successStories(d.data));
};

export default {
  index,
};
