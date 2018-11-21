import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';
import DisplayAmt from '../DisplayAmount';
import Label from '../Label';

const ListItem = props => {
  const { detail, isSeperate, amount, currency, notesCount } = props;

  const value = detail.label || '';
  const labelText = value && !isSeperate ? `${value}: ` : value;
  const valueText = detail.label === 'Payable Amount' ? <DisplayAmt amount={amount} currency={currency} /> : detail.text;

  return (
    (!(detail.label === 'ShaadiCares Contribution' && detail.text === 0) && (
      <s.Detail notesCount={notesCount} isSeperate={isSeperate}>
        <Label label={detail.label} isSeperate={isSeperate}>
          {labelText}
        </Label>
        <s.Content
          id={`data_test_value_${detail.label.toLowerCase().replace(' ', '_')}`}
          notesCount={notesCount}
          label={detail.label}
          isSeperate={isSeperate}
        >
          {valueText}
        </s.Content>
      </s.Detail>
    )) ||
    null
  );
};

ListItem.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  isSeperate: PropTypes.bool.isRequired,
  notesCount: PropTypes.number.isRequired,
  detail: PropTypes.shape({
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired, PropTypes.number.isRequired]).isRequired,
  }).isRequired,
};
export default ListItem;
