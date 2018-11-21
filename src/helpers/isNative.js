import { parse } from 'qs';

export default (queryStr = window.location.search) => {
  const queryParams = parse(queryStr.slice(1));
  return (
    !!queryStr &&
    (queryParams.nexturl === 'fake_url' ||
      ['native-android', 'native-iphone'].includes(queryParams.os) ||
      ['native-android', 'native-iphone'].includes(queryParams.OS))
  );
};
