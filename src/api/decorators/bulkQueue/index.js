/* eslint camelcase: 0 */

const baseValue = {
  count: 0,
  list: [],
  back: {},
};

const profileQueue = (base = baseValue, { id, q }, searchData, ubtData) => {
  console.log('BULK debug 1', JSON.stringify({ searchData, ubtData }));
  if (ubtData) {
    const prev = ubtData.prev || [];
    const next = ubtData.next || [];
    return {
      ...base,
      count: ubtData.next_count,
      list: [...prev, { profileid: id, ubt: q.ubt }, ...next],
      back: ubtData.back || {},
      leftWall: prev.length < 10,
      rightWall: next.length < 10,
    };
  }

  if (searchData) {
    const { queue, prevQueue, nextQueue, int_number, int_page, int_per_page } = searchData;
    const { search } = queue || {};
    const data = (queue || {}).data || [];
    const prevData = (prevQueue || {}).data || [];
    const nextData = (nextQueue || {}).data || [];
    const totalCount = parseInt(search.count, 10);
    const index = data.indexOf(id) || int_number - 1;
    const prevCount = (int_page - 1) * int_per_page;
    const list = [
      ...prevData.map((profileid, i) => ({ profileid, profileNumber: i + 1, page: int_page - 1 })),
      ...data.map((profileid, i) => ({ profileid, profileNumber: i + 1, page: int_page })),
      ...nextData.map((profileid, i) => ({ profileid, profileNumber: i + 1, page: int_page + 1 })),
    ];
    console.log('BULK debug 2 >>>>>>>>>>>>>>>', JSON.stringify({ list, count: totalCount - index - 1 - prevCount }));
    return {
      count: totalCount - index - 1 - prevCount,
      list,
      back: { page: int_page },
      leftWall: false,
      rightWall: false,
    };
  }

  return {
    ...baseValue,
  };
};

export default profileQueue;
