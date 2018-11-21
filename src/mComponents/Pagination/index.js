import React from 'react';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PropTypes from 'prop-types';
import { Wrapper, PaginationButtonStyles, PaginationArrowIconStyles } from './styles';

const Pagination = props => {
  const { loading, activePage, pageCount } = props;
  if (loading || pageCount <= 1) return null;
  return (
    <div data-pagination style={{ ...Wrapper }}>
      {activePage > 1 && (
        <Button data-previous style={PaginationButtonStyles} variant="raised" color="primary" onClick={() => props.onClick(activePage - 1)}>
          <KeyboardArrowLeftIcon style={{ ...PaginationArrowIconStyles, marginLeft: '-10px', marginRight: '0' }} />
          Previous
        </Button>
      )}
      {activePage < pageCount && (
        <Button
          data-next
          style={{ ...PaginationButtonStyles, marginLeft: 'auto' }}
          variant="raised"
          color="primary"
          onClick={() => props.onClick(activePage + 1)}
        >
          Show More
          <KeyboardArrowRightIcon style={{ ...PaginationArrowIconStyles, marginRight: '-10px', marginLeft: '0' }} />
        </Button>
      )}
    </div>
  );
};
Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;
