/* eslint camelcase: 0 */

const baseValue = {
  count: 0,
  prev: {},
  next: {},
  back: {},
};

const profileQueue = (base = baseValue, searchData, ubtData) => {
  console.log('QUEUE debug 1', JSON.stringify({ searchData, ubtData }));
  if (ubtData) {
    return {
      ...base,
      count: ubtData.next_count,
      prev: (ubtData.prev || [])[0] || {},
      next: (ubtData.next || [])[0] || {},
      back: ubtData.back || {},
    };
  }

  if (searchData) {
    const { queue, prevQueue, nextQueue, id, int_number, int_page, int_per_page } = searchData;
    const { search, data } = queue;
    const prevData = (prevQueue || {}).data || [];
    const nextData = (nextQueue || {}).data || [];
    const index = (data || []).indexOf(id) || int_number - 1;
    const totalCount = parseInt(search.count, 10);
    const prevCount = (int_page - 1) * int_per_page;
    const prev =
      index === 0 && int_page > 1
        ? { profileid: prevData[int_per_page - 1], profileNumber: int_per_page, page: int_page - 1 }
        : { profileid: data[index - 1], profileNumber: index, page: int_page };
    const next =
      index === int_per_page - 1
        ? { profileid: nextData[0], profileNumber: 1, page: int_page + 1 }
        : { profileid: data[index + 1], profileNumber: index + 2, page: int_page };
    console.log('QUEUE debug 2 >>>>>>>>>>>>>>>', JSON.stringify({ prev, next, count: totalCount - index - 1 - prevCount }));
    return {
      count: totalCount - index - 1 - prevCount,
      prev,
      next,
      back: { page: int_page },
    };
  }

  return {
    ...baseValue,
  };
};

export default profileQueue;
