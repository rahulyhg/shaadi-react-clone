import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

import ListItem from './ListItem';

const ListItems = props => {
  const passProps = {
    amount: props.amount,
    currency: props.currency,
    isSeperate: props.isSeperate,
    notesCount: props.notesCount,
  };

  const listItems = props.details && props.details.map(detail => <ListItem key={detail.label} detail={detail} {...passProps} />);
  return <s.List isSeperate={props.isSeperate}>{listItems}</s.List>;
};

ListItems.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  isSeperate: PropTypes.bool.isRequired,
  notesCount: PropTypes.number.isRequired,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired, PropTypes.number.isRequired]).isRequired,
    }).isRequired,
  ).isRequired,
};

export default ListItems;
