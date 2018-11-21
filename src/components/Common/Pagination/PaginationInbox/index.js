import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const PaginationInbox = props => {
  const perPageItem = 10;
  const from = props.currentPage === 1 ? props.currentPage : props.currentPage * perPageItem - perPageItem + 1; // eslint-disable-line no-mixed-operators
  const to = props.currentPage * perPageItem < props.itemCount ? props.currentPage * perPageItem : props.itemCount;
  return (
    <s.Pagination isVisible={props.pageCount}>
      <s.desc>
        Showing <b>{`${from}-${to}`}</b> of {props.itemCount}
      </s.desc>
      <s.navigation>
        <s.prev onClick={() => props.onPageChange(props.currentPage - 1)} isPrev disabled={props.currentPage <= 1} />
        <s.prev onClick={() => props.onPageChange(props.currentPage + 1)} disabled={props.currentPage >= props.pageCount} />
      </s.navigation>
    </s.Pagination>
  );
};
PaginationInbox.defaultProps = {
  pageCount: 0,
};
PaginationInbox.propTypes = {
  pageCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
};
export default PaginationInbox;
