import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import Inbox from './inbox';
import PaginationInbox from './PaginationInbox';

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

const Pagination = props => {
  switch (props.source) {
    case 'contactSummary':
      return <PaginationInbox {...props} />;
    case 'inbox':
      return <Inbox {...props} />;
    default:
      return (
        <s.Pagination isVisible={props.pageCount}>
          <s.Btn onClick={() => props.onPageChange(props.currentPage - 1)} disabled={props.currentPage <= 1}>
            <span>←</span>
            Prev
          </s.Btn>
          {pageArray(props.pageCount, props.currentPage).map(x => (
            <s.Btn key={x} onClick={() => props.onPageChange(x)} disabled={props.currentPage === x} isActive={props.currentPage === x}>
              {x}
            </s.Btn>
          ))}
          <s.Btn onClick={() => props.onPageChange(props.currentPage + 1)} disabled={props.currentPage >= props.pageCount}>
            Next
            <span>→</span>
          </s.Btn>
        </s.Pagination>
      );
  }
};

Pagination.defaultProps = {
  pageCount: 0,
  source: '',
  currentPage: 0,
  itemCount: 0,
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  source: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
