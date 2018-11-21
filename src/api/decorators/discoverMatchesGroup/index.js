import profile from '../profile';
import discover from '../discover';

const baseValue = {
  profiles: [],
  meta: {},
};

const processData = data => {
  const finalData = data;
  Object.keys(data).map(key => { // eslint-disable-line
    if (!finalData[key].data[0]) {
      const subData = [];
      Object.keys(finalData[key].data).map(k => { // eslint-disable-line
        subData.push(finalData[key].data[k]);
      });
      finalData[key].data = subData;
    }
  });
  return finalData;
};

export default (base = baseValue, payload = {}) => {
  const { uid, data } = payload;
  const searchType = Object.keys(payload.data);
  searchType.map((value, index) => { // eslint-disable-line
    if (value.indexOf('_viewed') >= 0) {
      const actualKey = value.split('_viewed')[0];
      if (payload.data[actualKey] && payload.data[actualKey].paginator.total_count === 0) {
        const swapIndex = searchType.indexOf(actualKey);
        searchType[index] = searchType[swapIndex];
        searchType[swapIndex] = value;
      }
    }
  });
  const processedData = processData(data);
  const profiles = searchType.reduce(
    (accum, current) => [...accum, ...processedData[current].data.map(prof => profile(undefined, prof))],
    [],
  );
  const searchResult = {};
  const discoverSearchType = [];
  searchType.forEach(type => {
    if (processedData[type].paginator.total_count || (processedData[type].remark && processedData[type].remark.messageCode)) {
      processedData[type].responseType = payload.discoverSearchType.includes(type) ? 'unviewed' : 'viewed';
      processedData[type].search_type = type;
      discoverSearchType.push(type);
      searchResult[type] = discover(undefined, processedData[type]);
    }
  });

  const viewedIndex = discoverSearchType.indexOf('discovery_recent_visitors_viewed');
  const unViewedIndex = discoverSearchType.indexOf('discovery_recent_visitors');
  unViewedIndex >= 0 && viewedIndex >= 0 && discoverSearchType.splice(viewedIndex, 1);

  return {
    uid,
    profiles,
    discoverSearchType,
    searchResult,
  };
};
