import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const itemTraversed = prePg => itemPP => prePg * itemPP;
const Inbox = props => {
  const perPageItem = props.itemPerPage;
  const from = itemTraversed(props.currentPage - 1)(perPageItem) + 1;
  const to = props.currentPage * perPageItem < props.itemCount ? props.currentPage * perPageItem : props.itemCount;
  return (
    <s.Pagination isVisible={props.pageCount}>
      <s.prev onClick={() => props.onPageChange(props.currentPage - 1)} isPrev disabled={props.currentPage <= 1}>
        <span>←</span>
        Prev
      </s.prev>

      <s.desc>
        Showing <s.Count>{`${from}-${to}`}</s.Count> of {props.itemCount}
      </s.desc>
      <s.prev onClick={() => props.onPageChange(props.currentPage + 1)} disabled={props.currentPage >= props.pageCount}>
        Next
        <span>→</span>
      </s.prev>
    </s.Pagination>
  );
};
Inbox.defaultProps = {
  pageCount: 0,
  currentPage: 0,
  itemPerPage: 0,
};
Inbox.propTypes = {
  pageCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  itemPerPage: PropTypes.number.isRequired,
};
export default Inbox;
