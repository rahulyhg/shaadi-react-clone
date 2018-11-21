import React from 'react';
import PropTypes from 'prop-types';
import ListItems from '../Common/ListItems';

const List = props => <ListItems {...props} />;

List.propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired, PropTypes.number.isRequired]).isRequired,
    }).isRequired,
  ).isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  isSeperate: PropTypes.bool.isRequired,
  notesCount: PropTypes.number.isRequired,
};
export default List;
