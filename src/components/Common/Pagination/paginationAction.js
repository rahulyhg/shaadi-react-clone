const range = (start, end) => [...Array(1 + end - start).keys()].map(v => start + v);

const pageArray = (maxPageCount, activePage) => {
  let start = 1;
  let end = maxPageCount > 7 ? 7 : maxPageCount;
  if (activePage >= 5) {
    start = activePage - 3;
    end = activePage + 3;
  }
  end = end > maxPageCount ? maxPageCount : end;
  return range(start, end);
};

const paginationAction = {
  range,
  pageArray,
};
export default paginationAction;
